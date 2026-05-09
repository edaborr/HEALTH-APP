import { useState, useMemo, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useHealth } from "../../context/HealthContext"; // 🟢 Context eklendi

const MedicationTracker = () => {
  const { dark } = useTheme();
  const { history, addRecord } = useHealth(); // 🟢 Veri akışı için eklendi
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // --- 🟢 VERİ MANTIĞI: STOK YERİNE DOZ VE TEDAVİ ODAKLI YAPI ---
  const [meds, setMeds] = useState([
    {
      id: 1,
      name: "Parol 500mg",
      type: "Hap",
      dose: "Günde 2 Kez",
      timing: "Tok Karnına",
      remainingDose: 12, // Stok yerine Kalan Doz
      totalPackSize: 20, // Paket Kapasitesi
      icon: "💊",
      color: "from-blue-500 to-indigo-600",
      note: "Ateş düşürücü ve ağrı kesici etkisi vardır."
    },
    {
      id: 2,
      name: "Ventolin",
      type: "Fısfıs",
      dose: "İhtiyaç Halinde",
      timing: "Aç/Tok Fark Etmez",
      remainingDose: 4, 
      totalPackSize: 200,
      icon: "🌬️",
      color: "from-emerald-500 to-teal-400",
      note: "Nefes darlığı durumunda 2 fıs kullanılır."
    },
    {
      id: 3,
      name: "Ferrum Fort",
      type: "Hap",
      dose: "Günde 1 Kez",
      timing: "Sabah Aç Karnına",
      remainingDose: 2,
      totalPackSize: 30,
      icon: "🩸",
      color: "from-rose-500 to-orange-400",
      note: "Süt ürünleri ile arasında en az 2 saat olmalı."
    }
  ]);

  // "Doz Alındı" İşlemi: Veriyi dinamik olarak düşürür
  const handleDoseTaken = (id) => {
    setMeds(prevMeds => prevMeds.map(med => {
      if (med.id === id && med.remainingDose > 0) {
        return { ...med, remainingDose: med.remainingDose - 1 };
      }
      return med;
    }));
  };

  const criticalMeds = useMemo(() => meds.filter(m => m.remainingDose < 5), [meds]);

  return (
    <div className="space-y-8 bg-[#f0f7ff] dark:bg-gray-950 min-h-screen p-4 md:p-10 transition-colors duration-500">
      
      {/* 🔵 ÜST ASİSTAN KARTI (Analiz Bölümü) */}
      <div className={`relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[3rem] p-8 md:p-12 shadow-xl transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-white">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Tedavi Planın</h2>
            <p className="text-white/80 text-lg font-medium italic leading-relaxed">
              {criticalMeds.length > 0 
                ? `⚠️ Bazı ilaçlarının kullanım süresi bitmek üzere (${criticalMeds.map(m => m.name).join(", ")}). Eczacından yeni paket talep edebilirsin.`
                : "✅ Harika! Tedavi planın kusursuz işliyor, tüm ilaçların mevcut."}
            </p>
          </div>
          <div className="text-[8rem] md:text-[10rem] opacity-30 select-none animate-pulse">💊</div>
        </div>
      </div>

      {/* 🔵 İLAÇ KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meds.map((med, index) => (
          <div 
            key={med.id}
            style={{ transitionDelay: `${index * 150}ms` }}
            className={`bg-white dark:bg-gray-900 rounded-[3.5rem] p-8 border border-white dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-700 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-16 h-16 bg-gradient-to-br ${med.color} rounded-[1.8rem] flex items-center justify-center text-3xl shadow-lg`}>
                {med.icon}
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest ${med.remainingDose < 5 ? 'bg-rose-50 text-rose-500 animate-pulse' : 'bg-emerald-50 text-emerald-600'}`}>
                  {med.remainingDose < 5 ? 'Paket Azalıyor' : 'Paket Dolu'}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <h3 className="text-2xl font-black text-gray-800 dark:text-white tracking-tighter">{med.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg uppercase">{med.type}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{med.timing}</span>
              </div>
            </div>

            {/* 🟢 STOK YERİNE: TEDAVİ DOLULUK BARI */}
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                <span>Kalan Kullanım</span>
                <span className={med.remainingDose < 5 ? "text-rose-500" : ""}>{med.remainingDose} Doz Kaldı</span>
              </div>
              <div className="h-3 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-100 dark:border-gray-700">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${med.color} transition-all duration-1000 shadow-sm`}
                  style={{ width: `${(med.remainingDose / med.totalPackSize) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="p-5 bg-gray-50/50 dark:bg-gray-800/30 rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium italic leading-relaxed">
                <span className="font-black text-indigo-500 uppercase not-italic mr-1">Önemli:</span> "{med.note}"
              </p>
            </div>

            <button 
              onClick={() => handleDoseTaken(med.id)}
              className="w-full mt-8 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-600 hover:dark:bg-blue-500 hover:dark:text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
            >
              Bugünkü Dozu Aldım
            </button>
          </div>
        ))}

        <div className="border-4 border-dashed border-gray-200 dark:border-gray-800 rounded-[3.5rem] flex flex-col items-center justify-center p-12 group cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/10 transition-all duration-500">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl text-gray-300 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
            +
          </div>
          <p className="mt-6 text-[12px] font-black text-gray-400 uppercase tracking-[0.3em] group-hover:text-indigo-500">Yeni Takviye Ekle</p>
        </div>
      </div>

      {/* 🔵 GÜNLÜK TAKVİM PANELİ */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[3.5rem] p-10 border border-white dark:border-gray-800 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <h3 className="text-3xl font-black text-gray-800 dark:text-white tracking-tighter">Günün Dozları</h3>
          <span className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-2xl uppercase tracking-widest">8 Mayıs 2026</span>
        </div>

        <div className="space-y-6 relative before:absolute before:left-[1.85rem] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-gray-800">
          {[
            { time: "08:00", med: "Ferrum Fort", status: "Alındı", icon: "✅" },
            { time: "13:30", med: "Parol 500mg", status: "Sıradaki", icon: "⏰" },
            { time: "21:00", med: "Parol 500mg", status: "Bekliyor", icon: "⏳" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-8 relative z-10 group">
              <div className={`w-16 h-16 rounded-[1.5rem] border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-md transition-all ${item.status === 'Alındı' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                <span className="text-[11px] font-black">{item.time}</span>
              </div>
              <div className="flex-1 p-6 bg-white dark:bg-gray-800 shadow-sm border border-gray-50 dark:border-gray-700 rounded-[2.2rem] flex justify-between items-center group-hover:border-blue-200 transition-all">
                <div>
                   <p className="font-black text-lg text-gray-800 dark:text-white">{item.med}</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.status}</p>
                </div>
                <span className="text-2xl">{item.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicationTracker;