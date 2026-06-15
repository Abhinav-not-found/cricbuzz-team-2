import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// Mock Active Matches matching controller fetch architecture
const MOCK_ACTIVE_MATCHES = [
  { _id: 'match_991', teamA: { name: 'India', shortName: 'IND' }, teamB: { name: 'Australia', shortName: 'AUS' }, currentInnings: 2 },
  { _id: 'match_992', teamA: { name: 'Mumbai Indians', shortName: 'MI' }, teamB: { name: 'Chennai Super Kings', shortName: 'CSK' }, currentInnings: 1 }
]

const ScoreboardEntryPage = () => {
  const [activeMatch, setActiveMatch] = useState(null)
  
  // Local reactive mirror matching the Mongoose Database schema structure
  const [liveScore, setLiveScore] = useState({
    score: 124,
    wickets: 3,
    overs: '14.2',
    runRate: 8.65,
    target: 182,
    innings: 2
  })

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      score: liveScore.score,
      wickets: liveScore.wickets,
      overNum: '14',
      ballNum: '2',
      innings: liveScore.innings,
      target: liveScore.target || ''
    }
  })

  // Watch input streams for real-time Run Rate engine computations
  const watchedScore = watch('score')
  const watchedOver = watch('overNum')
  const watchedBall = watch('ballNum')

  // Mathematical run-rate updates recalculation helper
  useEffect(() => {
    const totalRuns = parseInt(watchedScore) || 0
    const oversInt = parseInt(watchedOver) || 0
    const ballsInt = parseInt(watchedBall) || 0
    
    const totalOversDecimal = oversInt + (ballsInt / 6)
    
    if (totalOversDecimal > 0) {
      const computedRR = (totalRuns / totalOversDecimal).toFixed(2)
      setLiveScore(prev => ({ ...prev, runRate: parseFloat(computedRR) }))
    }
  }, [watchedScore, watchedOver, watchedBall])

  const handleMatchSelector = (e) => {
    const targetMatch = MOCK_ACTIVE_MATCHES.find(m => m._id === e.target.value)
    if(targetMatch) {
      setActiveMatch(targetMatch)
      setValue('innings', targetMatch.currentInnings)
    } else {
      setActiveMatch(null)
    }
  }

  // Fast Score Incrementor Trigger Shortcuts
  const adjustRunsQuickly = (amount) => {
    const updatedVal = Math.max(0, (parseInt(watchedScore) || 0) + amount)
    setValue('score', updatedVal)
  }

  const handleManualFormSubmit = (data) => {
    // Merging into database schema structure model blueprint payload
    const payload = {
      matchId: activeMatch._id,
      innings: parseInt(data.innings),
      battingTeam: activeMatch.teamA._id, // placeholder binding fallback
      score: parseInt(data.score),
      wickets: parseInt(data.wickets),
      overs: `${data.overNum}.${data.ballNum}`,
      runRate: liveScore.runRate,
      target: data.target ? parseInt(data.target) : undefined
    }

    // Mock update visualization
    setLiveScore({
      score: payload.score,
      wickets: payload.wickets,
      overs: payload.overs,
      runRate: payload.runRate,
      target: payload.target,
      innings: payload.innings
    })

    alert(`📡 Dispatching Dashboard Sync to Controller Layer!\nPayload compiled: ${JSON.stringify(payload, null, 2)}`)
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-left font-sans">
      
      {/* SYSTEM META HEADER CONTROL PANEL */}
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h1 className="text-xl font-bold text-slate-900">📊 Match Scoreboard Core Controller</h1>
        <p className="text-xs text-slate-400 mt-1">Direct main ledger injector responsible for processing structural numerical updates to the ScoreModel database.</p>
      </div>

      {/* SELECT MATCH PIPELINE */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Configure Target Broadcast Scoreboard Node</label>
        <select 
          onChange={handleMatchSelector}
          className="w-full md:w-1/3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
        >
          <option value="">-- Fetch Active Matches from Node --</option>
          {MOCK_ACTIVE_MATCHES.map(m => (
            <option key={m._id} value={m._id}>{m.teamA.name} vs {m.teamB.name}</option>
          ))}
        </select>
      </div>

      {activeMatch ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* FORMS MANAGEMENT DESK CONTROLLER */}
          <div className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
              Score Adjustment Input Matrix
            </h3>

            <form onSubmit={handleSubmit(handleManualFormSubmit)} className="space-y-4">
              
              {/* Runs Field With Instant Increment Modifiers */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Runs Aggregation Ledger</label>
                <input 
                  type="number" 
                  {...register('score', { min: 0 })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:outline-none" 
                />
                <div className="grid grid-cols-4 gap-1 mt-1.5">
                  <button type="button" onClick={() => adjustRunsQuickly(1)} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 rounded">+1</button>
                  <button type="button" onClick={() => adjustRunsQuickly(2)} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 rounded">+2</button>
                  <button type="button" onClick={() => adjustRunsQuickly(4)} className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-[11px] font-black text-emerald-700 rounded">+4</button>
                  <button type="button" onClick={() => adjustRunsQuickly(6)} className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-[11px] font-black text-indigo-700 rounded">+6</button>
                </div>
              </div>

              {/* Innings & Wickets Matrix inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Wickets Down (0-10)</label>
                  <select {...register('wickets')} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold">
                    {[0,1,2,3,4,5,6,7,8,9,10].map(w => <option key={w} value={w}>{w} Wickets</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Innings Phase</label>
                  <select {...register('innings')} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold">
                    <option value={1}>1st Innings</option>
                    <option value={2}>2nd Innings</option>
                  </select>
                </div>
              </div>

              {/* Overs Regex string input splitter bounds */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Completed Overs</label>
                  <input type="number" {...register('overNum')} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Balls (0-5 Matcher)</label>
                  <select {...register('ballNum')} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono">
                    {[0,1,2,3,4,5].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Optional Target Boundaries */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Score Requirement (Optional)</label>
                <input 
                  type="number" 
                  {...register('target')} 
                  placeholder="e.g. 215"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-slate-900 text-white font-bold tracking-wider uppercase rounded-lg text-xs hover:bg-slate-800 transition-colors shadow-md active:scale-[0.99]"
              >
                ⚡ Sync Scoreboard Master Ledger
              </button>

            </form>
          </div>

          {/* RIGHT: SCHEMATIC TELEMETRY MONITOR LIVE CARD RENDERING */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Database Stream Output Monitor</h3>
            
            {/* BIG MAIN MONITOR VISUALIZER CARD */}
            <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                  Live Dispatch Stream
                </span>
              </div>

              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
                {activeMatch.teamA.name} vs {activeMatch.teamB.name}
              </p>
              <h4 className="text-xs text-slate-500 font-semibold mb-4">Innings Zone Status: Phase {liveScore.innings}</h4>

              <div className="flex items-baseline gap-6 my-4">
                <h2 className="text-5xl font-black font-mono tracking-tight text-white">
                  {liveScore.score}<span className="text-slate-500 text-3xl font-normal">/{liveScore.wickets}</span>
                </h2>
                <p className="text-sm font-medium font-mono text-slate-400">
                  Overs: <span className="text-amber-400 font-bold">{liveScore.overs}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-4 mt-4">
                <div>
                  <p className="text-[10px] font-medium text-slate-500 uppercase">Calculated Run Rate</p>
                  <p className="text-base font-bold text-emerald-400 font-mono">{liveScore.runRate}</p>
                </div>
                {liveScore.target && (
                  <div>
                    <p className="text-[10px] font-medium text-slate-500 uppercase">Target Chase Parameter</p>
                    <p className="text-base font-bold text-indigo-400 font-mono">{liveScore.target}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] font-medium text-slate-500 uppercase">Remaining Requirement</p>
                  <p className="text-base font-bold text-slate-300 font-mono">
                    {liveScore.target ? Math.max(0, liveScore.target - liveScore.score) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* TECHNICAL DEBUGGING LEDGER */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-left">
              <h5 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">ScoreModel Database Serialization Inspector</h5>
              <pre className="text-[11px] font-mono text-cyan-400 overflow-x-auto bg-slate-900/50 p-3 rounded border border-slate-800/60 leading-relaxed">
{`{
  "matchId": "${activeMatch._id}",
  "innings": ${liveScore.innings},
  "score": ${liveScore.score},
  "wickets": ${liveScore.wickets},
  "overs": "${liveScore.overs}",
  "runRate": ${liveScore.runRate},
  ${liveScore.target ? `"target": ${liveScore.target},` : ""}
  "updatedBy": "current_authenticated_admin_id"
}`}
              </pre>
            </div>

          </div>

        </div>
      ) : (
        <div className="p-20 border border-dashed border-slate-200 bg-white rounded-xl text-center text-xs text-gray-400 shadow-sm">
          Please select an active scheduled match block node to initialize the analytical scoring operations dashboard.
        </div>
      )}
    </div>
  )
}

export default ScoreboardEntryPage