import axiosInstance from "@/utils/axios"

export const getSeriesList = async () => {
  const response = await axiosInstance.get("/series")
  return response.data.data
}

export const createSeries = async (payload) => {
  const response = await axiosInstance.post("/series", payload)
  return response.data.data
}

export const deleteSeries = async (id) => {
  const response = await axiosInstance.delete(`/series/${id}`)
  return response.data
}
