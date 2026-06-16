import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axiosInstance from "@/utils/axios"

const ScoreboardEntryPage = () => {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      score: "",
      wickets: "",
    },
  })

  // ---------------- FETCH MATCHES ----------------
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get("/match")

        const list = Array.isArray(res.data) ? res.data : res.data?.data || []

        setMatches(list)
      } catch (err) {
        console.error("Failed to fetch matches", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  // ---------------- SELECT MATCH ----------------
  const handleMatchSelect = (e) => {
    const match = matches.find((m) => m._id === e.target.value)
    setSelectedMatch(match || null)
  }

  // ---------------- SCORE UPDATE API ----------------
  const updateScore = async (id, payload) => {
    const { data } = await axiosInstance.patch(
      `/score/match/${selectedMatch._id}`,
      payload,
    )
    return data
  }

  // ---------------- SUBMIT ----------------
  const onSubmit = async (data) => {
    if (!selectedMatch) return

    const payload = {
      score: Number(data.score),
      wickets: Number(data.wickets),
    }

    try {
      await updateScore(selectedMatch._id, payload)

      reset({
        score: "",
        wickets: "",
      })
    } catch (err) {
      console.error("Score update failed", err)
    }
  }

  return (
    <div className='p-6 bg-slate-50 min-h-screen text-left font-sans'>
      {/* HEADER */}
      <div className='mb-6 border-b pb-4'>
        <h1 className='text-xl font-bold'>Scoreboard Entry Panel</h1>
        <p className='text-xs text-slate-500'>
          Select match and update live score
        </p>
      </div>

      {/* MATCH SELECT */}
      <div className='bg-white p-5 rounded-xl border mb-6'>
        <select
          onChange={handleMatchSelect}
          className='w-full md:w-1/3 p-2 border rounded-lg text-sm'
        >
          <option value=''>
            {loading ? "Loading matches..." : "Select Match"}
          </option>

          {matches.map((m) => (
            <option key={m._id} value={m._id}>
              {m.team1?.name || m.teamA?.name} vs{" "}
              {m.team2?.name || m.teamB?.name}
            </option>
          ))}
        </select>
      </div>

      {/* MATCH INFO (like commentary page) */}
      {selectedMatch && (
        <div className='bg-white p-4 rounded-xl border mb-6'>
          <p className='text-sm font-semibold'>
            {selectedMatch.team1?.name || selectedMatch.teamA?.name} vs{" "}
            {selectedMatch.team2?.name || selectedMatch.teamB?.name}
          </p>

          <p className='text-xs text-gray-500'>Venue: {selectedMatch.venue}</p>
        </div>
      )}

      {/* FORM */}
      {selectedMatch ? (
        <div className='bg-white p-5 rounded-xl border max-w-md'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {/* SCORE */}
            <div>
              <label className='text-xs font-semibold text-gray-500'>
                Score
              </label>
              <input
                type='number'
                {...register("score", { required: true })}
                className='w-full mt-1 p-2 border rounded-lg text-sm'
              />
            </div>

            {/* WICKETS */}
            <div>
              <label className='text-xs font-semibold text-gray-500'>
                Wickets
              </label>
              <select
                {...register("wickets", { required: true })}
                className='w-full mt-1 p-2 border rounded-lg text-sm'
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            {/* SUBMIT */}
            <button
              type='submit'
              className='w-full bg-black text-white py-2 rounded-lg text-sm'
            >
              Update Score
            </button>
          </form>
        </div>
      ) : (
        <div className='p-10 text-center text-gray-400 border rounded-xl bg-white'>
          Select a match to start updating score
        </div>
      )}
    </div>
  )
}

export default ScoreboardEntryPage
