import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const PublicLayout = () => {
  const { user, isLoading } = useSelector((store) => store.auth)

  if (isLoading) return <p>Loading...</p>

  if (user) {
    return <Navigate to={"/admin"} />
  }
  return <Outlet />
}

export default PublicLayout
