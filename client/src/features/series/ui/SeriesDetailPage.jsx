import { useNavigate } from "react-router"

const statusConfig = {
  LIVE:      { label: '● LIVE',    class: 'bg-red-50 text-red-600 border border-red-200' },
  UPCOMING:  { label: 'UPCOMING',  class: 'bg-blue-50 text-blue-700 border border-blue-200' },
  COMPLETED: { label: 'COMPLETED', class: 'bg-green-50 text-green-700 border border-green-200' },
}

const series = {
  _id: '1',
  name: 'Border-Gavaskar Trophy',
  shortName: 'BGT',
  season: '2026',
  status: 'LIVE',
  logo: null,
}

const matches = [
  { _id: '1', matchNumber: '1st Test', teams: 'India vs Australia', venue: 'MCG, Melbourne',   startTime: '14 Jan 2026', status: 'COMPLETED' },
  { _id: '2', matchNumber: '2nd Test', teams: 'India vs Australia', venue: 'SCG, Sydney',      startTime: '20 Jan 2026', status: 'LIVE' },
  { _id: '3', matchNumber: '3rd Test', teams: 'India vs Australia', venue: 'Gabba, Brisbane',  startTime: '28 Jan 2026', status: 'UPCOMING' },
  { _id: '4', matchNumber: '4th Test', teams: 'India vs Australia', venue: 'WACA, Perth',      startTime: '5 Feb 2026',  status: 'UPCOMING' },
  { _id: '5', matchNumber: '5th Test', teams: 'India vs Australia', venue: 'Adelaide Oval',    startTime: '13 Feb 2026', status: 'UPCOMING' },
]

const SeriesDetailPage = () => {
  const cfg = statusConfig[series.status]

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">

        {/* Hero card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-[13px] font-semibold text-gray-500 flex-shrink-0 overflow-hidden">
            {series.logo
              ? <img src={series.logo} alt={series.name} className="w-full h-full object-cover" />
              : series.shortName
            }
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-[16px] font-medium text-gray-900 truncate">{series.name}</h1>
            <p className="text-[12px] text-gray-400 mt-0.5">{series.shortName} · {series.season}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`text-[10px] font-medium rounded-md px-2 py-0.5 ${cfg.class}`}>
                {cfg.label}
              </span>
              <span className="text-[12px] text-gray-400 flex items-center gap-1">
                <i className="ti ti-calendar text-[11px]" />
                Season {series.season}
              </span>
            </div>
          </div>
        </div>

        Stat cards
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
            <p className="text-[11px] text-gray-400 mb-1">Total</p>
            <p className="text-[22px] font-medium text-gray-900 leading-none">{matches.length}</p>
            <p className="text-[10px] text-gray-400 mt-1">matches</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
            <p className="text-[11px] text-gray-400 mb-1">Completed</p>
            <p className="text-[22px] font-medium text-green-600 leading-none">
              {matches.filter(m => m.status === 'COMPLETED').length}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">done</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
            <p className="text-[11px] text-gray-400 mb-1">Remaining</p>
            <p className="text-[22px] font-medium text-blue-600 leading-none">
              {matches.filter(m => m.status !== 'COMPLETED').length}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">to play</p>
          </div>
        </div>

        {/* Match cards */}
        <div onClick={() => navigate('/matches/5')} className="flex flex-col gap-3">
          <p className="text-[12px] font-medium text-gray-500">Matches</p>
          {matches.map((m) => {
            const mcfg = statusConfig[m.status]
            return (
              <div
                key={m._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-gray-400">{m.matchNumber}</span>
                  <span className={`text-[10px] font-medium rounded-md px-2 py-0.5 ${mcfg.class}`}>
                    {mcfg.label}
                  </span>
                </div>

                {/* Teams */}
                <p className="text-[14px] font-medium text-gray-900 mb-2">{m.teams}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-[12px] text-gray-400 flex items-center gap-1">
                    <i className="ti ti-map-pin text-[11px]" />
                    {m.venue}
                  </span>
                  <span className="text-[12px] text-gray-400 flex items-center gap-1">
                    <i className="ti ti-clock text-[11px]" />
                    {m.startTime}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default SeriesDetailPage