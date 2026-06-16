import { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"

export const socketContext = createContext(null)

const socketContextWrapper = ({ children }) => {
  const [socket] = useState(() =>
    io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    }),
  )

  useEffect(() => {
    if (!socket) return

    socket.on("connected", (data) => {
      // console.log("message from backend:", data)
    })

    return () => {
      socket.off("connected")
    }
  }, [socket])

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  )
}
export default socketContextWrapper
