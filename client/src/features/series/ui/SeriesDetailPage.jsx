import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getPublicSeriesById } from "../api/seriesApi"

const statusConfig = {
  LIVE: {
    label: "● LIVE",
    class: "bg-red-50 text-red-600 border border-red-200",
  },
  UPCOMING: {
    label: "UPCOMING",
    class: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  COMPLETED: {
    label: "COMPLETED",
    class: "bg-green-50 text-green-700 border border-green-200",
  },
}

const SeriesDetailPage = () => {
  const [matches, setMatches] = useState([])
  // console.log(matches)
  const navigate = useNavigate()
  const param = useParams()

  useEffect(() => {
    getPublicSeriesById(param.id, setMatches)
  }, [])

  const formatStartTime = (dateString) => {
    const date = new Date(dateString)

    return date.toLocaleString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto flex flex-col gap-4'>
        <div
          onClick={() => navigate(`/matches/${param.id}`)}
          className='flex flex-col gap-3'
        >
          <p className='text-[12px] font-medium text-gray-500'>Matches</p>
          {matches.map((m) => {
            const mcfg = statusConfig[m.status]
            return (
              <div
                key={m._id}
                className='bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:bg-gray-50 transition-colors cursor-pointer'
              >
                {/* Top row */}
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-[11px] text-gray-400'>
                    Match number: {m.matchNumber}
                  </span>
                  <span
                    className={`text-[10px] font-medium rounded-md px-2 py-0.5 ${mcfg.class}`}
                  >
                    {mcfg.label}
                  </span>
                </div>

                {/* Teams */}
                <p className='text-[14px] font-medium text-gray-900 mb-2'>
                  {m.teams}
                </p>

                {/* Meta */}
                <div className='flex items-center gap-4 flex-wrap'>
                  <span className='text-[12px] text-gray-400 flex items-center gap-1'>
                    <i className='ti ti-map-pin text-[11px]' />
                    {m.venue}
                  </span>
                  <span className='text-[12px] text-gray-400 flex items-center gap-1'>
                    <i className='ti ti-clock text-[11px]' />
                    {formatStartTime(m.startTime)}
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
