import { useState } from "react"
import PlayerCard from "./PlayerCard"

const PlayerList = ({ players }) => {
  const [openId, setOpenId] = useState(null)

  const handleEdit = (id) => navigate(`/admin/players/${id}/edit`)
  const handleDelete = (id) => console.log("delete", id)
  return (
    <>
      {players.length === 0 ? (
        <div className='text-center py-16 text-[13px] text-gray-400'>
          No players found
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {players.map((p) => (
            <PlayerCard
              key={p._id}
              player={p}
              openId={openId}
              setOpenId={setOpenId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default PlayerList
