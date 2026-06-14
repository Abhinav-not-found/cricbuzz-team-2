import React from "react";
import { Link, Outlet } from "react-router";
import LogoutBtn from "@/shared/components/ui/LogoutBtn";

const AdminDashboardPage = () => {
  return (
    <div className='flex items-start'>
      <aside className='w-32 bg-red-500 h-screen'>sidebar</aside>
      <div className='flex items-center justify-between px-10'>
        AdminDashboardPage
        <LogoutBtn />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
