const NameField = ({ register, errors }) => {
  return (
    <div className='mb-3.5'>
      <label className='block text-[12px] text-gray-500 mb-1.5'>
        Full name
      </label>
      <input
        {...register("name", {
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Minimum 3 characters",
          },
          maxLength: {
            value: 20,
            message: "Maximum 20 characters",
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Only letters are allowed",
          },
          validate: {
            noOnlySpaces: (value) =>
              value.trim().length > 0 || "Name cannot be empty spaces",
          },
        })}
        type='text'
        placeholder='Rohit Sharma'
        className={`w-full h-10 px-3 text-sm border border-gray-300 rounded-[10px] bg-white text-gray-900 transition-all focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 ${errors.name ? "border-red-500 outline-red-500" : "border-neutral-300"}`}
      />
      {errors.name && (
        <p className='text-xs text-red-500'>{errors.name.message}*</p>
      )}
    </div>
  )
}

export default NameField
