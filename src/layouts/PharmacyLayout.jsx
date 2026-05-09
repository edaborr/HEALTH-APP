import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, X } from "lucide-react"; 

const PharmacyLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  // 🔥 Hata buradaydı, bu satırın olduğundan emin oluyoruz:
  const [isOpen, setIsOpen] = useState(true); 

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "/pharmacist", icon: "📊" },
    { name: "Reçete Onayları", path: "/pharmacist/requests", icon: "📑" },
    { name: "İlaç Envanteri", path: "/pharmacist/inventory", icon: "📦" },
    { name: "Eczane Ayarları", path: "/pharmacist/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f4f7fe] dark:bg-gray-950 transition-colors duration-500 font-sans">
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-[90]
        ${isOpen ? "translate-x-0 w-[300px]" : "-translate-x-full w-0 lg:w-20"}
        bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out 
        flex flex-col p-5 border-r border-gray-100 dark:border-gray-800
        h-full overflow-hidden shrink-0
      `}>
        
        {/* LOGO */}
        <div className="mb-4 px-4 shrink-0 text-center lg:text-left">
          <h1 className="text-xl font-black text-blue-600 dark:text-emerald-500 tracking-tighter uppercase">
            Health System
          </h1>
        </div>

        {/* 👤 KÜÇÜK PROFIL KARTI */}
        {isOpen && (
          <div className="mb-4 p-4 bg-blue-50/50 dark:bg-emerald-900/10 rounded-[2rem] border border-blue-50 dark:border-emerald-900/20 flex flex-col items-center text-center shrink-0">
            <div className="w-16 h-16 rounded-full bg-blue-500 dark:bg-emerald-600 flex items-center justify-center text-2xl font-black text-white shadow-lg mb-2 border-2 border-white dark:border-gray-800">
              {user?.name?.charAt(0) || "E"}
            </div>
            <h3 className="text-base font-black text-gray-800 dark:text-white uppercase tracking-tight leading-none mb-1">
              {user?.name || "Eczacı Mehmet"}
            </h3>
            <p className="text-[9px] font-bold text-gray-400 mb-2 lowercase opacity-70">
              {user?.email || "pharmacy@mail.com"}
            </p>
            <span className="px-4 py-1 bg-blue-100 dark:bg-emerald-900/30 text-blue-600 dark:text-emerald-400 text-[8px] font-black uppercase rounded-full">
              ECZACI
            </span>
          </div>
        )}

        {/* NAVİGASYON */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-1 no-scrollbar">
          <style>{`nav::-webkit-scrollbar { display: none; }`}</style>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) => `
                flex items-center gap-4 px-5 py-3 rounded-[1.2rem] transition-all duration-300 group
                ${isActive 
                  ? "bg-blue-600 dark:bg-emerald-600 text-white shadow-md translate-x-2" 
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-1"}
              `}
            >
              <span className={`text-lg ${isOpen ? "" : "mx-auto"}`}>{item.icon}</span>
              {isOpen && <span className="text-[13px] font-bold tracking-tight uppercase">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* ÇIKIŞ */}
        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 shrink-0">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-4 px-5 py-3 w-full rounded-[1.2rem] text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition-all font-bold"
          >
            <LogOut size={18} />
            {isOpen && <span className="text-[13px]">Oturumu Kapat</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 h-full overflow-y-auto bg-transparent">
        <div className="max-w-[1600px] mx-auto min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PharmacyLayout;