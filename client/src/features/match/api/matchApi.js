import axiosInstance from "@/utils/axios"

export const getMatchList = async () => {
  const response = await axiosInstance.get("/match")
  return response.data.data
}

export const createMatch = async (payload) => {
  const response = await axiosInstance.post("/match", payload)
  return response.data.data
}

export const updateMatch = async ({ id, payload }) => {
  const response = await axiosInstance.patch(`/match/${id}`, payload)
  return response.data.data
}

export const deleteMatch = async (id) => {
  const response = await axiosInstance.delete(`/match/${id}`)
  return response.data
}

export const getMatchTeamList = async () => {
  const response = await axiosInstance.get("/team")
  return response.data.data
}

export const getMatchSeriesList = async () => {
  const response = await axiosInstance.get("/series")
  return response.data.data
}
