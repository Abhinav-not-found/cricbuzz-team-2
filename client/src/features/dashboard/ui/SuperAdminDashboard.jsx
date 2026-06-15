import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserForm from './components/UserForm'
import UserCard from './components/UserCard'

const API_BASE_URL = '/api/users';

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUsers = async (search = '') => {
    try {
      setLoading(true)
      const url = search ? `${API_BASE_URL}?search=${search}` : API_BASE_URL
      const response = await axios.get(url)
   
      if (response.data && response.data.data) {
        const fetchedData = response.data.data.users || response.data.data
        setUsers(Array.isArray(fetchedData) ? fetchedData : [])
      }
    } catch (err) {
      console.error("Fetch Users Error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers(searchQuery)
    }, 400) 

    return () => clearTimeout(delayDebounce)
  }, [searchQuery])

  const handleCreateUser = async (formData) => {
    try {
      const response = await axios.post(API_BASE_URL, formData)
      if (response.data) {
        alert(response.data.message || "User created successfully!")
        fetchUsers(searchQuery) 
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user.")
      console.log(err);
    }
  }

  const handleUpdateUser = async (formData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${editingUser._id}`, {
        name: formData.name,
        email: formData.email
      })
      if (response.data) {
        alert(response.data.message || "User updated successfully!")
        setEditingUser(null)
        fetchUsers(searchQuery)
      }
    } catch (err) {
      alert(err.response?.data?.message || "Update request rejected.")
    }
  }

  const handleRoleChange = async (id, newRole) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/role`, { role: newRole })
      if (response.data) {
        alert(response.data.message || `Role updated to ${newRole}`)
        fetchUsers(searchQuery)
      }
    } catch (err) {
      alert(err.response?.data?.message || "Role change failed.")
    }
  }

  const handleSoftDelete = async (id) => {
    if (!window.confirm("Soft delete this user? They will be hidden from the active system node.")) return
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/soft-delete`)
      if (response.data) {
        alert(response.data.message || "User soft purged.")
        fetchUsers(searchQuery)
      }
    } catch (err) {
      alert(err.response?.data?.message || "Soft purge failed.")
    }
  }

  const handleHardDelete = async (id) => {
    if (!window.confirm(" WARNING: Hard delete will permanently wipe this record from MongoDB. Proceed?")) return
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`)
      if (response.data) {
        alert(response.data.message || "User permanently deleted.")
        fetchUsers(searchQuery)
      }
    } catch (err) {
      alert(err.response?.data?.message || "Hard delete operation rejected.")
    }
  }

  return (
    <div className="w-full min-h-screen p-6 font-sans text-gray-800 text-left bg-gray-50">

      <div className="border-b border-gray-200 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Super Admin Command Center</h1>
          <p className="text-xs text-gray-400 mt-0.5">Live integrated console matching database services.</p>
        </div>
        
        <input 
          type="text"
          placeholder="Search operators (Live)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 text-xs bg-white border border-gray-200 rounded-lg w-full sm:w-64 focus:outline-none focus:border-gray-400 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <div>
          <UserForm 
            editingUser={editingUser}
            onCreateUser={handleCreateUser}
            onUpdateUser={handleUpdateUser}
            onCancelEdit={() => setEditingUser(null)}
          />
        </div>

        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            System Operational Nodes ({users.length})
          </h3>
          
          {loading ? (
            <p className="text-xs text-gray-400 animate-pulse">Querying system database users...</p>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <UserCard 
                  key={user._id}
                  user={user}
                  onStartEdit={(u) => setEditingUser(u)}
                  onRoleChange={handleRoleChange}
                  onSoftDelete={handleSoftDelete}
                  onHardDelete={handleHardDelete}
                />
              ))}

              {users.length === 0 && (
                <p className="text-center text-xs text-gray-400 py-12 bg-white border border-dashed border-gray-200 rounded-xl">
                  Zero active operators match the database query criteria.
                </p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default SuperAdminDashboard