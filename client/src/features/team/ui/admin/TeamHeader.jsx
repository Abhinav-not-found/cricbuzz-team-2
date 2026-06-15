import { useNavigate } from "react-router"

const TeamHeader = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-between sm:flex-row gap-3 mb-5'>
      <p className='font-semibold text-xl tracking-tight'>Manage Players</p>
      <button
        type='button'
        onClick={() => navigate("/admin/teams/new")}
        className='h-9 px-4 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 active:scale-[0.98] text-white text-[12px] font-medium rounded-lg transition-all whitespace-nowrap'
      >
        + create team
      </button>
    </div>
  )
}

export default TeamHeader
