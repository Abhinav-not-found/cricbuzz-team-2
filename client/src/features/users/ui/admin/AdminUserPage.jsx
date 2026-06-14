import { useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Bell,
  CheckCircle2,
  Download,
  Edit3,
  Filter,
  Gauge,
  HelpCircle,
  MoreVertical,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Trash2,
  UserCog,
  UserPlus,
  Users,
  X,
} from "lucide-react"
import { useSelector } from "react-redux"
import Button from "@/shared/components/ui/Button"
import {
  changeUserRole,
  createUser,
  getUsers,
  hardDeleteUser,
  softDeleteUser,
  updateUser,
} from "../../api/userApi"
import useDebouncedValue from "../../hooks/useDebouncedValue"

const ROLES = ["ADMIN", "SCORER"]
const PAGE_SIZE = 4

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "SCORER",
}

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "U"

const getApiMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback

const AdminUserPage = () => {
  const queryClient = useQueryClient()
  const { user: currentUser, isLoading: authLoading } = useSelector(
    (state) => state.auth,
  )
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search)
  const [page, setPage] = useState(1)
  const [modalMode, setModalMode] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState("")
  const [actionError, setActionError] = useState("")

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const usersQuery = useQuery({
    queryKey: ["users", { page, search: debouncedSearch }],
    queryFn: () =>
      getUsers({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch.trim(),
      }),
    enabled: !authLoading && currentUser?.role === "SUPER_ADMIN",
    keepPreviousData: true,
    retry: (failureCount, error) => {
      const status = error?.response?.status
      if ([401, 403, 429].includes(status)) return false
      return failureCount < 2
    },
  })

  const users = useMemo(() => usersQuery.data?.users || [], [usersQuery.data])
  const pagination = usersQuery.data?.pagination || {
    total: users.length,
    page,
    limit: PAGE_SIZE,
    totalPages: 1,
  }

  const stats = useMemo(() => {
    const total = pagination.total || users.length
    return [
      {
        label: "Total Users",
        value: total,
        meta: debouncedSearch ? "Filtered" : "Active",
        icon: Users,
        tone: "bg-[#dfe7ff] text-[#061a42]",
      },
      {
        label: "Admins",
        value: users.filter((item) => item.role === "ADMIN").length,
        meta: "On this page",
        icon: ShieldCheck,
        tone: "bg-[#80f2a4] text-[#063f28]",
      },
      {
        label: "Scorers",
        value: users.filter((item) => item.role === "SCORER").length,
        meta: "On this page",
        icon: Gauge,
        tone: "bg-[#ffe0a3] text-[#4e3100]",
      },
      {
        label: "Pending Requests",
        value: 0,
        meta: "No request queue",
        icon: MoreVertical,
        tone: "bg-[#e4e4e7] text-[#27272a]",
      },
    ]
  }, [debouncedSearch, pagination.total, users])

  const refreshUsers = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      closeModal()
      refreshUsers()
    },
    onError: (error) => {
      setFormError(getApiMessage(error, "Unable to create user"))
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      closeModal()
      refreshUsers()
    },
    onError: (error) => {
      setFormError(getApiMessage(error, "Unable to update user"))
    },
  })

  const roleMutation = useMutation({
    mutationFn: changeUserRole,
    onSuccess: refreshUsers,
    onError: (error) => {
      setActionError(getApiMessage(error, "Unable to update role"))
    },
  })

  const softDeleteMutation = useMutation({
    mutationFn: softDeleteUser,
    onSuccess: refreshUsers,
    onError: (error) => {
      setActionError(getApiMessage(error, "Unable to delete user"))
    },
  })

  const hardDeleteMutation = useMutation({
    mutationFn: hardDeleteUser,
    onSuccess: refreshUsers,
    onError: (error) => {
      setActionError(getApiMessage(error, "Unable to permanently delete user"))
    },
  })

  const openCreateModal = () => {
    setForm(emptyForm)
    setSelectedUser(null)
    setFormError("")
    setModalMode("create")
  }

  const openEditModal = (user) => {
    setSelectedUser(user)
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "SCORER",
    })
    setFormError("")
    setModalMode("edit")
  }

  const closeModal = () => {
    setModalMode(null)
    setSelectedUser(null)
    setForm(emptyForm)
    setFormError("")
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Enter a valid email address"
    }
    if (modalMode === "create" && form.password.length < 8) {
      return "Password must be at least 8 characters"
    }
    return ""
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationMessage = validateForm()
    if (validationMessage) {
      setFormError(validationMessage)
      return
    }

    setFormError("")
    if (modalMode === "create") {
      createMutation.mutate({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      })
      return
    }

    updateMutation.mutate({
      id: selectedUser._id,
      payload: {
        name: form.name.trim(),
        email: form.email.trim(),
      },
    })
  }

  const handleRoleChange = (user, role) => {
    if (role === user.role) return
    setActionError("")

    const confirmed = window.confirm(
      `Change ${user.name}'s role to ${role.toLowerCase()}?`,
    )
    if (!confirmed) return

    roleMutation.mutate({ id: user._id, role })
  }

  const handleSoftDelete = (user) => {
    setActionError("")
    if (!window.confirm(`Soft delete ${user.name}?`)) return
    softDeleteMutation.mutate(user._id)
  }

  const handleHardDelete = (user) => {
    setActionError("")
    if (!window.confirm(`Permanently delete ${user.name}? This cannot be undone.`)) {
      return
    }
    hardDeleteMutation.mutate(user._id)
  }

  const exportUsers = () => {
    const rows = users.map((user, index) => ({
      serial: (page - 1) * PAGE_SIZE + index + 1,
      name: user.name,
      email: user.email,
      role: user.role,
    }))
    const csv = [
      "Serial,Name,Email,Role",
      ...rows.map((row) =>
        [row.serial, row.name, row.email, row.role]
          .map((value) => `"${String(value || "").replaceAll('"', '""')}"`)
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "users.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending
  const isMutating =
    roleMutation.isPending ||
    softDeleteMutation.isPending ||
    hardDeleteMutation.isPending

  if (!authLoading && currentUser && currentUser.role !== "SUPER_ADMIN") {
    return (
      <div className='min-h-screen bg-[#f6f7fb] p-6 text-[#07142f]'>
        <div className='mx-auto max-w-3xl rounded-lg border border-[#d7dbe3] bg-white p-8 shadow-sm'>
          <Shield className='mb-4 size-10 text-[#052b5f]' />
          <h1 className='text-2xl font-semibold'>Access restricted</h1>
          <p className='mt-2 text-sm text-[#5f6673]'>
            User management is available only to super administrators.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#f6f7fb] text-[#06122f]'>
      <div className='flex min-h-screen'>
        <aside className='hidden w-[270px] shrink-0 border-r border-[#0b2447] bg-[#05284f] text-white shadow-2xl lg:flex lg:flex-col'>
          <div className='flex items-center gap-3 px-6 py-7'>
            <div className='flex size-11 items-center justify-center rounded bg-[#89f7a2] text-[#05284f]'>
              <UserCog className='size-6' />
            </div>
            <div>
              <p className='text-xl font-bold leading-tight text-[#a8ffb8]'>
                Super Admin
              </p>
              <p className='text-[11px] uppercase tracking-[0.18em] text-[#b9c8dd]'>
                Precision Control
              </p>
            </div>
          </div>

          <nav className='mt-8 space-y-2 px-2'>
            {[
              { label: "User Management", icon: Users, active: true },
              { label: "Match Management", icon: Gauge },
              { label: "Reports", icon: CheckCircle2 },
              { label: "Settings", icon: Settings },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded px-5 py-4 text-sm font-semibold ${
                  item.active
                    ? "border-l-4 border-[#89f7a2] bg-[#2b568e] text-[#b9ffbf]"
                    : "text-[#c3cedf]"
                }`}
              >
                <item.icon className='size-5' />
                {item.label}
              </div>
            ))}
          </nav>

          <div className='mt-auto border-t border-[#1d416b] p-6'>
            <div className='flex items-center gap-3'>
              <div className='flex size-9 items-center justify-center rounded-full bg-[#1e293b] text-xs font-bold ring-1 ring-white/25'>
                SA
              </div>
              <div>
                <p className='text-sm font-semibold'>Cricbuzz Admin</p>
                <p className='text-xs text-[#b9c8dd]'>admin@cricbuzz.com</p>
              </div>
            </div>
          </div>
        </aside>

        <main className='min-w-0 flex-1'>
          <header className='flex flex-col gap-4 border-b border-[#d8dce5] bg-white px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between'>
            <label className='relative w-full max-w-xl'>
              <Search className='absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6b7280]' />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder='Search users or actions...'
                className='h-11 w-full rounded border border-[#c9ced8] bg-[#f9fafb] pl-11 pr-4 text-sm outline-none transition focus:border-[#05284f] focus:ring-2 focus:ring-[#05284f]/15'
              />
            </label>

            <div className='flex items-center justify-between gap-4 lg:justify-end'>
              <button
                type='button'
                className='relative rounded p-2 text-[#111827] hover:bg-[#f0f2f6]'
                aria-label='Notifications'
              >
                <Bell className='size-5' />
                <span className='absolute right-2 top-2 size-2 rounded-full bg-[#d90429]' />
              </button>
              <button
                type='button'
                className='rounded p-2 text-[#111827] hover:bg-[#f0f2f6]'
                aria-label='Settings'
              >
                <Settings className='size-5' />
              </button>
              <div className='hidden h-7 w-px bg-[#d8dce5] sm:block' />
              <span className='text-sm font-semibold'>Admin Profile</span>
            </div>
          </header>

          <section className='mx-auto max-w-6xl px-4 py-8 sm:px-6'>
            <div className='flex flex-col gap-5 md:flex-row md:items-start md:justify-between'>
              <div>
                <h1 className='text-3xl font-bold tracking-normal'>
                  User Management
                </h1>
                <p className='mt-2 text-[#4b5563]'>
                  Manage platform access, roles, and administrative permissions.
                </p>
              </div>
              <Button
                onClick={openCreateModal}
                className='inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#05284f] px-6 text-sm font-semibold shadow-sm hover:bg-[#0b3768]'
              >
                <UserPlus className='size-5' />
                Add New User
              </Button>
            </div>

            <div className='mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className='rounded-lg border border-[#d3d7df] bg-white p-5 shadow-sm'
                >
                  <div className='flex items-start justify-between gap-4'>
                    <div className={`rounded p-3 ${stat.tone}`}>
                      <stat.icon className='size-5' />
                    </div>
                    <span className='text-xs font-semibold text-[#05284f]'>
                      {stat.meta}
                    </span>
                  </div>
                  <p className='mt-4 text-sm text-[#111827]'>{stat.label}</p>
                  <p className='mt-1 text-2xl font-bold'>
                    {stat.value.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className='mt-8 overflow-hidden rounded-lg border border-[#d3d7df] bg-white shadow-sm'>
              <div className='flex flex-col gap-4 border-b border-[#d3d7df] px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className='text-base font-semibold'>System Users</h2>
                <div className='flex gap-2'>
                  <button
                    type='button'
                    className='flex size-11 items-center justify-center rounded border border-[#c9ced8] hover:bg-[#f5f7fa]'
                    aria-label='Filter users'
                  >
                    <Filter className='size-5' />
                  </button>
                  <button
                    type='button'
                    onClick={exportUsers}
                    className='flex size-11 items-center justify-center rounded border border-[#c9ced8] hover:bg-[#f5f7fa]'
                    aria-label='Export users'
                  >
                    <Download className='size-5' />
                  </button>
                </div>
              </div>

              {actionError ? (
                <div className='border-b border-[#f5c2c7] bg-[#fff5f5] px-5 py-3 text-sm text-[#9f1239]'>
                  {actionError}
                </div>
              ) : null}

              <div className='overflow-x-auto'>
                <table className='w-full min-w-[820px] border-collapse text-left'>
                  <thead className='bg-[#f2f3f5] text-xs uppercase text-[#1f2937]'>
                    <tr>
                      <th className='px-6 py-4 font-semibold'>Sr No.</th>
                      <th className='px-6 py-4 font-semibold'>Name</th>
                      <th className='px-6 py-4 font-semibold'>Email</th>
                      <th className='px-6 py-4 font-semibold'>Role</th>
                      <th className='px-6 py-4 text-right font-semibold'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersQuery.isLoading ? (
                      <tr>
                        <td colSpan='5' className='px-6 py-12 text-center'>
                          Loading users...
                        </td>
                      </tr>
                    ) : usersQuery.isError ? (
                      <tr>
                        <td
                          colSpan='5'
                          className='px-6 py-12 text-center text-[#9f1239]'
                        >
                          {getApiMessage(
                            usersQuery.error,
                            "Unable to load users",
                          )}
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan='5' className='px-6 py-12 text-center'>
                          No users found.
                        </td>
                      </tr>
                    ) : (
                      users.map((user, index) => (
                        <tr
                          key={user._id}
                          className='border-t border-[#e5e7eb] text-sm'
                        >
                          <td className='px-6 py-5 font-mono text-xs'>
                            {String((page - 1) * PAGE_SIZE + index + 1).padStart(
                              2,
                              "0",
                            )}
                          </td>
                          <td className='px-6 py-5'>
                            <div className='flex items-center gap-3'>
                              <div className='flex size-9 items-center justify-center rounded-full bg-[#dfe7ff] text-xs font-bold text-[#05284f]'>
                                {getInitials(user.name)}
                              </div>
                              <span className='font-semibold'>{user.name}</span>
                            </div>
                          </td>
                          <td className='px-6 py-5 text-[#374151]'>
                            {user.email}
                          </td>
                          <td className='px-6 py-5'>
                            <select
                              value={user.role}
                              disabled={isMutating}
                              onChange={(event) =>
                                handleRoleChange(user, event.target.value)
                              }
                              className='h-10 rounded border border-[#cbd5e1] bg-white px-3 text-xs font-medium outline-none focus:border-[#05284f] focus:ring-2 focus:ring-[#05284f]/15'
                            >
                              {ROLES.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className='px-6 py-5'>
                            <div className='flex justify-end gap-2'>
                              <Button
                                onClick={() => openEditModal(user)}
                                className='inline-flex h-10 items-center gap-2 rounded bg-[#05284f] px-4 text-xs font-semibold hover:bg-[#0b3768]'
                              >
                                <Edit3 className='size-4' />
                                Update
                              </Button>
                              <button
                                type='button'
                                onClick={() => handleSoftDelete(user)}
                                disabled={isMutating}
                                className='flex size-10 items-center justify-center rounded border border-[#f0c6cd] text-[#be123c] hover:bg-[#fff1f2] disabled:cursor-not-allowed disabled:opacity-60'
                                aria-label={`Soft delete ${user.name}`}
                              >
                                <Trash2 className='size-4' />
                              </button>
                              <button
                                type='button'
                                onClick={() => handleHardDelete(user)}
                                disabled={isMutating}
                                className='rounded border border-[#e5e7eb] px-3 text-xs font-semibold text-[#6b7280] hover:border-[#be123c] hover:text-[#be123c] disabled:cursor-not-allowed disabled:opacity-60'
                              >
                                Permanent
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className='flex flex-col gap-4 border-t border-[#d3d7df] px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-sm text-[#374151]'>
                  Showing {users.length} of {pagination.total || 0} users
                </p>
                <div className='flex flex-wrap gap-2'>
                  <button
                    type='button'
                    disabled={page <= 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    className='h-10 rounded border border-[#d3d7df] px-4 text-sm disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    Previous
                  </button>
                  {Array.from(
                    { length: Math.max(1, pagination.totalPages || 1) },
                    (_, index) => index + 1,
                  )
                    .slice(0, 5)
                    .map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type='button'
                        onClick={() => setPage(pageNumber)}
                        className={`h-10 min-w-10 rounded border px-3 text-sm ${
                          pageNumber === page
                            ? "border-[#05284f] bg-[#05284f] text-white"
                            : "border-[#d3d7df] bg-white"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  <button
                    type='button'
                    disabled={page >= (pagination.totalPages || 1)}
                    onClick={() =>
                      setPage((current) =>
                        Math.min(pagination.totalPages || 1, current + 1),
                      )
                    }
                    className='h-10 rounded border border-[#d3d7df] px-4 text-sm disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div className='mt-10 grid gap-6 lg:grid-cols-2'>
              <div className='relative overflow-hidden rounded-lg bg-[#05284f] p-7 text-white shadow-sm'>
                <HelpCircle className='absolute -bottom-8 right-8 size-28 text-white/10' />
                <h2 className='text-2xl font-bold'>Need Help?</h2>
                <p className='mt-3 max-w-lg text-[#d8e2f0]'>
                  Access the administrative documentation for detailed
                  instructions on role permissions and access levels.
                </p>
                <Button className='mt-6 rounded bg-[#89f7a2] px-5 font-semibold text-[#05284f] hover:bg-[#a9ffba]'>
                  View Documentation
                </Button>
              </div>

              <div className='rounded-lg border border-[#d3d7df] bg-[#e4e4e7] p-7 shadow-sm'>
                <div className='flex items-center gap-4'>
                  <div className='flex size-12 items-center justify-center rounded bg-white text-[#05284f]'>
                    <Shield className='size-6' />
                  </div>
                  <div>
                    <h2 className='text-lg font-bold'>Security Status</h2>
                    <p className='text-sm text-[#4b5563]'>
                      All administrative actions are logged and encrypted.
                    </p>
                  </div>
                </div>
                <div className='mt-6 h-2 rounded bg-[#cdd2d8]'>
                  <div className='h-2 w-[94%] rounded bg-[#0f8b4c]' />
                </div>
                <p className='mt-3 text-xs font-semibold uppercase'>
                  94% Compliance Level
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {modalMode ? (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-[#06122f]/50 p-4'
          role='dialog'
          aria-modal='true'
        >
          <div className='w-full max-w-lg rounded-lg bg-white shadow-2xl'>
            <div className='flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4'>
              <div>
                <h2 className='text-xl font-bold'>
                  {modalMode === "create" ? "Add New User" : "Update User"}
                </h2>
                <p className='text-sm text-[#6b7280]'>
                  {modalMode === "create"
                    ? "Create an admin or scorer account."
                    : "Edit profile details. Role changes stay in the table."}
                </p>
              </div>
              <button
                type='button'
                onClick={closeModal}
                className='rounded p-2 hover:bg-[#f3f4f6]'
                aria-label='Close modal'
              >
                <X className='size-5' />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4 px-6 py-5'>
              {formError ? (
                <div className='rounded border border-[#f5c2c7] bg-[#fff5f5] px-4 py-3 text-sm text-[#9f1239]'>
                  {formError}
                </div>
              ) : null}

              <label className='block'>
                <span className='text-sm font-semibold'>Name</span>
                <input
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  className='mt-2 h-11 w-full rounded border border-[#cbd5e1] px-3 text-sm outline-none focus:border-[#05284f] focus:ring-2 focus:ring-[#05284f]/15'
                  required
                />
              </label>

              <label className='block'>
                <span className='text-sm font-semibold'>Email</span>
                <input
                  name='email'
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                  className='mt-2 h-11 w-full rounded border border-[#cbd5e1] px-3 text-sm outline-none focus:border-[#05284f] focus:ring-2 focus:ring-[#05284f]/15'
                  required
                />
              </label>

              {modalMode === "create" ? (
                <>
                  <label className='block'>
                    <span className='text-sm font-semibold'>Password</span>
                    <input
                      name='password'
                      type='password'
                      value={form.password}
                      onChange={handleChange}
                      className='mt-2 h-11 w-full rounded border border-[#cbd5e1] px-3 text-sm outline-none focus:border-[#05284f] focus:ring-2 focus:ring-[#05284f]/15'
                      required
                    />
                  </label>

                  <label className='block'>
                    <span className='text-sm font-semibold'>Role</span>
                    <select
                      name='role'
                      value={form.role}
                      onChange={handleChange}
                      className='mt-2 h-11 w-full rounded border border-[#cbd5e1] bg-white px-3 text-sm outline-none focus:border-[#05284f] focus:ring-2 focus:ring-[#05284f]/15'
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              ) : null}

              <div className='flex justify-end gap-3 pt-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={closeModal}
                  className='rounded-md'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='rounded-md bg-[#05284f] px-5 font-semibold hover:bg-[#0b3768] disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {isSubmitting ? "Saving..." : "Save User"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AdminUserPage
