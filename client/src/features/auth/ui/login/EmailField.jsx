const EmailField = ({ register, errors }) => {
  return (
    <div className='mb-3.5'>
      <label className='block text-[12px] text-gray-500 mb-1.5'>Email</label>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
          maxLength: {
            value: 100,
            message: "Email is too long",
          },

          validate: {
            noSpaces: (value) =>
              !value.includes(" ") || "Email cannot contain spaces",
          },
        })}
        type='email'
        placeholder='you@example.com'
        className={`w-full h-10 px-3 text-sm border border-gray-300 rounded-[10px] bg-white text-gray-900 transition-all focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 ${errors.email ? "border-red-500 outline-red-500" : "border-neutral-300"}`}
      />
      {errors.email && (
        <p className='text-xs text-red-500'>{errors.email.message}*</p>
      )}
    </div>
  )
}

export default EmailField
