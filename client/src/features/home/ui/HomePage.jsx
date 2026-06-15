import { useEffect, useState } from "react"
import { getAllSeries } from "../api/seriesApi"
import SeriesCard from "./series/SeriesCard"

const HomePage = () => {
  const [series, setSeries] = useState([])
  console.log(series)
  useEffect(() => {
    getAllSeries(setSeries)
  }, [])
  return (
    <div className='px-10'>
      <div className='mb-4 flex flex-col'>
        <h1 className='text-2xl tracking-tight font-medium'>Series</h1>
        <div className='flex flex-col gap-3 mt-2'>
          {series.map((i) => {
            return <SeriesCard key={i} data={i} />
          })}
        </div>
      </div>
    </div>
  )
}

export default HomePage
