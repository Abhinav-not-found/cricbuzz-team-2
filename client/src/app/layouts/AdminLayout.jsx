import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import Sidebar from "@/shared/components/ui/admin/Sidebar"
import Topbar from "@/shared/components/ui/admin/Topbar"

const AdminLayout = () => {
  const { user, authChecked } = useSelector((store) => store.auth)

  if (!authChecked) return <p>Loading...</p>

  if (!user) {
    return <Navigate to={"/"} />
  }
  return (
    <div className='flex h-screen w-full bg-gray-100 font-sans text-gray-800'>
      <Sidebar />
      <Topbar />
    </div>
  )
}

export default AdminLayout
