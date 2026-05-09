import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const HistoryPage = () => {
  const { dark } = useTheme();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // ÖRNEK GEÇMİŞ VERİSİ
  const [historyRecords] = useState([
    {
      id: 1,
      date: "15 Nisan 2026",
      type: "Muayene",
      doctor: "Dr. Selim Yılmaz",
      department: "Kardiyoloji",
      note: "Genel kontrol yapıldı, değerler normal.",
      icon: "🏥",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      date: "02 Mart 2026",
      type: "Tahlil",
      doctor: "Merkez Laboratuvarı",
      department: "Kan Tahlili",
      note: "Demir eksikliği gözlemlendi, takviye başlandı.",
      icon: "🧪",
      color: "from-purple-500 to-pink-600"
    }
  ]);

  return (
    <div className="space-y-8 bg-[#f0f7ff] dark:bg-gray-950 min-h-screen p-4 md:p-10 transition-colors duration-500">
      
      {/* 🔵 BAŞLIK KARTI */}
      <div className={`relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] p-8 md:p-12 shadow-xl transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative z-10 text-white">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Sağlık Geçmişi</h2>
          <p className="text-white/80 text-lg font-medium italic leading-relaxed">
            Geçmiş randevularını, tahlil sonuçlarını ve tedavi sürecini buradan inceleyebilirsin.
          </p>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[10rem] opacity-20 select-none">📁</div>
      </div>

      {/* 🔵 ZAMAN ÇİZGELGESİ (TIMELINE) */}
      <div className="relative space-y-8 before:absolute before:left-8 before:top-4 before:bottom-4 before:w-1 before:bg-gray-200 dark:before:bg-gray-800">
        {historyRecords.map((record, index) => (
          <div 
            key={record.id}
            style={{ transitionDelay: `${index * 200}ms` }}
            className={`relative pl-20 transition-all duration-700 ${animate ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
          >
            {/* Timeline Noktası */}
            <div className={`absolute left-4 top-4 w-8 h-8 rounded-full bg-gradient-to-br ${record.color} border-4 border-white dark:border-gray-900 shadow-lg z-10 flex items-center justify-center text-xs text-white`}>
              {index + 1}
            </div>

            {/* Kayıt Kartı */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-white dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">{record.date}</span>
                    <span className="px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-[10px] font-bold text-gray-400 uppercase">{record.type}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 dark:text-white tracking-tighter">{record.doctor}</h3>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{record.department}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                    "{record.note}"
                  </p>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${record.color} flex items-center justify-center text-4xl shadow-inner`}>
                    {record.icon}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;