import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...args) => twMerge(clsx(...args))

const roleConfig = {
  BATSMAN: "bg-blue-50 text-blue-700 border border-blue-200",
  BOWLER: "bg-red-50 text-red-600 border border-red-200",
  ALL_ROUNDER: "bg-green-50 text-green-700 border border-green-200",
  WICKET_KEEPER: "bg-amber-50 text-amber-700 border border-amber-200",
}

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

const PlayerCard = ({ player, openId, setOpenId, onEdit, onDelete }) => {
  const isOpen = openId === player._id

  return (
    <div className='bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden relative'>
      {/* 3 dots — top right */}
      <div className='absolute top-3 right-3'>
        <button
          type='button'
          onClick={() => setOpenId(isOpen ? null : player._id)}
          className='w-7 h-7 gap-0.5 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors'
        >
          <span className='h-[3px] w-[3px] bg-black rounded-2xl'></span>
          <span className='h-[3px] w-[3px] bg-black rounded-2xl'></span>
          <span className='h-[3px] w-[3px] bg-black rounded-2xl'></span>
        </button>

        {isOpen && (
          <div className='absolute right-0 top-9 w-32 bg-white border border-gray-200 rounded-xl shadow-md z-10 overflow-hidden'>
            <button
              type='button'
              onClick={() => {
                setOpenId(null)
                onEdit(player._id)
              }}
              className='w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors'
            >
              <i className='ti ti-edit text-[14px]' />
              Edit
            </button>
            <div className='h-px bg-gray-100' />
            <button
              type='button'
              onClick={() => onDelete(player._id)}
              className='w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-red-600 hover:bg-red-50 transition-colors'
            >
              <i className='ti ti-trash text-[14px]' />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Top — avatar + name + country + role */}
      <div className='flex flex-col items-center px-4 pt-5 pb-4 border-b border-gray-100'>
        <div className='w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[18px] font-medium text-gray-500 overflow-hidden mb-3 flex-shrink-0'>
          {player.image ? (
            <img
              src={player.image}
              alt={player.name}
              className='w-full h-full object-cover'
            />
          ) : (
            getInitials(player.name)
          )}
        </div>
        <p className='text-[14px] font-medium text-gray-900 text-center'>
          {player.name}
        </p>
        <p className='text-[12px] text-gray-400 mt-0.5'>{player.country}</p>
        <span
          className={cn(
            "mt-2 text-[10px] font-medium rounded-md px-2 py-0.5",
            roleConfig[player.role],
          )}
        >
          {player.role}
        </span>
      </div>

      {/* Bottom — batting + bowling */}
      <div className='px-4 py-3 flex flex-col gap-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-[11px] text-gray-400'>Batting</span>
          <span className='text-[12px] text-gray-700'>
            {player.battingStyle || "—"}
          </span>
        </div>
        <div className='h-px bg-gray-100' />
        <div className='flex items-center justify-between'>
          <span className='text-[11px] text-gray-400'>Bowling</span>
          <span className='text-[12px] text-gray-700'>
            {player.bowlingStyle || "—"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
