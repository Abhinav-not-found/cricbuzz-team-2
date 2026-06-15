import { clsx } from "clsx"
import { useNavigate, useParams } from "react-router"
import { twMerge } from "tailwind-merge"
import GobackBtn from "@/shared/components/ui/GobackBtn"

const cn = (...args) => twMerge(clsx(...args))

const roles = ["BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"]

const PlayerFormPage = () => {
  const { id } = useParams() // id hai → edit mode, nahi hai → create mode
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  return (
    <div className='h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8'>
      <GobackBtn />
      <div className='mt-2'>
        <div className='bg-white shadow-sm overflow-hidden'>
          <Header isEdit={isEdit} />
          {/* Form */}
          <div className='px-4 py-5 flex flex-col gap-4'>
            {/* Name + Country */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-[11px] text-gray-500 mb-1.5'>
                  Full name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Virat Kohli'
                  className='w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 transition-all'
                />
              </div>
              <div>
                <label className='block text-[11px] text-gray-500 mb-1.5'>
                  Country <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='India'
                  className='w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 transition-all'
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className='block text-[11px] text-gray-500 mb-1.5'>
                Role <span className='text-red-500'>*</span>
              </label>
              <select className='w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 transition-all'>
                <option value=''>Select role</option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className='block text-[11px] text-gray-500 mb-1.5'>
                Image URL{" "}
                <span className='text-[10px] text-gray-400'>(optional)</span>
              </label>
              <input
                type='text'
                placeholder='https://...'
                className='w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 transition-all'
              />
            </div>

            {/* Batting + Bowling style */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-[11px] text-gray-500 mb-1.5'>
                  Batting style{" "}
                  <span className='text-[10px] text-gray-400'>(optional)</span>
                </label>
                <input
                  type='text'
                  placeholder='Right-hand bat'
                  className='w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 transition-all'
                />
              </div>
              <div>
                <label className='block text-[11px] text-gray-500 mb-1.5'>
                  Bowling style{" "}
                  <span className='text-[10px] text-gray-400'>(optional)</span>
                </label>
                <input
                  type='text'
                  placeholder='Right-arm fast'
                  className='w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 transition-all'
                />
              </div>
            </div>

            {/* Buttons */}
            <div className='flex gap-3 pt-1'>
              <button
                type='button'
                onClick={() => navigate(-1)}
                className='flex-1 h-9 border border-gray-300 text-gray-600 text-[13px] font-medium rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all'
              >
                Cancel
              </button>
              <button
                type='button'
                className='flex-1 h-9 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 active:scale-[0.98] text-white text-[13px] font-medium rounded-lg transition-all'
              >
                {isEdit ? "Save changes" : "Create player"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerFormPage

const Header = ({ isEdit }) => {
  return (
    <div className='flex items-center gap-3 px-4 py-3 border-b border-gray-100'>
      <div>
        <h1 className='text-[14px] font-medium text-gray-900'>
          {isEdit ? "Edit player" : "Create player"}
        </h1>
        <p className='text-[12px] text-gray-400 mt-0.5'>
          {isEdit
            ? "Update player details"
            : "Fill in the player details below"}
        </p>
      </div>
    </div>
  )
}
