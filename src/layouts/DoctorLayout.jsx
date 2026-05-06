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
  CheckSquare,
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
    { name: "Görevler", path: "/doctor/tasks", icon: <CheckSquare size={20} /> }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F4FBFC] via-[#EFF9FB] to-[#E6F7FA]">

      {/* SIDEBAR */}
      <aside
        className={`
          ${collapsed ? "w-20" : "w-72"}
          bg-white/75
          backdrop-blur-2xl
          border-r border-white/40
          shadow-[0_10px_40px_rgba(14,116,144,0.08)]
          p-4
          flex
          flex-col
          transition-all
          duration-500
          ease-in-out
          z-50
        `}
      >

        {/* LOGO */}
        <div className="flex items-center justify-between mb-10 px-2">

          {!collapsed && (
            <div className="flex items-center gap-3">
              <div
                className="
                  w-10 h-10
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#67C6D3]
                  to-[#0891B2]
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-[0_10px_25px_rgba(8,145,178,0.35)]
                "
              >
                <span className="font-black text-xs">MT</span>
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-800 tracking-tight">
                  MedTrack
                </h2>
                <p className="text-[10px] text-slate-400 font-semibold">
                  Health Management
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
              p-2
              rounded-2xl
              bg-white/70
              text-slate-400
              hover:text-[#0891B2]
              hover:bg-[#F4FBFC]
              transition-all
              border
              border-white/40
            "
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-hide">

          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/doctor"}
              className={({ isActive }) =>
                `
                group
                relative
                flex
                items-center
                gap-3
                px-4
                py-3.5
                rounded-2xl
                transition-all
                duration-300
                font-bold
                text-sm
                overflow-hidden

                ${
                  isActive
                    ? `
                      bg-[#0891B2]/10
                      text-[#0891B2]
                      shadow-[0_10px_30px_rgba(8,145,178,0.10)]
                    `
                    : `
                      text-slate-500
                      hover:bg-[#F4FBFC]
                      hover:text-slate-700
                    `
                }
              `
              }
            >
              {({ isActive }) => (
                <>
                  {/* ACTIVE BG GLOW */}
                  {isActive && (
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-[#67C6D3]/10
                        to-transparent
                        pointer-events-none
                      "
                    />
                  )}

                  {/* ICON */}
                  <span
                    className={`
                      relative z-10 transition-all duration-300

                      ${
                        isActive
                          ? "text-[#0891B2]"
                          : "text-slate-400 group-hover:text-[#0891B2]"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  {/* TEXT */}
                  {!collapsed && (
                    <span className="relative z-10 truncate">
                      {item.name}
                    </span>
                  )}

                  {/* ACTIVE LINE */}
                  {isActive && (
                    <div
                      className="
                        absolute
                        right-0
                        w-1
                        h-7
                        rounded-l-full
                        bg-gradient-to-b
                        from-[#67C6D3]
                        to-[#0891B2]
                        shadow-[0_0_12px_#0891B2]
                      "
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ALT PROFIL */}
        <div className="pt-4 mt-4 border-t border-white/30 space-y-4">

          {!collapsed && (
            <div
              className="
                bg-white/60
                backdrop-blur-xl
                rounded-3xl
                p-4
                flex
                items-center
                gap-3
                border
                border-white/40
                shadow-[0_10px_30px_rgba(14,116,144,0.06)]
              "
            >
              <div
                className="
                  w-11 h-11
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#67C6D3]
                  to-[#0891B2]
                  flex
                  items-center
                  justify-center
                  text-white
                  font-black
                  shadow-lg
                "
              >
                {user?.name?.charAt(0) || "D"}
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-black text-slate-800 truncate">
                  Dr. {user?.name || "Ahmet"}
                </p>

                <p className="text-[11px] font-semibold text-[#0891B2] truncate">
                  Aile Hekimi
                </p>
              </div>
            </div>
          )}

          {/* LOGOUT */}
          <button
            onClick={logout}
            className={`
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              font-bold
              text-sm
              transition-all
              duration-300

              ${
                collapsed
                  ? "justify-center"
                  : ""
              }

              text-rose-500
              hover:bg-rose-50
            `}
          >
            <LogOut size={20} />

            {!collapsed && <span>Oturumu Kapat</span>}
          </button>

        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-hidden">

        <div className="h-full overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>

      </main>
    </div>
  );
};

export default DoctorLayout;