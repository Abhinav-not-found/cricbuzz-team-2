import Header from "./Header"
import PlayerList from "./PlayerList"

const players = [
  {
    _id: "1",
    name: "Virat Kohli",
    role: "BATSMAN",
    country: "India",
    battingStyle: "Right-hand bat",
    bowlingStyle: null,
    image: null,
  },
  {
    _id: "2",
    name: "Jasprit Bumrah",
    role: "BOWLER",
    country: "India",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm fast",
    image: null,
  },
  {
    _id: "3",
    name: "Hardik Pandya",
    role: "ALL_ROUNDER",
    country: "India",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm medium",
    image: null,
  },
  {
    _id: "4",
    name: "KL Rahul",
    role: "WICKET_KEEPER",
    country: "India",
    battingStyle: "Right-hand bat",
    bowlingStyle: null,
    image: null,
  },
  {
    _id: "5",
    name: "Steve Smith",
    role: "BATSMAN",
    country: "Australia",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm leg break",
    image: null,
  },
  {
    _id: "6",
    name: "Pat Cummins",
    role: "BOWLER",
    country: "Australia",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm fast",
    image: null,
  },
]

const AdminPlayerPage = () => {
  return (
    <div className='h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <Header />
        <PlayerList players={players} />
      </div>
    </div>
  )
}

export default AdminPlayerPage
