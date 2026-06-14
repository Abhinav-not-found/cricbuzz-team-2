import GoogleBtn from "./GoogleBtn"
import RegisterForm from "./register/RegisterForm"

const RegisterPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8'>
      <div className='w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-7 shadow-sm'>
        {/* Brand */}
        <div className='flex items-center gap-2 mb-6'>
          <div className='w-8 h-8 bg-[#1a1a2e] rounded-lg flex items-center justify-center'>
            <i
              className='ti ti-device-mobile text-white text-base'
              aria-hidden='true'
            />
          </div>
          <span className='text-[15px] font-medium text-gray-900'>
            Cricbuzz
          </span>
        </div>

        {/* Heading */}
        <h1 className='text-[19px] font-medium text-gray-900 mb-1'>
          Create account
        </h1>
        <p className='text-[13px] text-gray-500 mb-5'>
          Register to get started
        </p>

        <RegisterForm />

        {/* Divider */}
        <div className='flex items-center gap-2.5 my-4'>
          <div className='flex-1 h-px bg-gray-100' />
          <span className='text-[12px] text-gray-400'>or</span>
          <div className='flex-1 h-px bg-gray-100' />
        </div>

        <GoogleBtn />

        {/* Footer */}
        <p className='mt-4 text-center text-[13px] text-gray-500'>
          Already have an account?{" "}
          <a
            href='/auth'
            className='text-[#1a1a2e] font-medium hover:underline'
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
