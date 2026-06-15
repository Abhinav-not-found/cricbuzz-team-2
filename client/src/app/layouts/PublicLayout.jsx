import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"
import Navbar from "@/shared/components/ui/Navbar"

const PublicLayout = () => {
  const { user, isLoading } = useSelector((store) => store.auth)
  if (isLoading) return <p>Loading...</p>

  if (user && user.role === "ADMIN") {
    return <Navigate to={"/admin"} />
  }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default PublicLayout
