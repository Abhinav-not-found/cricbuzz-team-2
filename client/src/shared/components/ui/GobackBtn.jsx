import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import Button from "./Button"

const GobackBtn = () => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate(-1)}
      variant='ghost'
      className='flex items-center gap-2'
    >
      <ArrowLeft className='size-4' />
      <p className='text-sm'>Go back</p>
    </Button>
  )
}

export default GobackBtn
