import { useForm } from "react-hook-form"
import Spinner from "@/shared/components/ui/Spinner"
import useAuth from "../../hook/useAuth"
import EmailField from "./EmailField"
import PasswordField from "./PasswordField"

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const { handleLogin } = useAuth(reset)

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <EmailField register={register} errors={errors} />
      <PasswordField register={register} errors={errors} />
      <button
        type='submit'
        className='w-full h-10 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 active:scale-[0.98] text-white text-sm font-medium rounded-[10px] transition-all cursor-pointer'
      >
        {isSubmitting ? (
          <>
            <Spinner />
            <p>signing in</p>
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  )
}

export default LoginForm
