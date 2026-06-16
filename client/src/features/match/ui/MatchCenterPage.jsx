import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getPublicSeriesById } from "@/features/series/api/seriesApi"
import MatchCommentarySection from "../MatchCommentarySection"

const MatchCenterPage = () => {
  const { id } = useParams()
  const [matches, setMatches] = useState([])

  useEffect(() => {
    getPublicSeriesById(id, setMatches)
  }, [id])

  const match = matches?.[0]

  const team1 = match?.team1
  const team2 = match?.team2

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8 text-gray-800'>
      <div className='max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden'>
        {/* Header */}
        <div className='flex flex-wrap justify-between px-6 py-4 border-b text-sm text-gray-500 gap-4'>
          <div className='flex gap-6 flex-wrap'>
            <span>Match {match?.matchNumber || "-"}</span>

            <span className='flex items-center gap-1'>{match?.venue}</span>

            <span className='flex items-center gap-1'>
              {match?.startTime
                ? new Date(match.startTime).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"}
            </span>
          </div>

          <span className='bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100'>
            {match?.status || "UPCOMING"}
          </span>
        </div>

        {/* Teams + Score */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 items-center border-b'>
          {/* Team 1 */}
          <div className='border rounded-2xl p-5 flex items-center gap-3'>
            <div
              className='w-12 h-12 rounded-full  border flex items-center justify-center font-bold text-sm'
              style={{ color: team1?.primaryColor }}
            >
              {team1?.shortName}
            </div>

            <div>
              <h3 className='text-lg font-bold'>{team1?.name}</h3>
              <p className='text-xs text-gray-400'>Team 1</p>
            </div>
          </div>

          {/* Center Score */}
          <div className='flex justify-center'>
            <div className='w-56 h-56 rounded-full border shadow-sm flex flex-col items-center justify-center bg-white'>
              <span className='text-sm text-gray-500'>LIVE SCORE</span>
              <span className='text-3xl font-bold'>
                {match?.result || "0 - 0"}
              </span>
            </div>
          </div>

          {/* Team 2 */}
          <div className='border rounded-2xl p-5 flex items-center justify-end gap-3'>
            <div className='text-right'>
              <h3 className='text-lg font-bold'>{team2?.name}</h3>
              <p className='text-xs text-gray-400'>Team 2</p>
            </div>

            <div
              className='w-12 h-12 rounded-full  border flex items-center justify-center font-bold text-sm'
              style={{ color: team2?.primaryColor }}
            >
              {team2?.shortName}
            </div>
          </div>
        </div>

        <MatchCommentarySection matchId={match?._id} />
      </div>
    </div>
  )
}

export default MatchCenterPage
