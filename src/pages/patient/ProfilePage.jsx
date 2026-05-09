import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Çıkış yönlendirmesi için

const ProfilePage = () => {
  const { dark, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // Logout fonksiyonunu çektik
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLogout = () => {
    logout(); // AuthContext içindeki çıkış işlemini tetikler
    navigate("/"); // Giriş sayfasına yönlendirir
  };

  return (
    <div className="space-y-8 bg-[#f0f7ff] dark:bg-gray-950 min-h-screen p-4 md:p-10 transition-colors duration-500">
      
      {/* 🔵 PROFİL ÜST KART (SAĞLIK KARTI KONSEPTİ) */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 rounded-[3rem] p-8 md:p-12 shadow-xl transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          {/* Görsel: Doktor yerine şık bir kullanıcı ikonu veya baş harf */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-5xl text-white shadow-2xl font-black">
            {user?.name?.charAt(0) || "H"}
          </div>
          
          <div className="text-center md:text-left space-y-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{user?.name || "Kullanıcı Adı"}</h2>
              <p className="text-blue-200/60 font-bold uppercase tracking-[0.3em] text-[10px] mt-1">Dijital Sağlık Kimlik Numarası: #ID-092283</p>
            </div>
            
            {/* "Premium" yerine Sistem Bilgileri */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-5 py-2 bg-blue-400/20 text-blue-100 rounded-2xl text-[10px] font-black uppercase border border-blue-400/30">Sigorta Kapsamında</span>
              <span className="px-5 py-2 bg-emerald-400/20 text-emerald-100 rounded-2xl text-[10px] font-black uppercase border border-emerald-400/30">Doğrulanmış Profil</span>
              <span className="px-5 py-2 bg-orange-400/20 text-orange-100 rounded-2xl text-[10px] font-black uppercase border border-orange-400/30">Kronik Takip Aktif</span>
            </div>
          </div>
        </div>
        {/* Arka plan süsü */}
        <div className="absolute -right-20 -bottom-20 text-[20rem] text-white/5 font-black select-none italic">HEALTH</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 📋 KİŞİSEL VE TIBBİ ÖZET */}
        <div className={`lg:col-span-2 bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 border border-white dark:border-gray-800 shadow-sm transition-all duration-700 delay-100 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-gray-800 dark:text-white tracking-tighter flex items-center gap-3">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">👤</span> Kimlik Bilgileri
            </h3>
            <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">Düzenle</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "TC Kimlik / Pasaport", value: "34********" },
              { label: "E-Posta Adresi", value: user?.email || "Girilmemiş" },
              { label: "Kayıtlı Kan Grubu", value: "A Rh(+)" },
              { label: "Boy / Kilo", value: "182 cm / 78 kg" },
              { label: "Cinsiyet", value: user?.gender || "Belirtilmemiş" },
              { label: "Acil Durum Kişisi", value: "05xx xxx xx xx" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-[2rem] border border-gray-100 dark:border-gray-700 group hover:border-blue-200 transition-colors">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                <p className="font-bold text-gray-700 dark:text-gray-200">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ⚙️ SİSTEM VE GÜVENLİK */}
        <div className={`space-y-6 transition-all duration-700 delay-200 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 border border-white dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-black text-gray-800 dark:text-white tracking-tighter mb-8 flex items-center gap-3">
              <span className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-xl">⚙️</span> Sistem
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50 rounded-[1.5rem]">
                <span className="text-[11px] font-black text-gray-500 uppercase">Karanlık Tema</span>
                <button onClick={toggleTheme} className={`w-12 h-6 rounded-full relative transition-colors ${dark ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${dark ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50 rounded-[1.5rem] opacity-60">
                <span className="text-[11px] font-black text-gray-500 uppercase">SMS Bildirimleri</span>
                <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-950/20 rounded-[3.5rem] p-10 border border-rose-100 dark:border-rose-900/30">
             <h3 className="text-lg font-black text-rose-600 dark:text-rose-400 tracking-tighter mb-6">Oturumu Kapat</h3>
             <p className="text-[10px] text-rose-400 font-bold uppercase mb-6 leading-relaxed">Güvenliğiniz için işleminiz bittiğinde çıkış yapmayı unutmayın.</p>
             <button 
               onClick={handleLogout}
               className="w-full py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
             >
               Çıkış Yap
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;