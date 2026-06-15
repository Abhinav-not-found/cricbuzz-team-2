import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const UserForm = ({ editingUser, onCreateUser, onUpdateUser, onCancelEdit }) => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue,
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: { name: '', email: '', password: '', role: 'SCORER' }
  })

  useEffect(() => {
    if (editingUser) {
      setValue("name", editingUser.name)
      setValue("email", editingUser.email)
    } else {
      reset({ name: '', email: '', password: '', role: 'SCORER' })
    }
  }, [editingUser, setValue, reset])

  const onSubmit = (data) => {
    if (editingUser) {
      onUpdateUser(data)
    } else {
      onCreateUser(data)
      console.log(data);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4 text-left">
      <h2 className="text-sm font-bold text-gray-700">
        {editingUser ? " Edit User Profile" : " Provision New User"}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input 
            {...register("name", { required: "Name missing" })}
            type="text" 
            placeholder="Full Name" 
            className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          />
          {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input 
            {...register("email", { required: "Email missing" })}
            type="email" 
            placeholder="Email Address" 
            className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          />
          {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {!editingUser && (
          <div>
            <input 
              {...register("password", { required: "Password missing" })}
              type="password" 
              placeholder="Password" 
              className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
            />
            {errors.password && <p className="text-[10px] text-red-500 mt-1">{errors.password.message}</p>}
          </div>
        )}

        {!editingUser && (
          <div>
            <select 
              {...register("role")}
              className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-600 font-medium"
            >
              <option value="SCORER">SCORER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white text-xs font-semibold rounded-lg transition-all"
          >
            {isSubmitting ? "Processing..." : editingUser ? "Save Changes" : "Create User"}
          </button>
          
          {editingUser && (
            <button 
              type="button"
              onClick={onCancelEdit}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default UserForm