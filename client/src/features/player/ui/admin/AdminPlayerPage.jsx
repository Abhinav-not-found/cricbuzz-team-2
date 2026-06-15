import { useEffect, useState } from "react"
import { getAllPlayers } from "@/features/player/api/playerApis"
import Header from "./Header"
import PlayerList from "./PlayerList"

const AdminPlayerPage = () => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    getAllPlayers(setPlayers)
  }, [])

  return (
    <div className='h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <Header />
        <PlayerList players={players} setPlayers={setPlayers} />
      </div>
    </div>
  )
}

export default AdminPlayerPage
