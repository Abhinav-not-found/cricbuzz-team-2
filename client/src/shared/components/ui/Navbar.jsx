import { Link } from "react-router"
import Button from "./Button"

const Navbar = () => {
  return (
    <header className='h-14 w-full flex items-center justify-between px-10 border-b border-neutral-200 '>
      <div>CricBuzz</div>
      <Link to={"/auth"}>
        <Button>Login</Button>
      </Link>
    </header>
  )
}

export default Navbar
