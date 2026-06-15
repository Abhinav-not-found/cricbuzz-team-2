import { useSelector } from "react-redux"
import { Link } from "react-router"
import Button from "./Button"
import Logo from "./Logo"
import LogoutBtn from "./LogoutBtn"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  return (
    <header className='h-14 w-full flex items-center justify-between px-10 border-b border-neutral-200 '>
      <Logo user={user} />
      {user ? (
        <LogoutBtn />
      ) : (
        <Link to={"/auth"}>
          <Button>Login</Button>
        </Link>
      )}
    </header>
  )
}

export default Navbar
