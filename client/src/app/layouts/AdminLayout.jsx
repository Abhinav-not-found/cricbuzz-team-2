import LogoutBtn from "@/shared/components/ui/LogoutBtn";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router";

const AdminLayout = () => {
  const { user, authChecked } = useSelector((store) => store.auth)

  if (!authChecked) return <p>Loading...</p>

  if (!user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex h-screen w-full bg-gray-100 font-sans text-gray-800">
      <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col p-5 shadow-xl shrink-0">
        <div>
          <div className="text-xl font-bold text-sky-400 mb-8 text-center border-b border-slate-700 pb-4 tracking-wide">
            CricBuzz Admin
          </div>
          <nav className="flex flex-col gap-2">
            <Link
              to="/admin"
              className="p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-150 font-medium block"
            >
              Admin Home
            </Link>

            <Link
              to="/admin/players"
              className="p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-150 font-medium block"
            >
              Players Page
            </Link>

            <Link
              to="/admin/teams"
              className="p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-150 font-medium block"
            >
              Teams Page
            </Link>
          </nav>
        </div>
      </aside>
      <div className="w-full">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <div>
            <LogoutBtn />
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
