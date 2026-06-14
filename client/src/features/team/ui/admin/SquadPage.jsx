import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'

const roleConfig = {
  BATSMAN:       'bg-blue-50 text-blue-700 border border-blue-200',
  BOWLER:        'bg-red-50 text-red-600 border border-red-200',
  ALL_ROUNDER:   'bg-green-50 text-green-700 border border-green-200',
  WICKET_KEEPER: 'bg-amber-50 text-amber-700 border border-amber-200',
}

const squadPlayers = [
  { _id: '1', name: 'Virat Kohli',    role: 'BATSMAN',       country: 'India', battingStyle: 'Right-hand bat' },
  { _id: '2', name: 'Jasprit Bumrah', role: 'BOWLER',        country: 'India', battingStyle: 'Right-hand bat' },
  { _id: '3', name: 'Hardik Pandya',  role: 'ALL_ROUNDER',   country: 'India', battingStyle: 'Right-hand bat' },
  { _id: '4', name: 'KL Rahul',       role: 'WICKET_KEEPER', country: 'India', battingStyle: 'Right-hand bat' },
  { _id: '5', name: 'Rohit Sharma',   role: 'BATSMAN',       country: 'India', battingStyle: 'Right-hand bat' },
]

// dummy — all players available to add
const allPlayers = [
  { _id: '6', name: 'Shubman Gill',  role: 'BATSMAN', country: 'India' },
  { _id: '7', name: 'Mohammed Shami', role: 'BOWLER',  country: 'India' },
]

const getInitials = (name) =>
  name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

const SquadPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const addRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (addRef.current && !addRef.current.contains(e.target)) setShowAdd(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = squadPlayers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors"
              >
                <i className="ti ti-arrow-left text-[14px]" />
              </button>
              <div>
                <h1 className="text-[14px] font-medium text-gray-900">India — Squad</h1>
                <p className="text-[12px] text-gray-400 mt-0.5">{squadPlayers.length} players</p>
              </div>
            </div>

            {/* Add player dropdown */}
            <div ref={addRef} className="relative">
              <button
                type="button"
                onClick={() => setShowAdd((p) => !p)}
                className="h-9 px-4 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 active:scale-[0.98] text-white text-[12px] font-medium rounded-lg transition-all whitespace-nowrap"
              >
                + Add to team
              </button>

              {showAdd && (
                <div className="absolute right-0 top-11 w-64 bg-white border border-gray-200 rounded-xl shadow-md z-10 overflow-hidden">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <input
                      type="text"
                      placeholder="Search to add..."
                      className="w-full text-[13px] outline-none text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  {allPlayers.map((p) => (
                    <button
                      key={p._id}
                      type="button"
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-medium text-gray-500 flex-shrink-0">
                        {getInitials(p.name)}
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] text-gray-900">{p.name}</p>
                        <p className="text-[11px] text-gray-400">{p.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 h-9">
              <i className="ti ti-search text-gray-400 text-[14px]" />
              <input
                type="text"
                placeholder="Search squad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-[13px] text-gray-900 outline-none bg-transparent placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Squad list */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] text-gray-400 font-medium px-4 py-2.5">Player</th>
                  <th className="text-left text-[11px] text-gray-400 font-medium px-4 py-2.5">Role</th>
                  <th className="text-left text-[11px] text-gray-400 font-medium px-4 py-2.5 hidden sm:table-cell">Country</th>
                  <th className="w-10 px-4 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-[13px] text-gray-400">
                      No players found
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p._id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[11px] font-medium text-gray-500 flex-shrink-0">
                            {getInitials(p.name)}
                          </div>
                          <span className="text-[13px] text-gray-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-medium rounded-md px-2 py-0.5 ${roleConfig[p.role]}`}>
                          {p.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-gray-500 hidden sm:table-cell">
                        {p.country}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="w-7 h-7 text-sm flex items-center justify-center rounded-lg border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SquadPage