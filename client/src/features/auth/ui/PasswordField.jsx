
const PasswordField = ({ register, errors }) => {
  return (
    <div className='mb-5'>
      <label className='block text-[12px] text-gray-500 mb-1.5'>Password</label>
      <div className='relative'>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
            maxLength: {
              value: 32,
              message: "Maximum 32 characters",
            },
            validate: {
              noSpaces: (value) =>
                !value.includes(" ") || "Password cannot contain spaces",
            },
          })}
          type='text'
          placeholder='••••••••'
          className={`w-full h-10 pl-3 pr-10 text-sm border border-gray-300 rounded-[10px] bg-white text-gray-900 transition-all focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 ${errors.password ? "border-red-500 outline-red-500" : "border-neutral-300"}`}
        />
        {errors.password && (
          <p className='text-xs text-red-500'>{errors.password.message}*</p>
        )}
        <button
          type='button'
          aria-label='Show password'
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
        >
          <i className='ti ti-eye text-[15px]' aria-hidden='true' />
        </button>
      </div>
    </div>
  )
}

export default PasswordField
