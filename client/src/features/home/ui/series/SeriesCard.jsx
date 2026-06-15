import { Link } from "react-router"

const SeriesCard = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "ongoing":
        return "bg-green-100 text-green-700 border-green-200"
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "completed":
        return "bg-neutral-100 text-neutral-700 border-neutral-200"
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
    }
  }

  return (
    <Link
      to={`/series/${data._id}`}
      className='group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md'
    >
      {/* Logo */}
      <div className='flex items-center gap-4 min-w-0'>
        <div className='flex size-12 items-center justify-center rounded-lg bg-neutral-100 overflow-hidden'>
          {data.logo ? (
            <img
              src={data.logo}
              alt={data.shortName}
              className='h-full w-full object-cover'
            />
          ) : (
            <span className='font-semibold text-neutral-500'>
              {data.shortName?.[0]}
            </span>
          )}
        </div>

        {/* Series Info */}
        <div className='min-w-0'>
          <h3 className='truncate font-semibold text-neutral-900'>
            {data.name}
          </h3>

          <div className='flex items-center gap-2 text-sm text-neutral-500'>
            <span>{data.shortName}</span>
            <span>•</span>
            <span>{data.season}</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div
        className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(
          data.status,
        )}`}
      >
        {data.status}
      </div>
    </Link>
  )
}

export default SeriesCard
