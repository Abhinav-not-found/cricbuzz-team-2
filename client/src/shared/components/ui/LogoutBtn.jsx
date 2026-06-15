import { LogOut } from "lucide-react"
import useAuth from "@/features/auth/hook/useAuth"
import Button from "./Button"

const LogoutBtn = () => {
  const { handleLogout } = useAuth()
  return (
    <Button
      variant='outline'
      onClick={handleLogout}
      className={"flex items-center gap-2"}
    >
      <LogOut className='size-4' />
      Logout
    </Button>
  )
}

export default LogoutBtn
