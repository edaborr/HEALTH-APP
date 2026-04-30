import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

import {
  LayoutDashboard,
  FileText,
  Users,
  ClipboardList,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DoctorLayout = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/doctor", icon: <LayoutDashboard size={20} /> },
    { name: "Yenileme Talepleri", path: "/doctor/requests", icon: <ClipboardList size={20} /> },
    { name: "Hastalarım", path: "/doctor/patients", icon: <Users size={20} /> },
    { name: "Reçeteler", path: "/doctor/prescriptions", icon: <FileText size={20} /> },
    { name: "Profil", path: "/doctor/profile", icon: <User size={20} /> },
    {name: "Görevler",path: "/doctor/tasks",icon: <ClipboardList size={20} />,}
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">

      {/* SIDEBAR */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white dark:bg-gray-900 shadow-md p-4 flex flex-col justify-between transition-all duration-300`}
      >

        {/* TOP */}
        <div>

          {/* LOGO + TOGGLE */}
          <div className="flex items-center justify-between mb-8">

            {!collapsed && (
              <h2 className="text-xl font-bold text-[#6FA9B7]">
                Doctor Panel
              </h2>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>

          {/* MENU */}
          <nav className="flex flex-col gap-2">

            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                end={item.path === "/doctor"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition ${
                    isActive
                      ? "bg-[#6FA9B7] text-white shadow"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                {item.icon}

                {!collapsed && (
                  <span className="text-sm">{item.name}</span>
                )}
              </NavLink>
            ))}

          </nav>
        </div>

        {/* BOTTOM */}
        <div className="space-y-4">

          {!collapsed && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user?.name}
            </div>
          )}

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            {!collapsed && "Çıkış Yap"}
          </button>

        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>

    </div>
  );
};

export default DoctorLayout;