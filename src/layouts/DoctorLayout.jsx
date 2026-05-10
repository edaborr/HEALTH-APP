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
          bg-white/80
          backdrop-blur-3xl
          border-r border-slate-200/50
          shadow-[0_0_50px_rgba(8,145,178,0.05)]
          p-4
          flex
          flex-col
          transition-all
          duration-500
          ease-in-out
          z-50
        `}
      >
        {/* LOGO BÖLÜMÜ */}
        <div className="flex items-center justify-between mb-12 px-2">
          {!collapsed && (
            <div className="flex items-center gap-3 animate-in fade-in duration-500">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#67C6D3] to-[#0891B2] flex items-center justify-center text-white shadow-[0_8px_20px_rgba(8,145,178,0.3)]">
                <span className="font-black text-xs tracking-tighter">MT</span>
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-800 leading-none tracking-tight">
                  MedTrack
                </h2>
                <p className="text-[10px] text-[#0891B2] font-bold uppercase tracking-widest mt-1">
                  Health System
                </p>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`
              p-2.5 rounded-xl border border-slate-100 bg-white shadow-sm text-slate-400 
              hover:text-[#0891B2] hover:border-[#0891B2]/30 transition-all duration-300
              ${collapsed ? "mx-auto" : ""}
            `}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* MENÜ LİNKLERİ */}
        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto scrollbar-hide">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/doctor"}
              className={({ isActive }) => `
                group relative flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300
                ${collapsed ? "justify-center" : ""}
                ${isActive 
                  ? "bg-[#0891B2]/5 text-[#0891B2] shadow-[inset_0_0_0_1px_rgba(8,145,178,0.1)]" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                    {item.icon}
                  </div>
                  
                  {!collapsed && (
                    <span className="font-bold text-[13.5px] tracking-tight whitespace-nowrap">
                      {item.name}
                    </span>
                  )}

                  {isActive && (
                    <div className="absolute right-0 w-1 h-6 rounded-l-full bg-[#0891B2] shadow-[0_0_10px_#0891B2]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* PROFİL VE ÇIKIŞ ALANI */}
        <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
          {/* PROFİL KARTI BUTONU */}
          <NavLink
            to="/doctor/profile"
            className={`
              group flex items-center gap-3 rounded-[22px] transition-all duration-500
              ${collapsed ? "p-0 justify-center" : "p-3 bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#0891B2]/20"}
            `}
          >
            <div className={`
              shrink-0 rounded-xl bg-gradient-to-tr from-[#67C6D3] to-[#0891B2] 
              flex items-center justify-center text-white font-bold shadow-md
              transition-all duration-300
              ${collapsed ? "w-12 h-12 rounded-2xl" : "w-10 h-10"}
            `}>
              {user?.name?.charAt(0) || "D"}
            </div>

            {!collapsed && (
              <div className="flex-1 overflow-hidden animate-in slide-in-from-left-2">
                <p className="text-sm font-black text-slate-800 truncate">
                  Dr. {user?.name || "Ahmet"}
                </p>
                <p className="text-[11px] font-bold text-[#0891B2]/80 uppercase tracking-tight">
                  Aile Hekimi
                </p>
              </div>
            )}
          </NavLink>

          {/* ÇIKIŞ BUTONU */}
          <button
            onClick={logout}
            className={`
              w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-[13.5px]
              transition-all duration-300 group
              ${collapsed ? "justify-center" : ""}
              text-rose-500 hover:bg-rose-50 hover:text-rose-600
            `}
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
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