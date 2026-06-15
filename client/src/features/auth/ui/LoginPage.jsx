import Logo from "@/shared/components/ui/Logo"
import GoogleBtn from "./GoogleBtn"
import LoginForm from "./login/LoginForm"

const LoginPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8'>
      <div className='w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-7 shadow-sm'>
        <div className='mb-4'>
          <Logo />
        </div>

        {/* Heading */}
        <h1 className='text-[19px] font-medium text-gray-900 mb-1'>
          Welcome back
        </h1>
        <p className='text-[13px] text-gray-500 mb-5'>
          Sign in to your account
        </p>

        <LoginForm />

        {/* Divider */}
        <div className='flex items-center gap-2.5 my-4'>
          <div className='flex-1 h-px bg-gray-100' />
          <span className='text-[12px] text-gray-400'>or</span>
          <div className='flex-1 h-px bg-gray-100' />
        </div>

        <GoogleBtn />

        <p className='mt-4 text-center text-[13px] text-gray-500'>
          Don't have an account?{" "}
          <a
            href='/auth/register'
            className='text-[#1a1a2e] font-medium hover:underline'
          >
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
