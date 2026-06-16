import { useContext, useEffect, useState } from "react"
import { socketContext } from "@/shared/context/socketContext"

const MatchCommentarySection = ({ matchId }) => {
  const [commentary, setCommentary] = useState([])
  // console.log(commentary)
  const { socket } = useContext(socketContext)

  useEffect(() => {
    if (!socket) return

    const handler = (data) => {
      console.log("NEW COMMENTARY:", data)
      setCommentary((prev) => [data.data, ...prev])
    }

    socket.on("commentary:new", handler)

    return () => socket.off("commentary:new", handler)
  }, [socket])

  return (
    <div>
      <div className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
            <svg
              className='w-5 h-5 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              />
            </svg>
            Commentary
          </h2>
          <button className='text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors'>
            Ball by ball
          </button>
        </div>

        <div className='divide-y divide-gray-100'>
          {commentary.map((ball, index) => (
            <div
              key={index}
              className='py-4 flex gap-6 items-start first:pt-0 last:pb-0'
            >
              <span className='text-sm font-bold text-gray-400 pt-1 w-10 shrink-0'>
                {ball.over}
              </span>
              <div className='space-y-2'>
                <span
                  className={`inline-block text-[11px] font-extrabold px-2 py-0.5 rounded border ${ball.color} tracking-wider`}
                >
                  {ball.type}
                </span>
                <p className='text-sm text-gray-600 leading-relaxed'>
                  {ball.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MatchCommentarySection
