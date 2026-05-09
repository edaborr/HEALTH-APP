import { useState, useEffect } from "react";
import { useRequests } from "../../context/RequestContext";
import { useTheme } from "../../context/ThemeContext";

const PharmacyDashboard = () => {
  const { requests, updateRequestStatus } = useRequests();
  const { dark } = useTheme();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Veri Filtreleme
  const pendingRequests = requests.filter(r => r.status === "Bekliyor");
  const approvedToday = requests.filter(r => r.status === "Onaylandı").length;

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      
      {/* 🟢 1. HOŞ GELDİN KARŞILAMA KARTI (YENİ EKLENDİ) */}
      <div className={`relative bg-gradient-to-br from-[#1e293b] to-[#334155] dark:from-emerald-900 dark:to-teal-950 rounded-[3rem] p-10 text-white shadow-2xl overflow-hidden transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative z-10">
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full backdrop-blur-md">
            Yönetim Paneli
          </span>
          <h2 className="text-4xl font-black tracking-tighter mt-6 mb-2">
            Merhaba, <span className="text-emerald-400 font-black italic">Eczacı Mehmet</span>
          </h2>
          <p className="text-slate-400 font-medium max-w-md text-sm leading-relaxed">
            Sistemde şu an onay bekleyen <span className="text-white font-bold">{pendingRequests.length} aktif talep</span> bulunuyor.
          </p>
        </div>
        <div className="absolute right-[-10px] bottom-[-20px] text-[12rem] opacity-10 rotate-12 select-none pointer-events-none">
          💊
        </div>
      </div>

      {/* 🟢 2. ÜST İSTATİSTİK ŞERİDİ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2.5rem] shadow-sm border border-white dark:border-gray-800 flex items-center gap-5 transition-transform hover:scale-[1.02]">
          <div className="w-14 h-14 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-2xl">⏳</div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bekleyen</p>
            <h4 className="text-2xl font-black text-gray-800 dark:text-white">{pendingRequests.length} Talep</h4>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2.5rem] shadow-sm border border-white dark:border-gray-800 flex items-center gap-5 transition-transform hover:scale-[1.02]">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-2xl">✅</div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tamamlanan</p>
            <h4 className="text-2xl font-black text-gray-800 dark:text-white">{approvedToday} İşlem</h4>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[2.5rem] shadow-xl text-white flex items-center gap-5">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
          <div>
            <p className="text-[10px] font-black opacity-70 uppercase tracking-widest">Sistem Durumu</p>
            <h4 className="text-lg font-bold leading-tight">Eczane Çevrimiçi</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 🟢 3. CANLI REÇETE TALEPLERİ (SOL ALAN) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[3rem] p-8 shadow-sm border border-white dark:border-gray-800">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-gray-800 dark:text-white tracking-tighter uppercase font-sans">
              Gelen Reçete Talepleri
            </h3>
            <span className="px-4 py-1 bg-gray-50 dark:bg-gray-800 rounded-full text-[10px] font-black text-gray-400 uppercase">
              Canlı Akış
            </span>
          </div>

          <div className="space-y-4">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((req) => (
                <div key={req.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#fcfdfe] dark:bg-gray-800/40 rounded-[2rem] border border-gray-100 dark:border-gray-700 hover:border-blue-200 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center shadow-sm text-xl group-hover:scale-110 transition-transform">👤</div>
                    <div>
                      <p className="font-black text-gray-800 dark:text-white text-sm uppercase">{req.patientName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-black text-blue-600 uppercase bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">{req.medicineName}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase italic tracking-tighter">{req.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button 
                      onClick={() => updateRequestStatus(req.id, "Onaylandı")}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black rounded-xl uppercase transition-all active:scale-95 shadow-lg shadow-emerald-100 dark:shadow-none"
                    >
                      Onayla
                    </button>
                    <button 
                      onClick={() => updateRequestStatus(req.id, "Reddedildi")}
                      className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-rose-500 text-[10px] font-black rounded-xl uppercase hover:bg-rose-50 transition-all"
                    >
                      Reddet
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="text-5xl mb-4 opacity-20 italic">📥</div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Şu an bekleyen yeni talep bulunmuyor</p>
              </div>
            )}
          </div>
        </div>

        {/* 🟢 4. SAĞ PANEL (KRİTİK STOK & NÖBETÇİ KARTLARI) */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-white dark:border-gray-800">
            <h3 className="text-lg font-black text-gray-800 dark:text-white mb-6 uppercase tracking-tighter">Kritik Stoklar</h3>
            <div className="space-y-5">
              {[
                { name: "Parol 500mg", level: 15, color: "bg-rose-500" },
                { name: "Augmentin BID", level: 45, color: "bg-amber-500" }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase">{item.name}</span>
                    <span className="text-[10px] font-bold text-gray-400">%{item.level}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
              Envanter Yönetimi
            </button>
          </div>

          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group transition-all hover:bg-emerald-700">
            <h3 className="text-lg font-black tracking-tighter mb-2 font-sans">Nöbetçi Modu</h3>
            <p className="text-[10px] opacity-80 font-bold uppercase mb-6 leading-relaxed font-sans">
              Acil talepleri önceliklendirmek için aktifleştirin.
            </p>
            <button className="w-full py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-emerald-700 transition-all font-sans">
              Modu Değiştir
            </button>
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 rotate-12">🌙</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PharmacyDashboard;