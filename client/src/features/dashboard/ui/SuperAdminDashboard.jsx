import axios from "axios"
import React, { useCallback, useEffect, useState } from "react"
import LogoutBtn from "@/shared/components/ui/LogoutBtn"
import UserCard from "./components/UserCard"
import UserForm from "./components/UserForm"

const API_BASE_URL = "/api/users"

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUsers = useCallback(async (search = "") => {
    try {
      setLoading(true)
      const url = search ? `${API_BASE_URL}?search=${search}` : API_BASE_URL

      const response = await axios.get(url)

      if (response.data?.data) {
        const fetchedData = response.data.data.users || response.data.data

        setUsers(Array.isArray(fetchedData) ? fetchedData : [])
      }
    } catch (err) {
      console.error("Fetch Users Error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers(searchQuery)
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [searchQuery, fetchUsers])

  const handleCreateUser = async (formData) => {
    try {
      const response = await axios.post(API_BASE_URL, formData)
      alert(response.data?.message || "User created successfully!")
      fetchUsers(searchQuery)
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user.")
    }
  }

  const handleUpdateUser = async (formData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${editingUser._id}`, {
        name: formData.name,
        email: formData.email,
      })

      alert(response.data?.message || "User updated successfully!")
      setEditingUser(null)
      fetchUsers(searchQuery)
    } catch (err) {
      alert(err.response?.data?.message || "Update request rejected.")
    }
  }

  const handleRoleChange = async (id, newRole) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/role`, {
        role: newRole,
      })

      alert(response.data?.message || `Role updated`)
      fetchUsers(searchQuery)
    } catch (err) {
      alert(err.response?.data?.message || "Role change failed.")
    }
  }

  const handleSoftDelete = async (id) => {
    if (!window.confirm("Soft delete this user?")) return

    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/soft-delete`)

      alert(response.data?.message || "User soft deleted.")
      fetchUsers(searchQuery)
    } catch (err) {
      alert(err.response?.data?.message || "Soft delete failed.")
    }
  }

  const handleHardDelete = async (id) => {
    if (!window.confirm("Hard delete permanently?")) return

    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`)

      alert(response.data?.message || "User deleted permanently.")
      fetchUsers(searchQuery)
    } catch (err) {
      alert(err.response?.data?.message || "Hard delete failed.")
    }
  }

  return (
    <div className='w-full min-h-screen p-6 bg-gray-50 text-gray-800'>
      <div className='flex justify-between items-center border-b pb-4 mb-6'>
        <div>
          <h1 className='text-xl font-bold'>Super Admin Command Center</h1>
        </div>

        <div className='flex gap-3 items-center'>
          <LogoutBtn />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <UserForm
          editingUser={editingUser}
          onCreateUser={handleCreateUser}
          onUpdateUser={handleUpdateUser}
          onCancelEdit={() => setEditingUser(null)}
        />

        <div className='lg:col-span-2 space-y-3'>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onStartEdit={setEditingUser}
                onRoleChange={handleRoleChange}
                onSoftDelete={handleSoftDelete}
                onHardDelete={handleHardDelete}
              />
            ))
          )}

          {!loading && users.length === 0 && <p>No users found</p>}
        </div>
      </div>
    </div>
  )
}

export default SuperAdminDashboard
