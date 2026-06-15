import axiosInstance from "@/utils/axios"

export const getUsers = async ({ page, limit, search }) => {
  const response = await axiosInstance.get("/users", {
    params: {
      page,
      limit,
      search: search || undefined,
    },
  })

  return response.data.data
}

export const createUser = async (payload) => {
  const response = await axiosInstance.post("/users", payload)
  console.log(response);
  return response.data.data
}

export const updateUser = async ({ id, payload }) => {
  const response = await axiosInstance.put(`/users/${id}`, payload)
  return response.data.data
}

export const softDeleteUser = async (id) => {
  const response = await axiosInstance.patch(`/users/${id}/soft-delete`)
  return response.data.data
}

export const hardDeleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`)
  return response.data.data
}

export const changeUserRole = async ({ id, role }) => {
  const response = await axiosInstance.patch(`/users/${id}/role`, { role })
  return response.data.data
}
