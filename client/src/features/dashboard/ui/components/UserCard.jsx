import React from "react"

const UserCard = ({
  user,
  onStartEdit,
  onRoleChange,
  onSoftDelete,
  onHardDelete,
}) => {
  return (
    <div className='bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gray-300 transition-colors text-left'>
      <div className='space-y-1'>
        <div className='flex items-center gap-2'>
          <h4 className='font-semibold text-sm text-gray-900'>{user.name}</h4>
          <span
            className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
              user.role === "ADMIN"
                ? "bg-purple-50 text-purple-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {user.role}
          </span>
        </div>
        <p className='text-xs text-gray-400'>{user.email}</p>
        <p className='text-[10px] text-gray-300 font-mono'>UID: {user._id}</p>
      </div>

      <div className='flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-none pt-3 sm:pt-0'>
        <select
          value={user.role}
          onChange={(e) => onRoleChange(user._id, e.target.value)}
          className='p-1.5 text-[11px] bg-gray-50 border border-gray-200 rounded-md text-gray-600 font-medium focus:outline-none'
        >
          <option value='SCORER'>SCORER</option>
          <option value='ADMIN'>ADMIN</option>
        </select>

        <button
          onClick={() => onStartEdit(user)}
          className='text-[11px] font-medium text-gray-500 hover:text-gray-900'
        >
          Edit
        </button>

        <button
          onClick={() => onSoftDelete(user._id)}
          className='text-[11px] font-medium text-amber-600 hover:text-amber-800'
        >
          Soft-Purge
        </button>

        <button
          onClick={() => onHardDelete(user._id)}
          className='text-[11px] font-medium text-red-500 hover:text-red-700'
        >
          Hard-Delete
        </button>
      </div>
    </div>
  )
}

export default UserCard
