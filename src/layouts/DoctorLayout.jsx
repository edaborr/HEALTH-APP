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

  // Menüleri daha profesyonel bir hiyerarşi için gruplara ayırabiliriz
  const menuItems = [
    { name: "Dashboard", path: "/doctor", icon: <LayoutDashboard size={20} /> },
    { name: "Yenileme Talepleri", path: "/doctor/requests", icon: <ClipboardList size={20} /> },
    { name: "Hastalarım", path: "/doctor/patients", icon: <Users size={20} /> },
    { name: "Reçeteler", path: "/doctor/prescriptions", icon: <FileText size={20} /> },
    { name: "Profil", path: "/doctor/profile", icon: <User size={20} /> },
    { name: "Görevler", path: "/doctor/tasks", icon: <CheckSquare size={20} /> }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-gray-950">

      {/* --- MODERN SIDEBAR --- */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-72"
        } bg-white dark:bg-gray-900 border-r border-slate-100 dark:border-gray-800 p-4 flex flex-col transition-all duration-500 ease-in-out z-50`}
      >

        {/* LOGO VE TOGGLE */}
        <div className="flex items-center justify-between mb-10 px-2">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#6FA9B7] to-[#5a8e9b] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#6FA9B7]/20">
                <span className="font-black text-xs">MT</span>
              </div>
              <h2 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
                MedTrack
              </h2>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl bg-slate-50 dark:bg-gray-800 text-slate-400 hover:text-[#6FA9B7] transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* MENÜ LİSTESİ */}
        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/doctor"}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
                  isActive
                    ? "bg-[#6FA9B7]/10 text-[#6FA9B7]"
                    : "text-slate-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`${isActive ? "text-[#6FA9B7]" : "text-slate-400 group-hover:text-slate-600"} transition-colors`}>
                    {item.icon}
                  </span>
                  
                  {!collapsed && <span className="truncate">{item.name}</span>}

                  {/* Aktiflik Çizgisi */}
                  {isActive && (
                    <div className="absolute right-0 w-1 h-6 bg-[#6FA9B7] rounded-l-full shadow-[0_0_8px_#6FA9B7]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ALT KISIM (PROFİL & ÇIKIŞ) */}
        <div className="pt-4 mt-4 border-t border-slate-50 dark:border-gray-800 space-y-4">
          
          {!collapsed && (
            <div className="bg-slate-50 dark:bg-gray-800/50 rounded-2xl p-3 flex items-center gap-3 border border-slate-100 dark:border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center text-[#6FA9B7] font-black border border-slate-200 dark:border-gray-600 shadow-sm">
                {user?.name?.charAt(0) || 'D'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-black text-slate-800 dark:text-white truncate uppercase">
                   Dr. {user?.name || "Ahmet"}
                </p>
                <p className="text-[10px] font-bold text-[#6FA9B7] uppercase tracking-wider">Aile Hekimi</p>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
              collapsed 
                ? "justify-center text-rose-500 hover:bg-rose-50" 
                : "text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
            }`}
          >
            <LogOut size={20} />
            {!collapsed && <span>Oturumu Kapat</span>}
          </button>

        </div>
      </aside>

      {/* --- ANA İÇERİK ALANI --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Opsiyonel: Header (Üst Bar) eklemek istersen buraya gelebilir */}
        <div className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC] dark:bg-gray-950">
           <div className="max-w-7xl mx-auto">
              <Outlet />
           </div>
        </div>
      </main>

    </div>
  );
};

export default DoctorLayout;