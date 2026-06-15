import { useState } from "react"
import { useNavigate } from "react-router"
import { deletePlayer } from "../../api/playerApis"
import PlayerCard from "./PlayerCard"

const PlayerList = ({ players, setPlayers }) => {
  const [openId, setOpenId] = useState(null)
  const navigate = useNavigate()

  const handleEdit = (id) => navigate(`/admin/players/${id}/edit`)

  const handleDeletePlayer = async (id) => {
    deletePlayer(id, setPlayers)
  }

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
              onDelete={handleDeletePlayer}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default PlayerList
