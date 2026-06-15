import { useState } from "react"
import { useNavigate } from "react-router"
import TeamCard from "./TeamCard"

const teams = [
  {
    _id: "1",
    name: "India",
    shortName: "IND",
    logo: null,
    primaryColor: "#FF9933",
    squadPlayers: Array(15),
  },
  {
    _id: "2",
    name: "Australia",
    shortName: "AUS",
    logo: null,
    primaryColor: "#FFD700",
    squadPlayers: Array(13),
  },
  {
    _id: "3",
    name: "England",
    shortName: "ENG",
    logo: null,
    primaryColor: "#003087",
    squadPlayers: Array(11),
  },
  {
    _id: "4",
    name: "Pakistan",
    shortName: "PAK",
    logo: null,
    primaryColor: "#01411C",
    squadPlayers: Array(14),
  },
  {
    _id: "5",
    name: "Sri Lanka",
    shortName: "SL",
    logo: null,
    primaryColor: "#003478",
    squadPlayers: Array(10),
  },
  {
    _id: "6",
    name: "New Zealand",
    shortName: "NZ",
    logo: null,
    primaryColor: "#000000",
    squadPlayers: Array(12),
  },
]

const AdminTeamPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [openId, setOpenId] = useState(null)

  const filtered = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.shortName.toLowerCase().includes(search.toLowerCase()),
  )

  const handleEdit = (id) => navigate(`/admin/teams/${id}/edit`)
  const handleSquad = (id) => navigate(`/admin/teams/${id}/squad`)
  const handleDelete = (id) => console.log("delete", id)

  return (
    <div className='h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Top bar */}
        <div className='flex flex-col sm:flex-row gap-3 mb-5'>
          <div className='flex items-center gap-2 border border-gray-300 rounded-lg px-3 h-9 flex-1 bg-white'>
            <i className='ti ti-search text-gray-400 text-[14px]' />
            <input
              type='text'
              placeholder='Search teams...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='flex-1 text-[13px] text-gray-900 outline-none bg-transparent placeholder:text-gray-400'
            />
          </div>
          <button
            type='button'
            onClick={() => navigate("/admin/teams/new")}
            className='h-9 px-4 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 active:scale-[0.98] text-white text-[12px] font-medium rounded-lg transition-all whitespace-nowrap'
          >
            + Add team
          </button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className='text-center py-16 text-[13px] text-gray-400'>
            No teams found
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {filtered.map((t) => (
              <TeamCard
                key={t._id}
                team={t}
                openId={openId}
                setOpenId={setOpenId}
                onEdit={handleEdit}
                onSquad={handleSquad}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminTeamPage
