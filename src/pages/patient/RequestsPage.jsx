import { useState, useEffect, useMemo } from "react";
import { useRequests } from "../../context/RequestContext";
import { useAuth } from "../../context/AuthContext";
import { commonMeds } from "../../data/mockUsers";
import { useTheme } from "../../context/ThemeContext";

const RequestsPage = () => {
  const { addRequest, requests } = useRequests(); // requests eklendi
  const { user } = useAuth();
  const { dark } = useTheme();
  const [animate, setAnimate] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Arama state'i

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Filtreleme Mantığı (Arama Çubuğu İçin)
  const filteredCommonMeds = useMemo(() => {
    return commonMeds.filter(med => 
      med.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleAdd = (medicine) => {
    addRequest(medicine, user);
    // Burada sistemindeki Toast tetiklenebilir (Eğer context'e bağlıysa otomatik çalışır)
  };

  return (
    <div className="space-y-8 bg-[#f0f7ff] dark:bg-gray-950 min-h-screen p-4 md:p-10 transition-colors duration-500">
      
      {/* 🔵 BAŞLIK VE ASİSTAN KARTI */}
      <div className={`relative overflow-hidden bg-gradient-to-r from-teal-600 to-emerald-500 rounded-[3rem] p-8 md:p-12 shadow-xl transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-white text-center md:text-left">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Eczane İşlemleri</h2>
            <p className="text-white/80 text-lg font-medium italic leading-relaxed">
              İhtiyacın olan ilaçları buradan seçip eczaneye bildirebilir, hazırlık sürecini anlık takip edebilirsin.
            </p>
          </div>
          <div className="text-[8rem] opacity-30 select-none animate-bounce">🏪</div>
        </div>
      </div>

      {/* 🔍 ARAMA ÇUBUĞU (YENİ EKLEME) */}
      <div className={`relative transition-all duration-1000 delay-75 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <input 
          type="text"
          placeholder="İlaç ara... (Örn: Parol)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-6 px-10 bg-white dark:bg-gray-900 rounded-[2rem] border-none shadow-sm focus:ring-4 focus:ring-teal-500/20 text-gray-700 dark:text-gray-200 font-bold transition-all outline-none"
        />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl">🔍</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 🟣 KRONİK İLAÇLAR PANELİ */}
        <div className={`bg-white dark:bg-gray-900 rounded-[3.5rem] p-8 border border-white dark:border-gray-800 shadow-sm transition-all duration-700 delay-100 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-2xl">🧬</div>
            <div>
              <h3 className="text-xl font-black text-gray-800 dark:text-white tracking-tighter">Kronik İlaçların</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Düzenli Kullanım</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {user?.chronicMeds?.map((med) => (
              <button
                key={med}
                onClick={() => handleAdd(med)}
                className="group relative bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-6 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest border border-purple-100 dark:border-purple-800/50 hover:bg-purple-600 hover:text-white transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">{med}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
        </div>

        {/* 🟢 DİĞER İLAÇLAR PANELİ */}
        <div className={`bg-white dark:bg-gray-900 rounded-[3.5rem] p-8 border border-white dark:border-gray-800 shadow-sm transition-all duration-700 delay-200 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-2xl">💊</div>
            <div>
              <h3 className="text-xl font-black text-gray-800 dark:text-white tracking-tighter">Diğer İlaçlar</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hızlı Seçim Listesi</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredCommonMeds.map((med) => (
              <button
                key={med}
                onClick={() => handleAdd(med)}
                className="group relative bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-6 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest border border-emerald-100 dark:border-emerald-800/50 hover:bg-emerald-600 hover:text-white transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">{med}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🟠 SON TALEPLERİM VE DURUM TAKİBİ (YENİ EKLEME) */}
      <div className={`bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 border border-white dark:border-gray-800 shadow-sm transition-all duration-1000 delay-300 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h3 className="text-2xl font-black text-gray-800 dark:text-white tracking-tighter mb-8">Talep Takip Merkezi</h3>
        
        <div className="space-y-4">
          {requests && requests.length > 0 ? (
             requests.filter(r => r.patientId === user?.id).slice(-3).map((req, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center shadow-sm">📦</div>
                  <div>
                    <p className="font-black text-gray-800 dark:text-white uppercase text-xs">{req.medicine}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date().toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-black rounded-lg uppercase tracking-widest">
                  ⏳ Onay Bekliyor
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 font-bold italic text-sm">Henüz aktif bir ilaç talebin bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default RequestsPage;