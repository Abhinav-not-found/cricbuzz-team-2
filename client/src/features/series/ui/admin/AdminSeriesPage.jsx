import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createSeries, deleteSeries, getSeriesList } from '../../api/seriesApi'

const getApiMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback

const AdminSeriesPage = () => {
  const queryClient = useQueryClient()

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      name: '',
      shortName: '',
      season: '',
      status: 'UPCOMING'
    }
  })

  const seriesQuery = useQuery({
    queryKey: ['series'],
    queryFn: getSeriesList,
    retry: (failureCount, error) => {
      const status = error?.response?.status
      if ([401, 403, 429].includes(status)) return false
      return failureCount < 2
    },
  })

  const createMutation = useMutation({
    mutationFn: createSeries,
    onSuccess: () => {
      reset()
      toast.success('Series created')
      queryClient.invalidateQueries({ queryKey: ['series'] })
    },
    onError: (error) => {
      toast.error(getApiMessage(error, 'Unable to create series'))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteSeries,
    onSuccess: () => {
      toast.success('Series deleted')
      queryClient.invalidateQueries({ queryKey: ['series'] })
    },
    onError: (error) => {
      toast.error(getApiMessage(error, 'Unable to delete series'))
    },
  })

  const seriesList = seriesQuery.data || []

  const onSubmit = (data) => {
    createMutation.mutate({
      name: data.name.trim(),
      shortName: data.shortName.trim(),
      season: data.season.trim(),
      status: data.status,
    })
  }

  const handleDelete = (id) => {
    if (window.confirm("Delete Series?")) {
      deleteMutation.mutate(id)
    }
  }

  const isSubmitting = createMutation.isPending
  const isDeleting = deleteMutation.isPending

  return (
    <div className="w-full max-w-4xl mx-auto p-4 text-left font-sans text-gray-800">
      
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Series Manager</h1>
        <p className="text-xs text-gray-500">Add and remove tournaments directly matching DB Schema.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input 
                {...register("name", { required: "Name zaroori hai bhai" })}
                type="text" 
                placeholder="Series Full Name" 
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input 
                {...register("shortName", { required: "Short name chahiye" })}
                type="text" 
                placeholder="Short Name (e.g., IPL)" 
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
              {errors.shortName && <p className="text-xs text-red-500 mt-1">{errors.shortName.message}</p>}
            </div>

            <div>
              <input 
                {...register("season", { required: "Season daalo" })}
                type="text" 
                placeholder="Season / Year (e.g., 2026)" 
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
              {errors.season && <p className="text-xs text-red-500 mt-1">{errors.season.message}</p>}
            </div>

            <div>
              <select 
                {...register("status")}
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 font-medium text-gray-600"
              >
                <option value="UPCOMING">UPCOMING</option>
                <option value="LIVE">LIVE</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-all"
          >
            {isSubmitting ? 'Adding...' : '+ Add Tournament'}
          </button>
        </form>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Tournaments</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {seriesQuery.isLoading ? (
            <p className="col-span-full text-center text-xs text-gray-400 py-8 bg-gray-50 rounded-xl border border-dashed">
              Loading series...
            </p>
          ) : seriesQuery.isError ? (
            <p className="col-span-full text-center text-xs text-red-500 py-8 bg-red-50 rounded-xl border border-dashed border-red-100">
              {getApiMessage(seriesQuery.error, 'Unable to load series')}
            </p>
          ) : seriesList.map((series) => (
            <div 
              key={series._id} 
              className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:border-gray-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400">{series.shortName}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                    series.status === 'LIVE' ? 'bg-green-50 text-green-700' :
                    series.status === 'UPCOMING' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {series.status}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{series.name}</h4>
                <p className="text-xs text-gray-500 mt-1">Season: {series.season}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => handleDelete(series._id)}
                  disabled={isDeleting}
                  className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                >
                  {isDeleting ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {!seriesQuery.isLoading && !seriesQuery.isError && seriesList.length === 0 && (
          <p className="text-center text-xs text-gray-400 py-8 bg-gray-50 rounded-xl border border-dashed">
            No series active right now.
          </p>
        )}
      </div>

    </div>
  )
}

export default AdminSeriesPage