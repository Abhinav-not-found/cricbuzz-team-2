import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...args) => twMerge(clsx(...args))

const TeamCard = ({ team, openId, setOpenId, onEdit, onDelete, onSquad }) => {
  const ref = useRef(null)
  const isOpen = openId === team._id

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpenId(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [setOpenId])

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden relative">

      {/* Primary color bar */}
      <div
        className="h-1.5 w-full"
        style={{ background: team.primaryColor || '#e5e7eb' }}
      />

      {/* 3 dots — top right */}
      <div ref={ref} className="absolute top-4 right-3">
        <button
          type="button"
          onClick={() => setOpenId(isOpen ? null : team._id)}
          className="w-7 h-7 flex items-center gap-0.5 justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
        >
          <span className='h-[3px] w-[3px] bg-black rounded-2xl'></span>
          <span className='h-[3px] w-[3px] bg-black rounded-2xl'></span>
          <span className='h-[3px] w-[3px] bg-black rounded-2xl'></span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-9 w-36 bg-white border border-gray-200 rounded-xl shadow-md z-10 overflow-hidden">
            <button
              type="button"
              onClick={() => { setOpenId(null); onEdit(team._id) }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <i className="ti ti-edit text-[14px]" />
              Edit
            </button>
            <div className="h-px bg-gray-100" />
            <button
              type="button"
              onClick={() => { setOpenId(null); onSquad(team._id) }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <i className="ti ti-users text-[14px]" />
              Squad
            </button>
            <div className="h-px bg-gray-100" />
            <button
              type="button"
              onClick={() => { setOpenId(null); onDelete(team._id) }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-red-600 hover:bg-red-50 transition-colors"
            >
              <i className="ti ti-trash text-[14px]" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Top — logo + name + shortName */}
      <div className="flex flex-col items-center px-4 pt-5 pb-4 border-b border-gray-100">
        <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[13px] font-semibold text-gray-500 overflow-hidden mb-3">
          {team.logo
            ? <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
            : team.shortName
          }
        </div>
        <p className="text-[14px] font-medium text-gray-900 text-center">{team.name}</p>
        <p className="text-[12px] text-gray-400 mt-0.5">{team.shortName}</p>
      </div>

      {/* Bottom — squad count + color */}
      <div className="px-4 py-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-400">Squad</span>
          <span className="text-[12px] text-gray-700">{team.squadPlayers?.length || 0} players</span>
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-400">Color</span>
          {team.primaryColor ? (
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ background: team.primaryColor }}
              />
              <span className="text-[12px] text-gray-700">{team.primaryColor}</span>
            </div>
          ) : (
            <span className="text-[12px] text-gray-400">—</span>
          )}
        </div>
      </div>

    </div>
  )
}

export default TeamCard