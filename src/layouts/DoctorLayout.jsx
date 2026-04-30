import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DoctorLayout = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/doctor", icon: LayoutDashboard },
    { name: "Yenileme Talepleri", path: "/doctor/requests", icon: FileText },
    { name: "Hastalarım", path: "/doctor/patients", icon: Users },
    { name: "Reçeteler", path: "/doctor/prescriptions", icon: FileText },
    { name: "Profil", path: "/doctor/profile", icon: User },
  ];

  return (
    <div className="flex h-screen bg-[#F5F7F9] dark:bg-gray-950 transition">

      {/* SIDEBAR */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white dark:bg-gray-900 text-black dark:text-white shadow-xl
        p-4 flex flex-col justify-between transition-all duration-300`}
      >
        {/* TOP */}
        <div>
          <div className="flex items-center justify-between mb-6">
            {!collapsed && (
              <h2 className="text-lg font-bold text-[#6FA9B7]">
                Doctor Panel
              </h2>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* MENU */}
          <nav className="flex flex-col gap-2">
            {menu.map((item, i) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={i}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-xl transition-all
                    ${
                      isActive
                        ? "bg-[#6FA9B7] text-white shadow"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  <Icon size={20} />

                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* USER + LOGOUT */}
        <div className="space-y-3">
          {!collapsed && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user?.name}
            </div>
          )}

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            {!collapsed && "Çıkış Yap"}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 overflow-auto text-black dark:text-white transition">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorLayout;