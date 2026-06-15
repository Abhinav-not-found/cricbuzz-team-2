import { Outlet } from "react-router"
import LogoutBtn from "../LogoutBtn"

const Topbar = () => {
  return (
    <div className='h-screen flex flex-col w-full'>
      <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0'>
        <h1 className='text-md font-semibold text-gray-800'>Admin Dashboard</h1>
        <LogoutBtn />
      </header>

      <div className='flex-1 overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default Topbar
