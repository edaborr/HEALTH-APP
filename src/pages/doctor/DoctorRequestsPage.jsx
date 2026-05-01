import { useRequests } from "../../context/RequestContext";
import { useState } from "react";
import { 
  CheckCircle2, XCircle, Clock, Pill, 
  User, Mail, Search, Calendar,
  AlertTriangle, MousePointer2, X, ChevronDown, History, MessageSquare, Mic, Activity, ShieldAlert, Zap
} from "lucide-react";

const DoctorRequestsPage = () => {
  const { requests, approveRequest, rejectRequest } = useRequests();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [isRecording, setIsRecording] = useState(null);

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = filter === "all" || req.status === filter;
    const matchesSearch = (req.patientName + req.medicine).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    critical: requests.filter(r => r.status === 'pending' && r.medicine.length > 8).length,
    todayProcessed: requests.filter(r => r.status !== 'pending').length
  };

  const handleBulkApprove = () => {
    selectedIds.forEach(id => approveRequest(id));
    setSelectedIds([]);
    setIsSelectionMode(false);
  };

  return (
    <div className="min-h-screen max-w-[1400px] mx-auto space-y-8 pb-20 p-4 animate-in fade-in duration-700 relative bg-transparent">
      
      {/* 🌌 1: GELİŞMİŞ VE GARANTİLENMİŞ ARKA PLAN */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {/* Güçlendirilmiş Teknik Izgara */}
        <div className="absolute inset-0" 
             style={{ 
               opacity: 0.07,
               backgroundImage: `linear-gradient(#6FA9B7 1.5px, transparent 1.5px), linear-gradient(90deg, #6FA9B7 1.5px, transparent 1.5px)`,
               backgroundSize: '50px 50px' 
             }}>
        </div>

        {/* Dinamik Işık Hareleri */}
        <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-[#6FA9B7]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[30%] -left-[10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] bg-emerald-50/30 rounded-full blur-[110px]" />
      </div>

      {/* 🛰 2: KENAR DETAYLARI (Boşluğu Doldurur) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col opacity-30 rotate-180 [writing-mode:vertical-lr] text-[10px] font-black tracking-[0.6em] text-[#6FA9B7] pointer-events-none">
        FAMILY MEDICINE DIGITAL SYSTEM v2.0
      </div>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col opacity-30 [writing-mode:vertical-lr] text-[10px] font-black tracking-[0.6em] text-[#6FA9B7] pointer-events-none">
        HEALTH MANAGEMENT INTERFACE 2026
      </div>

      {/* 📊 ÜST İSTATİSTİK KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {[
          { label: "BEKLEYEN ONAYLAR", value: stats.pending, icon: Clock, color: "orange", unit: "Talep" },
          { label: "KRİTİK VAKALAR", value: stats.critical, icon: ShieldAlert, color: "red", unit: "Hasta" },
          { label: "GÜNLÜK İŞLEM", value: `%${Math.min(stats.todayProcessed * 10, 100)}`, icon: Activity, color: "emerald", unit: "Verimlilik" }
        ].map((stat, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-sm flex items-center gap-5 transition-all hover:scale-[1.02]">
            <div className={`w-14 h-14 bg-${stat.color}-50 text-${stat.color}-500 rounded-2xl flex items-center justify-center shadow-inner`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
              <h4 className="text-3xl font-black text-gray-800 tracking-tight">{stat.value} <span className="text-sm font-medium text-gray-400">{stat.unit}</span></h4>
            </div>
          </div>
        ))}
      </div>

      {/* 🛠 ARAÇ ÇUBUĞU */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/70 backdrop-blur-2xl p-3 rounded-[2.2rem] border border-white shadow-xl shadow-gray-200/20 relative z-10">
        <div className="flex p-1.5 bg-gray-200/50 rounded-[1.6rem] w-fit">
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-6 py-2.5 rounded-[1.3rem] text-[11px] font-black transition-all ${filter === f ? "bg-white text-[#6FA9B7] shadow-lg" : "text-gray-500 hover:text-[#6FA9B7]"}`}>
              {f === 'all' ? 'TÜMÜ' : f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 pr-2">
          <button 
            onClick={() => { setIsSelectionMode(!isSelectionMode); setSelectedIds([]); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-xs transition-all ${
              isSelectionMode ? "bg-red-500 text-white shadow-lg shadow-red-100" : "bg-white text-gray-600 border border-gray-100 hover:shadow-md"
            }`}
          >
            {isSelectionMode ? <X size={16} /> : <MousePointer2 size={16} />} 
            {isSelectionMode ? "Vazgeç" : "Seçim Modu"}
          </button>

          {isSelectionMode && selectedIds.length > 0 && (
            <button onClick={handleBulkApprove} className="flex items-center gap-2 bg-[#6FA9B7] text-white px-6 py-2.5 rounded-2xl font-bold text-xs shadow-lg shadow-[#6FA9B7]/20 animate-in zoom-in-95">
              <CheckCircle2 size={16} /> Onayla ({selectedIds.length})
            </button>
          )}
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Hızlı arama..." className="pl-11 pr-6 py-2.5 bg-white rounded-2xl border border-white w-64 outline-none text-xs focus:ring-4 focus:ring-[#6FA9B7]/10 transition-all shadow-inner" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </div>

      {/* 📋 TALEPLER LİSTESİ */}
      <div className="grid gap-5 relative z-10">
        {filteredRequests.map((req) => (
          <div 
            key={req.id} 
            className={`group bg-white/90 backdrop-blur-md rounded-[2.8rem] border transition-all duration-300 ${
              selectedIds.includes(req.id) ? 'border-[#6FA9B7] shadow-2xl ring-2 ring-[#6FA9B7]/10' : 'border-white shadow-[0_10px_40px_rgb(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1'
            }`}
          >
            <div className="p-7 flex items-center gap-8">
              {isSelectionMode && req.status === 'pending' && (
                <input type="checkbox" checked={selectedIds.includes(req.id)} onChange={() => setSelectedIds(prev => prev.includes(req.id) ? prev.filter(i => i !== req.id) : [...prev, req.id])} className="w-6 h-6 rounded-full accent-[#6FA9B7] cursor-pointer animate-in zoom-in-50" />
              )}

              <div className="flex items-center gap-6 min-w-[320px]">
                <div className="relative group-hover:rotate-6 transition-transform duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-white text-[#6FA9B7] rounded-[1.6rem] flex items-center justify-center shadow-sm border border-blue-50">
                    <Pill size={30} />
                  </div>
                  {req.medicine.length > 8 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <Zap size={12} fill="white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-black text-gray-800 text-xl tracking-tight leading-none">{req.medicine}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100/80 px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <Calendar size={10}/> {new Date(req.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                    {req.medicine.length > 8 && <span className="text-[9px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-lg border border-red-100">RİSKLİ ETKİLEŞİM</span>}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center gap-4 border-l border-gray-100 pl-10">
                <div className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-[#6FA9B7] border-2 border-white shadow-sm"><User size={20} /></div>
                <div>
                  <p className="text-sm font-black text-gray-800 tracking-wide">{req.patientName}</p>
                  <p className="text-[10px] text-[#6FA9B7] font-black uppercase tracking-widest opacity-80">Son Muayene: 12 Nisan</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                   onClick={() => setIsRecording(isRecording === req.id ? null : req.id)}
                   className={`p-3 rounded-xl transition-all ${isRecording === req.id ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-200' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  <Mic size={18} />
                </button>
                <button 
                  onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                  className={`p-3 rounded-xl transition-all ${expandedId === req.id ? 'bg-[#6FA9B7] text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  <ChevronDown size={20} className={`transition-transform duration-300 ${expandedId === req.id ? 'rotate-180' : ''}`} />
                </button>

                {!isSelectionMode && req.status === 'pending' && (
                  <div className="flex gap-2 ml-4 border-l pl-5 border-gray-100">
                    <button onClick={() => approveRequest(req.id)} className="h-12 px-8 bg-[#6FA9B7] text-white rounded-[1.2rem] font-black text-xs shadow-lg shadow-[#6FA9B7]/30 hover:brightness-110 active:scale-95 transition-all">ONAYLA</button>
                    <button onClick={() => rejectRequest(req.id)} className="h-12 w-12 bg-red-50 text-red-500 rounded-[1.2rem] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"><XCircle size={22} /></button>
                  </div>
                )}
              </div>
            </div>

            {/* 🩺 DETAY PANELİ */}
            {expandedId === req.id && (
              <div className="px-12 pb-10 pt-2 grid grid-cols-3 gap-6 animate-in slide-in-from-top-4 duration-500">
                <div className="bg-white/50 p-5 rounded-[2rem] border border-gray-100 shadow-inner">
                  <div className="flex items-center gap-2 text-[#6FA9B7] font-black text-[10px] mb-4 tracking-widest uppercase"><History size={16} /> Kullanım Analizi</div>
                  <ul className="space-y-3 font-bold text-gray-600 text-xs">
                    <li className="flex justify-between"><span>01.04.2026</span> <span className="text-gray-900">28 Tablet</span></li>
                    <li className="flex justify-between"><span>02.03.2026</span> <span className="text-gray-900">28 Tablet</span></li>
                  </ul>
                </div>
                <div className="bg-orange-50/50 p-5 rounded-[2rem] border border-orange-100">
                  <div className="flex items-center gap-2 text-orange-600 font-black text-[10px] mb-4 tracking-widest uppercase"><AlertTriangle size={16} /> Kritik Uyarılar</div>
                  <p className="text-xs text-gray-600 leading-relaxed font-bold">Kreatinin değerleri sınırda. Doz kontrolü şart.</p>
                </div>
                <div className="bg-blue-50/50 p-5 rounded-[2rem] border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] mb-4 tracking-widest uppercase"><MessageSquare size={16} /> Hasta Notu</div>
                  <p className="text-xs text-gray-600 italic font-bold">"İlacım bitti, raporlu yazabilir misiniz?"</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorRequestsPage;