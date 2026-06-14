import React from "react";
import { Link, Outlet } from "react-router";
import LogoutBtn from "@/shared/components/ui/LogoutBtn";

const AdminDashboardPage = () => {
  return (
    <div className="flex h-screen w-full bg-gray-100 font-sans text-gray-800">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50 flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-sm w-full min-h-full flex flex-col items-center justify-center text-center">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
