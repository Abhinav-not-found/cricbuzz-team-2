import clsx from "clsx"
import { Link } from "react-router"
import { twMerge } from "tailwind-merge"

const Logo = ({ user = null, className }) => {
  return (
    <Link
      to={user ? "/admin" : "/"}
      className={twMerge(
        clsx("size-8 flex items-center select-none", className),
      )}
    >
      <img
        src='https://ik.imagekit.io/nya4chyes/images.svg'
        alt='logo'
        className='w-full h-full p-0.5 rounded-lg'
      />
      <p className='font-medium tracking-tight'>
        Cric<span className='font-semibold'>Buzz</span>
      </p>
    </Link>
  )
}

export default Logo
