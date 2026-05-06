import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  FileText, 
  User, 
  CheckSquare,
  LogOut,
  ChevronLeft,
  Settings,
  Bell
} from 'lucide-react';

const ModernSidebar = () => {
  const [activeMenu, setActiveMenu] = useState('Görevler');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, group: 'ANA' },
    { name: 'Yenileme Talepleri', icon: <ClipboardList size={20} />, group: 'ANA' },
    { name: 'Hastalarım', icon: <Users size={20} />, group: 'YÖNETİM' },
    { name: 'Reçeteler', icon: <FileText size={20} />, group: 'YÖNETİM' },
    { name: 'Profil', icon: <User size={20} />, group: 'SİSTEM' },
    { name: 'Görevler', icon: <CheckSquare size={20} />, group: 'SİSTEM' },
  ];

  return (
    <div className={`relative h-screen bg-white border-r border-slate-100 transition-all duration-300 shadow-sm flex flex-col ${isCollapsed ? 'w-20' : 'w-72'}`}>
      
      {/* 🟢 LOGO ALANI */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#64A5A5] to-[#4a8383] rounded-lg flex items-center justify-center text-white shadow-md">
              <span className="font-black text-xs">MT</span>
            </div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight">MedTrack</h1>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
        >
          <ChevronLeft className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} size={18} />
        </button>
      </div>

      {/* 🔵 MENÜ LİSTESİ */}
      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto scrollbar-hide">
        {['ANA', 'YÖNETİM', 'SİSTEM'].map((group) => (
          <div key={group} className="mb-6">
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
                {group}
              </p>
            )}
            {menuItems.filter(item => item.group === group).map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all relative group ${
                  activeMenu === item.name 
                  ? "bg-[#64A5A5]/10 text-[#64A5A5]" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <span className={`${activeMenu === item.name ? "text-[#64A5A5]" : "text-slate-400 group-hover:text-slate-600"}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span>{item.name}</span>}
                
                {/* Seçili olanın yanındaki aktiflik çizgisi */}
                {activeMenu === item.name && (
                  <div className="absolute right-0 w-1 h-6 bg-[#64A5A5] rounded-l-full" />
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* 🔴 ALT KISIM (USER & LOGOUT) */}
      <div className="p-4 mt-auto border-t border-slate-50">
        {!isCollapsed && (
          <div className="bg-slate-50 rounded-2xl p-4 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-[#64A5A5] shadow-sm">
              AY
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-black text-slate-800 truncate">Dr. Ahmet Yılmaz</p>
              <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-wider">Aile Hekimi</p>
            </div>
          </div>
        )}
        
        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-rose-500 hover:bg-rose-50 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
          <LogOut size={20} />
          {!isCollapsed && <span>Oturumu Kapat</span>}
        </button>
      </div>
    </div>
  );
};

export default ModernSidebar;