import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const SuperAdminLayout = () => {
  const { user, authChecked } = useSelector((store) => store.auth)

  if (!authChecked) return <p>Loading...</p>

  if (!user) {
    return <Navigate to={"/"} />
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default SuperAdminLayout
