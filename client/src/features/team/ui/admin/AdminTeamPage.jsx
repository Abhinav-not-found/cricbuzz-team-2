import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { deleteTeam, getAllTeams } from "../../api/teamApi"
import TeamCard from "./TeamCard"
import TeamHeader from "./TeamHeader"

const AdminTeamPage = () => {
  const navigate = useNavigate()
  const [openId, setOpenId] = useState(null)
  const [teams, setTeams] = useState([])

  const handleEdit = (id) => navigate(`/admin/teams/${id}/edit`)
  const handleDeleteTeam = async (id) => {
    deleteTeam(id, setTeams)
  }
  const handleSquad = (id) => navigate(`/admin/teams/${id}`)

  useEffect(() => {
    getAllTeams(setTeams)
  }, [])

  return (
    <div className='h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <TeamHeader />

        {teams.length === 0 ? (
          <div className='text-center py-16 text-[13px] text-gray-400'>
            No teams found
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {teams.map((t) => (
              <TeamCard
                key={t._id}
                team={t}
                openId={openId}
                setOpenId={setOpenId}
                onEdit={handleEdit}
                onSquad={handleSquad}
                onDelete={handleDeleteTeam}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminTeamPage
