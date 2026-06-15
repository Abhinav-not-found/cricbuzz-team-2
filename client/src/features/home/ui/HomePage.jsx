import SeriesCard from "./series/SeriesCard"

const HomePage = () => {
  return (
    <div className='px-10'>
      <div className='mb-4 flex flex-col'>
        <h1 className='text-2xl tracking-tight font-medium'>Current Series</h1>
        <div className='flex flex-col gap-3 mt-2'>
          <SeriesCard />
          <SeriesCard />
          <SeriesCard />
        </div>
      </div>
      <div className='mb-4 flex flex-col'>
        <h1 className='text-2xl tracking-tight font-medium'>Upcoming Series</h1>
        <div className='flex flex-col gap-3 mt-2'>
          <SeriesCard />
          <SeriesCard />
          <SeriesCard />
        </div>
      </div>
    </div>
  )
}

export default HomePage
