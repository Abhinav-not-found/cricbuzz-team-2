import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import GobackBtn from "@/shared/components/ui/GobackBtn"
import { createTeam, getTeamById, updateTeam } from "../../api/teamApi"

const TeamFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleTeamSubmit = async (data) => {
    if (isEdit) {
      await updateTeam(id, data)
      navigate("/admin/teams")
    } else {
      await createTeam(data, reset)
    }
  }

  const color = watch("primaryColor") || "#FF9933"

  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) return

      const team = await getTeamById(id)

      reset({
        name: team.name,
        shortName: team.shortName,
        logo: team.logo,
        primaryColor: team.primaryColor,
      })
    }

    fetchTeam()
  }, [id, reset])

  return (
    <div className='px-4 py-5 flex flex-col gap-4'>
      <GobackBtn />
      <div className='max-w-xl mx-auto'>
        <div className='bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden'>
          {/* Header */}
          <div className='flex items-center gap-3 px-4 py-3 border-b border-gray-100'>
            <button
              type='button'
              onClick={() => navigate(-1)}
              className='w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors'
            >
              <i className='ti ti-arrow-left text-[14px]' />
            </button>
            <div>
              <h1 className='text-[14px] font-medium text-gray-900'>
                {isEdit ? "Edit team" : "Add team"}
              </h1>
              <p className='text-[12px] text-gray-400 mt-0.5'>
                {isEdit
                  ? "Update team details"
                  : "Fill in the team details below"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(handleTeamSubmit)}
            className='px-4 py-5 flex flex-col gap-4'
          >
            {/* Name + Short Name */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-[11px] text-gray-500 mb-1.5'>
                  Team name <span className='text-red-500'>*</span>
                </label>
                <input
                  {...register("name", {
                    required: "Team name is required",
                  })}
                  type='text'
                  placeholder='India'
                  className={`w-full h-9 px-3 text-[13px] border rounded-lg ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.name && (
                  <p className='text-xs text-red-500'>{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className='block text-[11px] text-gray-500 mb-1.5'>
                  Short name <span className='text-red-500'>*</span>
                </label>
                <input
                  {...register("shortName", {
                    required: "Short name is required",
                  })}
                  type='text'
                  placeholder='IND'
                  className={`w-full h-9 px-3 text-[13px] border rounded-lg ${
                    errors.shortName ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.shortName && (
                  <p className='text-xs text-red-500'>
                    {errors.shortName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Logo URL */}
            <div>
              <label className='block text-[11px] text-gray-500 mb-1.5'>
                Logo URL <span className='text-red-500'>*</span>
              </label>
              <input
                {...register("logo")}
                type='text'
                placeholder='https://...'
                className='w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg'
              />
            </div>

            {/* Primary Color */}
            <div>
              <label className='block text-[11px] text-gray-500 mb-1.5'>
                Primary color{" "}
                <span className='text-[10px] text-gray-400'>(optional)</span>
              </label>
              <div className='flex items-center gap-2'>
                <input
                  type='color'
                  {...register("primaryColor")}
                  value={color}
                  className='w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5 bg-white'
                />
                <input
                  {...register("primaryColor")}
                  type='text'
                  placeholder='#FF9933'
                  className='flex-1 h-9 px-3 text-[13px] border border-gray-300 rounded-lg'
                />
              </div>
            </div>

            {/* Buttons */}
            <div className='flex gap-3 pt-1'>
              <button
                type='button'
                onClick={() => navigate(-1)}
                className='flex-1 h-9 border border-gray-300 text-gray-600 text-[13px] font-medium rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className='flex-1 h-9 bg-[#1a1a2e] text-white text-[13px] font-medium rounded-lg'
              >
                {isEdit ? "Save changes" : "Add team"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TeamFormPage
