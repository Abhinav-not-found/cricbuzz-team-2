import useAuth from "@/features/auth/hook/useAuth"
import Button from "./Button"

const LogoutBtn = () => {
  const { handleLogout } = useAuth()
  return <Button onClick={handleLogout}>Logout</Button>
}

export default LogoutBtn
