import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const AdminLayout = () => {
  const { user, authChecked } = useSelector((store) => store.auth)

  if (!authChecked) return <p>Loading...</p>

  if (!user) {
    return <Navigate to={"/"} />
  }
  return <Outlet />
}

export default AdminLayout
