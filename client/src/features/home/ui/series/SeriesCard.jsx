import { Link } from "react-router"

const SeriesCard = () => {
  return (
    <Link
      to={"/series/1"}
      className='w-full h-10  flex items-center justify-between px-2 py-6 border border-neutral-200 rounded-lg'
    >
      <div className='size-8 bg-red-200 rounded-md'></div>
      <p>short name</p>
      <p>Name</p>
      <p>season</p>
      <p className='border rounded-full px-2 border-neutral-300 text-neutral-500'>
        live
      </p>
      <div></div>
      <div></div>
    </Link>
  )
}

export default SeriesCard
