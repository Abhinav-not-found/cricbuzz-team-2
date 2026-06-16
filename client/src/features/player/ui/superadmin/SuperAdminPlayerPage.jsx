import { useState } from "react"
import { useNavigate } from "react-router"
import PlayerCard from "./PlayerCard"

const players = [
  {
    _id: "1",
    name: "Virat Kohli",
    role: "BATSMAN",
    country: "India",
    battingStyle: "Right-hand bat",
    bowlingStyle: null,
    image: null,
  },
  {
    _id: "2",
    name: "Jasprit Bumrah",
    role: "BOWLER",
    country: "India",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm fast",
    image: null,
  },
  {
    _id: "3",
    name: "Hardik Pandya",
    role: "ALL_ROUNDER",
    country: "India",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm medium",
    image: null,
  },
  {
    _id: "4",
    name: "KL Rahul",
    role: "WICKET_KEEPER",
    country: "India",
    battingStyle: "Right-hand bat",
    bowlingStyle: null,
    image: null,
  },
  {
    _id: "5",
    name: "Steve Smith",
    role: "BATSMAN",
    country: "Australia",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm leg break",
    image: null,
  },
  {
    _id: "6",
    name: "Pat Cummins",
    role: "BOWLER",
    country: "Australia",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm fast",
    image: null,
  },
]

const SuperAdminPlayerPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [openId, setOpenId] = useState(null)

  const filtered = players.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase()),
  )

  const handleEdit = (id) => navigate(`/admin/players/${id}/edit`)
  const handleDelete = (id) => console.log("delete", id)

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Top bar */}
        <div className='flex flex-col sm:flex-row gap-3 mb-5'>
          <div className='flex items-center gap-2 border border-gray-300 rounded-lg px-3 h-9 flex-1 bg-white'>
            <i className='ti ti-search text-gray-400 text-[14px]' />
            <input
              type='text'
              placeholder='Search players...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='flex-1 text-[13px] text-gray-900 h-8 outline-none bg-transparent placeholder:text-gray-400'
            />
          </div>
          <button
            type='button'
            onClick={() => navigate("/admin/players/new")}
            className='h-9 px-4 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 active:scale-[0.98] text-white text-[12px] font-medium rounded-lg transition-all whitespace-nowrap'
          >
            + Add player
          </button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className='text-center py-16 text-[13px] text-gray-400'>
            No players found
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {filtered.map((p) => (
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
      </div>
    </div>
  )
}

export default SuperAdminPlayerPage
