import { useState, useMemo, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useHealth } from "../../context/HealthContext";

const HealthTracking = () => {
  const { dark } = useTheme();
  const { history, deleteRecord } = useHealth();
  const [activeTab, setActiveTab] = useState("tansiyon");
  const [animate, setAnimate] = useState(false);
  
  // 🟢 YENİ: Şeker Analizi için Açlık/Tokluk Durumu
  const [isHungry, setIsHungry] = useState(true);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const filteredHistory = history.filter(item => item.type === activeTab);

  const reportData = useMemo(() => {
    const sugarLogs = history.filter(h => h.type === "seker");
    const bpLogs = history.filter(h => h.type === "tansiyon");
    const waterLogs = history.filter(h => h.type === "su");

    if (activeTab === "tansiyon") {
      const latestBP = bpLogs[0];
      if (!latestBP) return { title: "Kardiyovasküler Takip", desc: "Veri girişi bekleniyor...", icon: "🫀", color: "from-rose-500 to-rose-400" };
      
      const val = parseInt(latestBP.value.split('/')[0]);
      // 🟢 DSÖ STANDARTLARI: 140/90 (14/9) ve üzeri yüksek
      const isHigh = val >= 140 || (val >= 14 && val < 40); 
      const isNormalHigh = (val >= 130 && val < 140) || (val >= 13 && val < 14);

      if (isHigh) return { title: "DSÖ: Hipertansiyon!", desc: "Tansiyonun Dünya Sağlık Örgütü sınırlarının üzerinde. Lütfen dinlen.", icon: "⚠️", color: "from-red-600 to-rose-500" };
      if (isNormalHigh) return { title: "Sınırda Değer", desc: "Değerlerin normalin biraz üzerinde. Tuzu azaltman iyi olabilir.", icon: "🫀", color: "from-orange-500 to-amber-400" };
      
      return { title: "İdeal Ritim", desc: "DSÖ standartlarına göre tansiyonun mükemmel seviyede!", icon: "✅", color: "from-emerald-600 to-teal-500" };
    }

    if (activeTab === "seker") {
      const latestSugar = sugarLogs[0];
      if (!latestSugar) return { title: "Metabolik Analiz", desc: "Glikoz seviyeni takip ederek dengeyi koru.", icon: "🩸", color: "from-amber-500 to-orange-400" };
      
      // 🟢 DSÖ ŞEKER ANALİZİ (Açlık/Tokluk Ayrımıyla)
      const sugar = parseInt(latestSugar.value);
      const checkHungry = latestSugar.mealType === "Açlık" || isHungry;

      if (checkHungry) {
        if (sugar >= 126) return { title: "DSÖ: Yüksek Şeker", desc: "Açlık şekerin diyabet sınırında görünüyor.", icon: "⚠️", color: "from-red-600 to-orange-500" };
        if (sugar >= 100) return { title: "Gizli Şeker Riski", desc: "Açlık değerlerin tıbbi sınırda seyrediyor.", icon: "🩸", color: "from-orange-500 to-amber-400" };
      } else {
        if (sugar >= 200) return { title: "DSÖ: Kritik Seviye", desc: "Tokluk şekerin DSÖ sınırlarının oldukça üzerinde.", icon: "⚠️", color: "from-red-600 to-orange-500" };
        if (sugar >= 140) return { title: "Yüksek Tokluk", desc: "Yemek sonrası şeker seviyen normalin üzerinde.", icon: "🩸", color: "from-orange-500 to-amber-400" };
      }

      return { title: "Glikoz Dengesi İyi", desc: "Şeker seviyelerin DSÖ kriterlerine göre sağlıklı.", icon: "✅", color: "from-emerald-500 to-teal-400" };
    }

    if (activeTab === "su") {
      const totalWater = waterLogs.reduce((acc, curr) => acc + parseInt(curr.value), 0);
      if (totalWater < 15) return { title: "Hücrelerin Susuz!", desc: "Metabolizmanı hızlandırmak için hemen su içmelisin.", icon: "💧", color: "from-blue-600 to-cyan-500" };
      return { title: "Mükemmel Hidrasyon", desc: `Bugün ${totalWater} bardak su ile vücudunu tazeledin!`, icon: "💧", color: "from-cyan-600 to-blue-500" };
    }
    return { title: "Analiz Ediliyor", desc: "Veriler yükleniyor...", icon: "⚙️", color: "from-[#5eb5c7] to-[#7ed6e7]" };
  }, [history, activeTab, isHungry]);

  const chartData = useMemo(() => {
    const lastSeven = filteredHistory.slice(0, 7).reverse();
    const values = lastSeven.map(item => {
      let val = activeTab === "tansiyon" ? parseInt(item.value.split('/')[0]) : parseInt(item.value);
      if (activeTab === "tansiyon" && val < 40) val = val * 10; 
      return val;
    });
    const dates = lastSeven.map(h => h.date);

    const points = values.map((val, i) => ({
      x: (i * 100) / (Math.max(values.length - 1, 1)),
      y: 90 - (Math.min(val, 200) * 0.4) 
    }));

    const getCurvePath = (pts) => {
      if (pts.length < 2) return "";
      let path = `M ${pts[0].x},${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const cp1x = pts[i].x + (pts[i + 1].x - pts[i].x) / 3;
        const cp2x = pts[i].x + (pts[i + 1].x - pts[i].x) * 2 / 3;
        path += ` C ${cp1x},${pts[i].y} ${cp2x},${pts[i + 1].y} ${pts[i + 1].x},${pts[i + 1].y}`;
      }
      return path;
    };

    const curvePath = getCurvePath(points);
    const fillPath = curvePath ? `${curvePath} L 100,100 L 0,100 Z` : "";

    return { points, curvePath, fillPath, dates, latestValue: lastSeven[lastSeven.length - 1]?.value };
  }, [filteredHistory, activeTab]);

  return (
    <div className="space-y-6 bg-[#f0f7ff] dark:bg-gray-950 min-h-screen p-4 md:p-10 transition-colors duration-500">
      
      {/* 🟦 ÜST RAPOR KARTI */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${reportData.color} rounded-[2.5rem] p-6 md:p-8 shadow-lg flex items-center justify-between`}>
        <div className="relative z-10 space-y-1 md:space-y-2 max-w-lg text-white">
          <h2 className="text-xl md:text-2xl font-black tracking-tight">{reportData.title}</h2>
          <p className="text-white/90 text-xs md:text-sm font-medium italic">"{reportData.desc}"</p>
        </div>
        <div className="relative z-10 text-[4rem] md:text-[6rem] animate-pulse">{reportData.icon}</div>
      </div>

      {/* 🎛️ TAB VE SEÇİCİLER */}
      <div className="flex justify-between items-center px-2">
        {activeTab === "seker" ? (
          // 🟢 AÇLIK-TOKLUK SEÇİCİSİ
          <div className="flex bg-white/60 dark:bg-gray-900/60 backdrop-blur-md p-1 rounded-2xl border border-white dark:border-gray-800">
            <button 
              onClick={() => setIsHungry(true)} 
              className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${isHungry ? "bg-amber-500 text-white shadow-sm" : "text-gray-400"}`}
            >AÇLIK</button>
            <button 
              onClick={() => setIsHungry(false)} 
              className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${!isHungry ? "bg-orange-500 text-white shadow-sm" : "text-gray-400"}`}
            >TOKLUK</button>
          </div>
        ) : <div />}

        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md p-1.5 rounded-[1.5rem] flex gap-1 border border-white dark:border-gray-800">
          {["tansiyon", "seker", "su"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase transition-all ${activeTab === tab ? "bg-blue-600 text-white shadow-md scale-105" : "text-gray-400"}`}>
              {tab === "seker" ? "Şeker" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* 📈 GRAFİK ALANI */}
      <div className="bg-white dark:bg-gray-900 p-10 rounded-[3.5rem] shadow-sm border border-white/20 relative">
        <div className="flex justify-between items-center mb-10">
           <div>
              <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">DSÖ STANDART ANALİZİ</p>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white capitalize">{activeTab} Seyri</h3>
           </div>
           <div className="text-right">
              <span className="text-3xl font-black text-blue-600 transition-all">{chartData.latestValue || '--'}</span>
           </div>
        </div>

        <div className="relative h-56 w-full px-2 overflow-visible"> 
           {chartData.points.length > 0 ? (
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                 <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                       <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                 </defs>
                 <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="0.05" className="text-gray-100 dark:text-gray-800" />
                 <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.05" className="text-gray-100 dark:text-gray-800" />
                 <path d={chartData.fillPath} fill="url(#chartGrad)" className={`transition-all duration-1000 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} />
                 <path d={chartData.curvePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" className={`transition-all duration-1000 ease-out ${animate ? 'opacity-100' : 'opacity-0'}`} style={{ filter: "drop-shadow(0px 4px 6px rgba(59, 130, 246, 0.3))" }} />
                 {chartData.points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="white" stroke="#3b82f6" strokeWidth="1.5" className={`transition-all duration-500 delay-[${i * 100}ms] ${animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                 ))}
              </svg>
           ) : (
              <div className="h-full flex items-center justify-center text-gray-300 italic">Veri girişi bekleniyor...</div>
           )}
        </div>
        <div className="flex justify-between text-[10px] font-black text-gray-400 mt-10 border-t pt-6 uppercase tracking-tighter">
           {chartData.dates.map((d, i) => <span key={i} className="flex-1 text-center">{d}</span>)}
        </div>
      </div>

      {/* 📋 KAYIT TABLOSU */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[3rem] shadow-sm border border-white dark:border-gray-800 overflow-hidden">
        <div className="px-10 py-6 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/30">
           <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">DSÖ Kayıt Listesi</h3>
           <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-4 py-1.5 rounded-full">Toplam {filteredHistory.length} Kayıt</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody className="divide-y dark:divide-gray-800">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex flex-col">
                       <span className="text-sm font-black text-gray-800 dark:text-white">{item.date}</span>
                       <span className="text-[10px] text-gray-400 font-bold">{item.time}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-center">
                    <div className="flex flex-col items-center">
                       <span className={`text-lg font-black ${activeTab === 'tansiyon' ? 'text-rose-500' : 'text-blue-600'}`}>{item.value}</span>
                       {/* 🟢 Şeker Kaydında Açlık/Tokluk Bilgisi */}
                       {item.mealType && <span className="text-[8px] font-bold text-gray-400 uppercase">{item.mealType}</span>}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase border shadow-sm ${item.status === 'Yüksek' || item.status === 'Riskli' ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>{item.status}</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button onClick={() => deleteRecord(item.id)} className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthTracking;