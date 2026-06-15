import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axiosInstance from "@/utils/axios"

const CommentaryEntryPage = () => {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [matches, setMatches] = useState([])
  // console.log(matches)
  const [timeline, setTimeline] = useState([])
  console.log(timeline)
  const [loadingMatches, setLoadingMatches] = useState(true)

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      over: "14",
      ball: "3",
      runs: "0",
      eventType: "RUN",
      text: "",
    },
  })

  const currentRuns = watch("runs")
  const currentEvent = watch("eventType")

  // ---------------- FETCH MATCHES ----------------
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoadingMatches(true)
        const res = await axiosInstance.get("/match")
        const raw = res.data

        const list = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
            ? raw.data
            : []

        setMatches(list)
      } catch (err) {
        console.error("Failed to load matches", err)
      } finally {
        setLoadingMatches(false)
      }
    }

    fetchMatches()
  }, [])

  // ---------------- SELECT MATCH ----------------
  const handleMatchSelect = (e) => {
    const match = matches.find((m) => m._id === e.target.value)
    setSelectedMatch(match || null)

    // optional: fetch existing commentary timeline
    if (match?._id) {
      fetchTimeline(match._id)
    }
  }

  const fetchTimeline = async (matchId) => {
    try {
      const res = await axiosInstance.get(`/commentary?matchId=${matchId}`)

      const raw = res.data

      const list = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
          ? raw.data
          : []

      setTimeline(list)
    } catch (err) {
      console.error("Failed to load timeline", err)
      setTimeline([])
    }
  }

  // ---------------- QUICK RUN LOGIC ----------------
  const setQuickRun = (runValue, eventType = "RUN") => {
    setValue("runs", runValue)
    setValue("eventType", eventType)

    let autoText = ""
    if (eventType === "SIX")
      autoText = " MAXIMA! Slapped over the ropes for a huge SIX!"
    else if (eventType === "FOUR")
      autoText = " CRACKING SHOT! Pierces the gap for a boundary!"
    else if (eventType === "WICKET")
      autoText = " OUT! Big blow, the batsman holes out directly to long-on!"
    else autoText = `Defended softly, runs taken: ${runValue}`

    setValue("text", autoText)
  }

  // ---------------- SUBMIT COMMENTARY ----------------
  const onSubmitForm = async (data) => {
    if (!selectedMatch) return
    const payload = {
      matchId: selectedMatch._id,
      over: Number(data.over),
      ball: Number(data.ball),
      run: data.runs,
      event: data.eventType,
      text: data.text,
    }

    try {
      const res = await axiosInstance.post("/commentary", payload)

      const newBallLog = res.data || {
        id: Date.now(),
        ...payload,
      }

      setTimeline((prev) => [newBallLog, ...prev])

      // auto increment ball
      let nextBall = parseInt(data.ball) + 1
      let nextOver = parseInt(data.over)

      if (nextBall > 6) {
        nextBall = 1
        nextOver += 1
      }

      reset({
        over: String(nextOver),
        ball: String(nextBall),
        runs: "0",
        eventType: "RUN",
        text: "",
      })
    } catch (err) {
      console.error("Failed to submit commentary", err)
    }
  }

  // ---------------- UI ----------------
  return (
    <div className='p-6 bg-slate-50 min-h-screen text-left'>
      {/* MATCH SELECT */}
      <div className='bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6'>
        <h2 className='text-sm font-bold text-slate-500 uppercase tracking-wider mb-2'>
          📡 Select Live Match to Score
        </h2>

        <select
          onChange={handleMatchSelect}
          className='w-full md:w-1/3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none'
        >
          <option value=''>
            {loadingMatches
              ? "Loading matches..."
              : "-- Choose Active Match Node --"}
          </option>

          {matches?.map((m) => (
            <option key={m?._id} value={m?._id}>
              {m?.teamA?.name} vs {m?.teamB?.name} ({m?.venue})
            </option>
          ))}
        </select>
      </div>

      {selectedMatch ? (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* LEFT PANEL (UNCHANGED UI) */}
          <div className='lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 h-fit'>
            <div className='flex items-center justify-between border-b border-slate-100 pb-3'>
              <h3 className='text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-emerald-500 animate-pulse'></span>
                Console: {selectedMatch?.teamA?.shortName} vs{" "}
                {selectedMatch?.teamB?.shortName}
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className='space-y-4'>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='block text-[10px] font-bold text-slate-400 uppercase mb-1'>
                    Over Number
                  </label>
                  <input
                    type='number'
                    {...register("over")}
                    className='w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono'
                  />
                </div>

                <div>
                  <label className='block text-[10px] font-bold text-slate-400 uppercase mb-1'>
                    Ball of Over
                  </label>
                  <select
                    {...register("ball")}
                    className='w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono'
                  >
                    {[1, 2, 3, 4, 5, 6].map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick buttons unchanged */}
              <div>
                <label className='block text-[10px] font-bold text-slate-400 uppercase mb-1.5'>
                  ⚡ Quick Run Injectors
                </label>

                <div className='grid grid-cols-4 gap-1.5'>
                  <button
                    type='button'
                    onClick={() => setQuickRun("0", "RUN")}
                    className='p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700'
                  >
                    0
                  </button>
                  <button
                    type='button'
                    onClick={() => setQuickRun("1", "RUN")}
                    className='p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700'
                  >
                    1
                  </button>
                  <button
                    type='button'
                    onClick={() => setQuickRun("4", "FOUR")}
                    className='p-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-xs font-bold text-emerald-700'
                  >
                    4️⃣
                  </button>
                  <button
                    type='button'
                    onClick={() => setQuickRun("6", "SIX")}
                    className='p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-xs font-bold text-indigo-700'
                  >
                    6️⃣
                  </button>
                  <button
                    type='button'
                    onClick={() => setQuickRun("0", "WICKET")}
                    className='p-2 col-span-4 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold text-red-600'
                  >
                    🔴 OUT / WICKET
                  </button>
                </div>
              </div>

              <div>
                <label className='block text-[10px] font-bold text-slate-400 uppercase mb-1'>
                  Runs
                </label>

                <select
                  {...register("runs")}
                  className='w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs'
                >
                  {["0", "1", "2", "3", "4", "5", "6"].map((r) => (
                    <option key={r} value={r}>
                      {r} Run
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-[10px] font-bold text-slate-400 uppercase mb-1'>
                  Commentary Description
                </label>

                <textarea
                  rows='3'
                  {...register("text", { required: true })}
                  className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 resize-none'
                />
              </div>

              <button
                type='submit'
                className='w-full py-2.5 bg-slate-900 text-white font-semibold rounded-lg text-xs hover:bg-slate-800 transition-colors shadow'
              >
                📡 Dispatch Commentary Line
              </button>
            </form>
          </div>

          {/* RIGHT PANEL (UNCHANGED UI) */}
          <div className='lg:col-span-2 space-y-3'>
            <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
              Live Feed Pipeline Preview
            </h3>

            <div className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm max-h-[520px] overflow-y-auto space-y-3'>
              {timeline?.map((log) => (
                <div
                  key={log.id}
                  className='flex gap-4 p-3 border-b border-slate-50 last:border-0 items-start hover:bg-slate-50 rounded-lg'
                >
                  <div className='bg-slate-900 text-white text-xs font-mono font-bold px-2 py-1 rounded min-w-[45px] text-center'>
                    {log.over}
                  </div>

                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center gap-2'>
                      <span className='text-[9px] font-black px-1.5 py-0.5 rounded bg-slate-100 text-slate-700'>
                        {log.event}
                      </span>
                      <span className='text-[10px] text-slate-400'>
                        Runs: {log.run}
                      </span>
                    </div>

                    <p className='text-xs text-slate-700 font-medium'>
                      {log.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='p-20 border border-dashed border-slate-200 bg-white rounded-xl text-center text-xs text-slate-400 shadow-sm'>
          Select an active dashboard match instance above to load the live
          commentary compiler form.
        </div>
      )}
    </div>
  )
}

export default CommentaryEntryPage
