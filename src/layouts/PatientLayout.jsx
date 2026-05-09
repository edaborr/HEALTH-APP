import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { 
  LogOut, 
  Menu, 
  X,
  // 🟢 Profesyonel Lucide Simgeleri
  LayoutDashboard,
  AreaChart,
  Pill,
  Store,
  History,
  Settings
} from "lucide-react"; 

const PatientLayout = () => {
  const { logout, user } = useAuth();
  const { dark } = useTheme();
  const navigate = useNavigate();
  // Sidebar geniş ekranlarda varsayılan olarak açık (büyük) başlasın
  const [isOpen, setIsOpen] = useState(true); 

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Menü elemanları - App.jsx rotalarıyla %100 uyumlu
  // Simgeler Lucide simgeleriyle değiştirildi
  const menuItems = [
    { name: "Dashboard", path: "/patient", icon: <LayoutDashboard size={isOpen ? 22 : 24} /> },
    { name: "Sağlık Günlüğü", path: "/patient/tracking", icon: <AreaChart size={isOpen ? 22 : 24} /> },
    { name: "İlaç Rehberi", path: "/patient/medicines", icon: <Pill size={isOpen ? 22 : 24} /> },
    { name: "Eczane İşlemleri", path: "/patient/requests", icon: <Store size={isOpen ? 22 : 24} /> },
    { name: "Sağlık Geçmişi", path: "/patient/history", icon: <History size={isOpen ? 22 : 24} /> },
    { name: "Ayarlar", path: "/patient/profile", icon: <Settings size={isOpen ? 22 : 24} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7fe] dark:bg-gray-950 transition-colors duration-500">
      
      {/* MOBİL MENÜ BUTONU (Hafifçe sağa kaydırıldı) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-[100] p-3 bg-white rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 🟢 DÜZENLENEN SIDEBAR - Daha Kompakt Genişlik (w-80) */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-[90]
        ${isOpen ? "translate-x-0 w-80" : "-translate-x-full w-0 lg:w-28"}
        bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out 
        flex flex-col p-6 border-r border-gray-100 dark:border-gray-800 h-full
      `}>
        
        {/* LOGO */}
        <div className={`mb-10 px-4 transition-all ${isOpen ? "" : "text-center"}`}>
          <h1 className="text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">
            {isOpen ? "Health System" : "HS"}
          </h1>
        </div>

        {/* 👤 KULLANICI KARTI - 🟢 ÇOK DAHA KÜÇÜK VE KOMPAKT YAPILDI */}
        <div className={`mb-10 p-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-[2rem] border border-blue-50 dark:border-blue-900/20 flex flex-col items-center text-center shadow-sm transition-all ${isOpen ? "" : "p-3"}`}>
          
          {/* YUVARLAK İÇİNDEKİ SİMGE - 🟢 KÜÇÜLTÜLDÜ (w-16 h-16) */}
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-black text-white shadow-2xl mb-3 border-4 border-white dark:border-gray-800">
            {user?.name?.charAt(0) || "A"}
          </div>
          
          {isOpen && (
            <div className="animate-fade-in transition-all">
              <h3 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-tight">
                {user?.name || "Ali"}
              </h3>
              <p className="text-xs font-bold text-gray-400 lowercase">{user?.email || "ali@mail.com"}</p>
              {/* Etiketi de küçülttük */}
              <span className="inline-block px-5 py-1 mt-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase rounded-full tracking-[0.2em]">
                HASTA
              </span>
            </div>
          )}
        </div>

        {/* 🔗 NAVİGASYON LİNKLERİ - 🟢 Kompakt hizalama (px-6, p-4) */}
        <nav className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) => `
                flex items-center gap-4 rounded-[1.8rem] transition-all duration-300 group
                ${isActive 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-none scale-105" 
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-1"}
                ${isOpen ? "px-6 p-4" : "justify-center p-5"} // 🟢 Kapalıyken ortala
              `}
            >
              <span className={`transition-transform group-hover:scale-110`}>
                {item.icon}
              </span>
              {isOpen && (
                // 🟢 Metni Dashboard tam görünsün diye küçülttük ve sıkıştırdık
                <span className="text-[15px] font-bold tracking-tight">
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* 🚪 ÇIKIŞ BÖLÜMÜ */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-center">
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-4 text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition-all font-bold group rounded-[1.8rem] ${isOpen ? "w-full px-6 p-4" : "justify-center p-5"}`}
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            {isOpen && <span className="text-[15px]">Oturumu Kapat</span>}
          </button>
        </div>
      </aside>

      {/* 💻 ANA İÇERİK ALANI */}
      <main className="flex-1 h-screen overflow-y-auto scroll-smooth">
        <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default PatientLayout;