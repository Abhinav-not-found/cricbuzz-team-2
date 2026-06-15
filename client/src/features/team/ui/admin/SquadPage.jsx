import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getAllPlayers } from "@/features/player/api/playerApis"
import PlayerCard from "@/features/player/ui/admin/PlayerCard"
import GobackBtn from "@/shared/components/ui/GobackBtn"
import {
  addPlayersToTeam,
  getTeamById,
  removePlayersFromTeam,
} from "../../api/teamApi"

const SquadPage = () => {
  const { id: teamId } = useParams()
  const [players, setPlayers] = useState([]) // squad players
  const [allPlayers, setAllPlayers] = useState([]) // all available players
  const [openId, setOpenId] = useState(null)
  const [showAddPlayer, setShowAddPlayer] = useState(false)

  useEffect(() => {
    getAllPlayers(setAllPlayers)
  }, [])

  const handleRemovePlayer = async (playerId) => {
    const updatedTeam = await removePlayersFromTeam(teamId, [playerId])

    if (updatedTeam) {
      setPlayers(updatedTeam.squadPlayers)
    }
  }

  const handleAddPlayer = async (player) => {
    const updatedTeam = await addPlayersToTeam(teamId, [player._id])

    if (updatedTeam) {
      setPlayers(updatedTeam.squadPlayers)
      setShowAddPlayer(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const team = await getTeamById(teamId)

      if (team) {
        setPlayers(team.squadPlayers || [])
      }

      getAllPlayers(setAllPlayers)
    }

    loadData()
  }, [teamId])

  const availablePlayers = allPlayers.filter(
    (player) => !players.some((p) => p._id === player._id),
  )

  return (
    <div className='h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8'>
      <GobackBtn />
      <Header
        playerCount={players.length}
        showAddPlayer={showAddPlayer}
        setShowAddPlayer={setShowAddPlayer}
        availablePlayers={availablePlayers}
        onAddPlayer={handleAddPlayer}
      />
      <PlayerGrid
        players={players}
        openId={openId}
        setOpenId={setOpenId}
        onRemove={handleRemovePlayer}
      />
    </div>
  )
}

export default SquadPage

const PlayerGrid = ({ players, openId, setOpenId, onRemove }) => {
  console.log(players)
  if (players.length === 0) {
    return (
      <div className='text-center py-16 text-[13px] text-gray-400'>
        No players in squad
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {players.map((player) => (
        <PlayerCard
          key={player._id}
          player={player}
          openId={openId}
          setOpenId={setOpenId}
          onDelete={onRemove}
          hideEdit
        />
      ))}
    </div>
  )
}

const Header = ({
  playerCount,
  showAddPlayer,
  setShowAddPlayer,
  availablePlayers,
  onAddPlayer,
}) => {
  return (
    <div className='flex items-center justify-between mb-5 mt-2'>
      <div>
        <h1 className='text-[14px] font-medium text-gray-900'>Team Squad</h1>
        <p className='text-[12px] text-gray-400'>{playerCount} players</p>
      </div>

      <div className='relative'>
        <button
          type='button'
          onClick={() => setShowAddPlayer((prev) => !prev)}
          className='h-9 px-4 bg-[#1a1a2e] text-white text-[13px] font-medium rounded-lg'
        >
          Add Player
        </button>

        {showAddPlayer && (
          <div className='absolute right-0 top-11 w-72 bg-white border border-gray-200 rounded-xl shadow-md z-20 overflow-hidden'>
            <div className='px-3 py-2 border-b border-gray-100'>
              <p className='text-[12px] text-gray-500'>Available Players</p>
            </div>

            {availablePlayers.length === 0 ? (
              <p className='p-3 text-[12px] text-gray-400'>
                No players available
              </p>
            ) : (
              availablePlayers.map((player) => (
                <button
                  key={player._id}
                  type='button'
                  onClick={() => onAddPlayer(player)}
                  className='w-full text-left px-3 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0'
                >
                  <p className='text-[13px] text-gray-900'>{player.name}</p>
                  <p className='text-[11px] text-gray-400'>{player.role}</p>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
