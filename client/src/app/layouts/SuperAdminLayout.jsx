import React from 'react'
import { Outlet } from 'react-router'

const SuperAdminLayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default SuperAdminLayout