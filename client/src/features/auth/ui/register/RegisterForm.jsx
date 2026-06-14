import { useForm } from "react-hook-form"
import Spinner from "@/shared/components/ui/Spinner"
import useAuth from "../../hook/useAuth"
import EmailField from "../EmailField"
import NameField from "../NameField"
import PasswordField from "../PasswordField"

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const { handleRegister } = useAuth(reset)
  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <NameField register={register} errors={errors} />
      <EmailField register={register} errors={errors} />
      <PasswordField register={register} errors={errors} />
      <button
        type='submit'
        className='w-full h-10 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 active:scale-[0.98] text-white text-sm font-medium rounded-[10px] transition-all cursor-pointer'
      >
        {isSubmitting ? (
          <>
            <Spinner />
            <p>Creating account...</p>
          </>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  )
}

export default RegisterForm
