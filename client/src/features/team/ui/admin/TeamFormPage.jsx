import { useParams, useNavigate } from 'react-router'

const TeamFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors"
            >
              <i className="ti ti-arrow-left text-[14px]" />
            </button>
            <div>
              <h1 className="text-[14px] font-medium text-gray-900">
                {isEdit ? 'Edit team' : 'Add team'}
              </h1>
              <p className="text-[12px] text-gray-400 mt-0.5">
                {isEdit ? 'Update team details' : 'Fill in the team details below'}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-4 py-5 flex flex-col gap-4">

            {/* Name + Short Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1.5">
                  Team name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="India"
                  className="w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1.5">
                  Short name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="IND"
                  className="w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 transition-all"
                />
              </div>
            </div>

            {/* Logo URL */}
            <div>
              <label className="block text-[11px] text-gray-500 mb-1.5">
                Logo URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="https://..."
                className="w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 transition-all"
              />
            </div>

            {/* Primary Color */}
            <div>
              <label className="block text-[11px] text-gray-500 mb-1.5">
                Primary color <span className="text-[10px] text-gray-400">(optional)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  defaultValue="#FF9933"
                  className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5 bg-white"
                />
                <input
                  type="text"
                  placeholder="#FF9933"
                  className="flex-1 h-9 px-3 text-[13px] border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e]/10 transition-all"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 h-9 border border-gray-300 text-gray-600 text-[13px] font-medium rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 h-9 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 active:scale-[0.98] text-white text-[13px] font-medium rounded-lg transition-all"
              >
                {isEdit ? 'Save changes' : 'Add team'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamFormPage