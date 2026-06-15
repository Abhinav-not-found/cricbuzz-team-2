import { NavLink } from "react-router"
import Logo from "../Logo"

const Sidebar = () => {
  return (
    <aside className='w-64 bg-slate-900 text-slate-200 flex flex-col p-5 shadow-xl shrink-0'>
      <div>
        <Logo className={"gap-2"} />
        <nav className='flex flex-col gap-2 mt-4'>
          <Lnk path={"/admin/players"}>Players</Lnk>
          <Lnk path={"/admin/teams"}>Teams</Lnk>
          <Lnk path={"/admin/series"}>Series</Lnk>
          <Lnk path={"/admin/commentary"}>Live Commentary</Lnk>
          <Lnk path={"/admin/match"}>Matches</Lnk>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar

const Lnk = ({ path, children }) => {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        isActive
          ? "border-l-4 border-emerald-600 p-3 rounded-lg rounded-l-sm hover:bg-slate-700 hover:text-white transition-colors duration-150 font-medium bg-slate-800"
          : "p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-150 font-medium"
      }
    >
      {children}
    </NavLink>
  )
}
