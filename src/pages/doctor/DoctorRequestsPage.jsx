import { useRequests } from "../../context/RequestContext";
import QRCode from "react-qr-code";
import { useState } from "react";
import { 
  CheckCircle2, XCircle, Clock, Pill, 
  User, Mail, Search, Calendar,
  AlertTriangle, MousePointer2, X, ChevronDown, History, MessageSquare, Mic, Activity, ShieldAlert, Zap,
  Dna, HeartPulse, ClipboardList, QrCode
} from "lucide-react";

const DoctorRequestsPage = () => {
  const {
    requests,
    approveRequest,
    rejectRequest,
    prepareRequest,
    deliverRequest,
  } = useRequests();

  const modalStatusConfig = {
  pending: { label: "Bekliyor", color: "text-amber-600", bg: "bg-amber-50" },
  approved: { label: "Onaylandı", color: "text-blue-600", bg: "bg-blue-50" },
  prepared: { label: "Eczaneye Hazır", color: "text-violet-600", bg: "bg-violet-50" },
  delivered: { label: "Teslim Edildi", color: "text-emerald-600", bg: "bg-emerald-50" },
  rejected: { label: "Reddedildi", color: "text-red-600", bg: "bg-red-50" },
};
  
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
const [selectedIds, setSelectedIds] = useState([]);
const [isSelectionMode, setIsSelectionMode] = useState(false);
const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const selectedRequestObjects = requests.filter((req) =>
  selectedIds.includes(req.id)
);

const canBulkApprove = selectedRequestObjects.every(
  (req) => req.status === "pending"
);

const canBulkReject = selectedRequestObjects.every(
  (req) => req.status === "pending"
);

const canBulkSendPharmacy = selectedRequestObjects.every(
  (req) => req.status === "approved"
);
  const [isRecording, setIsRecording] = useState(null);

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = filter === "all" || req.status === filter;
    const matchesSearch = (req.patientName + req.medicine).toLowerCase().includes(searchTerm.toLowerCase());
    return (
      matchesFilter &&
      matchesSearch &&
      req.status !== "delivered"
    );
  });

  const statusConfig = {
    pending: {
      label: "Bekliyor",
      color: "bg-amber-100 text-amber-700",
    },
    approved: {
      label: "Onaylandı",
      color: "bg-cyan-100 text-cyan-700",
    },
    prepared: {
      label: "Eczaneye Hazır",
      color: "bg-violet-100 text-violet-700",
    },
    delivered: {
      label: "Teslim Edildi",
      color: "bg-emerald-100 text-emerald-700",
    },
    rejected: {
      label: "Reddedildi",
      color: "bg-red-100 text-red-600",
    },
  };

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

const toggleSelect = (id) => {
  setSelectedIds((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
};
  return (
    <>
      <div className="min-h-screen max-w-[1400px] mx-auto space-y-8 pb-20 p-4 animate-in fade-in duration-700 relative bg-transparent">
        
        {/* 🌌 1: GELİŞMİŞ VE GARANTİLENMİŞ ARKA PLAN */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
          <div className="absolute inset-0" 
               style={{ 
                 opacity: 0.07,
                 backgroundImage: `linear-gradient(#6FA9B7 1.5px, transparent 1.5px), linear-gradient(90deg, #6FA9B7 1.5px, transparent 1.5px)`,
                 backgroundSize: '50px 50px' 
               }}>
          </div>
          <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-[#6FA9B7]/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[30%] -left-[10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] bg-emerald-50/30 rounded-full blur-[110px]" />
        </div>

        {/* 🛰 2: KENAR DETAYLARI */}
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
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/70 backdrop-blur-2xl p-3 rounded-[2.2rem] border border-white shadow-xl shadow-gray-200/20 relative z-30 overflow-visible">          <div className="flex p-1.5 bg-gray-200/50 rounded-[1.6rem] w-fit">
            {[
              { key: "all", label: "TÜMÜ" },
              { key: "pending", label: "BEKLİYOR" },
              { key: "approved", label: "ONAYLANDI" },
              { key: "prepared", label: "ECZANEYE HAZIR" },
              { key: "rejected", label: "REDDEDİLDİ" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-6 py-2.5 rounded-[1.3rem] text-[11px] font-black transition-all ${
                  filter === f.key ? "bg-white text-[#6FA9B7] shadow-lg" : "text-gray-500 hover:text-[#6FA9B7]"
                }`}
              >
                {f.label}
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
  <div className="relative">
    
    <button
      onClick={() => setBulkMenuOpen(!bulkMenuOpen)}
      className="
        flex items-center gap-2
        bg-[#6FA9B7]
        text-white
        px-5 py-2.5
        rounded-2xl
        font-bold text-xs
        shadow-lg shadow-[#6FA9B7]/20
      "
    >
      Toplu İşlem
      <ChevronDown size={16} />
    </button>

    {bulkMenuOpen && (
      <div
        className="
          absolute right-0 top-14
          w-64
          bg-white
          rounded-3xl
          border border-slate-100
          shadow-2xl
          p-3
          z-[999]
          flex flex-col gap-2
        "
      >

        <button
  disabled={!canBulkApprove}
  onClick={() => {
    selectedIds.forEach((id) => approveRequest(id));
    setSelectedIds([]);
    setIsSelectionMode(false);
    setBulkMenuOpen(false);
  }}
  className={`
    text-left px-4 py-3 rounded-2xl
    text-sm font-bold transition-all
    ${
      canBulkApprove
        ? "hover:bg-cyan-50 text-slate-700"
        : "text-gray-300 cursor-not-allowed"
    }
  `}
>
  ✓ Tümünü Onayla
</button>

        <button
  disabled={!canBulkReject}
  onClick={() => {
    selectedIds.forEach((id) => rejectRequest(id));
    setSelectedIds([]);
    setIsSelectionMode(false);
    setBulkMenuOpen(false);
  }}
  className={`
    text-left px-4 py-3 rounded-2xl
    text-sm font-bold transition-all
    ${
      canBulkReject
        ? "hover:bg-red-50 text-red-500"
        : "text-gray-300 cursor-not-allowed"
    }
  `}
>
  ✕ Tümünü Reddet
</button>

        <button
  disabled={!canBulkSendPharmacy}
  onClick={() => {
    selectedIds.forEach((id) => prepareRequest(id));
    setSelectedIds([]);
    setIsSelectionMode(false);
    setBulkMenuOpen(false);
  }}
  className={`
    text-left px-4 py-3 rounded-2xl
    text-sm font-bold transition-all
    ${
      canBulkSendPharmacy
        ? "hover:bg-violet-50 text-violet-600"
        : "text-gray-300 cursor-not-allowed"
    }
  `}
>
  ➜ Eczaneye Gönder
</button>

      </div>
    )}
  </div>
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
  onClick={() => {
    if (isSelectionMode) {
  toggleSelect(req.id);
}
    }
  }
  className={`
    group bg-white/90 backdrop-blur-md rounded-[2.8rem]
    border transition-all duration-300 cursor-pointer

    ${
      selectedIds.includes(req.id)
        ? "border-[#6FA9B7] shadow-2xl ring-4 ring-[#6FA9B7]/20 scale-[1.01]"
        : "border-white shadow-[0_10px_40px_rgb(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1"
    }
  `}
>
              <div className="p-7 flex items-center gap-8">
                {isSelectionMode &&  (
  <button
    onClick={(e) => {
  e.stopPropagation();
  toggleSelect(req.id);
}}
    className={`
      h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all
      ${
        selectedIds.includes(req.id)
          ? "bg-cyan-500 border-cyan-500 text-white shadow-lg"
          : "border-gray-300 bg-white"
      }
    `}
  >
    {selectedIds.includes(req.id) && "✓"}
  </button>
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
                        <Calendar size={10}/>
                        {req.id % 2 === 0 ? "12.04.2026" : "01.01.2025"}
                      </span>
                      {req.medicine.length > 8 && <span className="text-[9px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-lg border border-red-100">RİSKLİ ETKİLEŞİM</span>}
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-4 border-l border-gray-100 pl-10">
                  <div className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-[#6FA9B7] border-2 border-white shadow-sm"><User size={20} /></div>
                  <div>
                    <p className="text-sm font-black text-gray-800 tracking-wide">{req.patientName}</p>
                    <div className={`mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide w-fit ${statusConfig[req.status]?.color}`}>
                      {statusConfig[req.status]?.label}
                    </div>
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
                    onClick={() => {
                      setSelectedRequest(req);
                    }}
                    className={`p-3 rounded-xl transition-all ${expandedId === req.id ? 'bg-[#6FA9B7] text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                  >
                    <ChevronDown size={20} className={`transition-transform duration-300 ${expandedId === req.id ? 'rotate-180' : ''}`} />
                  </button>

                  {!isSelectionMode && (
                    <div className="flex gap-2 ml-4 border-l pl-5 border-gray-100">
                      {req.status === "pending" && (
                        <>
                          <button
                            onClick={() => approveRequest(req.id)}
                            className="h-12 px-8 bg-[#6FA9B7] text-white rounded-[1.2rem] font-black text-xs shadow-lg shadow-[#6FA9B7]/30 hover:brightness-110 active:scale-95 transition-all"
                          >
                            ONAYLA
                          </button>
                          <button
                            onClick={() => rejectRequest(req.id)}
                            className="h-12 w-12 bg-red-50 text-red-500 rounded-[1.2rem] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <XCircle size={22} />
                          </button>
                        </>
                      )}

                      {req.status === "approved" && (
                        <button
                          onClick={() => prepareRequest(req.id)}
                          className="h-12 px-8 bg-violet-500 text-white rounded-[1.2rem] font-black text-xs shadow-lg shadow-violet-200 hover:brightness-110 transition-all"
                        >
                          ECZANEYE GÖNDER
                        </button>
                      )}

                      {req.status === "prepared" && (
                        <div className="px-5 py-3 rounded-[1.2rem] bg-emerald-50 text-emerald-600 text-xs font-black tracking-wide border border-emerald-100">
                          ECZANE TESLİMİ BEKLENİYOR
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRequest && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 print:p-0">
    {/* Arka Plan Karartma */}
    <div 
      className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-300 print:hidden" 
      onClick={() => setSelectedRequest(null)} 
    />
    
    {/* Modal Gövdesi */}
    <div className="w-full max-w-[720px] bg-[#f0f7f9] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 relative z-10 overflow-hidden animate-in zoom-in-95 duration-300 print:shadow-none print:border-none print:bg-white print:rounded-none print:max-w-full">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#6FA9B7] shadow-sm print:border print:border-slate-100">
            <ClipboardList size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">E-Reçete Detayı</h2>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Dijital Sağlık Yönetim Sistemi v2.0</p>
          </div>
        </div>
        <button
          onClick={() => setSelectedRequest(null)}
          className="h-10 w-10 rounded-full bg-white text-slate-300 hover:text-red-500 transition-all flex items-center justify-center shadow-sm print:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* İçerik Alanı */}
      <div className="px-8 pb-4 grid grid-cols-2 gap-4">
        
        {/* Sol: Hasta Bilgileri */}
        <div className="bg-white/80 rounded-[1.8rem] p-6 border border-white shadow-sm h-full print:border-slate-200">
          <p className="text-[9px] font-black text-[#6FA9B7] uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
            <User size={10} /> HASTA BİLGİLERİ
          </p>
          <h3 className="text-2xl font-black text-slate-800 mb-4">{selectedRequest.patientName}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Tanı</span>
              <p className="text-xs font-bold text-slate-700 leading-tight">{selectedRequest.diagnosis || "Genel Kontrol"}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Kan Grubu</span>
              <p className="text-xs font-bold text-slate-700">{selectedRequest.bloodType || "A Rh(+)"}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Yaş / Cinsiyet</span>
              <p className="text-xs font-bold text-slate-700">{selectedRequest.age || "34"} / {selectedRequest.gender || "Erkek"}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Protokol No</span>
              <p className="text-xs font-bold text-slate-700">#P-177824</p>
            </div>
          </div>
        </div>

        {/* Sağ: Reçete Bilgileri */}
        <div className="bg-white/80 rounded-[1.8rem] p-6 border border-white shadow-sm print:border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">AKTİF REÇETE</p>
            </div>
            <span className="text-[9px] font-black text-[#6FA9B7] bg-[#6FA9B7]/5 px-2 py-0.5 rounded">RX-{selectedRequest.id}128372</span>
          </div>
          <h3 className="text-2xl font-black text-[#6FA9B7] mb-4">{selectedRequest.medicine}</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] py-1 border-b border-slate-50">
              <span className="font-bold text-slate-400">Durum</span>
              <span className={`font-black uppercase px-2 py-0.5 rounded-md ${modalStatusConfig[selectedRequest.status]?.color} ${modalStatusConfig[selectedRequest.status]?.bg}`}>
                {modalStatusConfig[selectedRequest.status]?.label || selectedRequest.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] py-1 border-b border-slate-50">
              <span className="font-bold text-slate-400">Doktor</span>
              <span className="font-bold text-slate-700">Dr. Ahmet Yılmaz</span>
            </div>
            <div className="flex items-center justify-between text-[10px] py-1">
              <span className="font-bold text-slate-400">Oluşturulma</span>
              <span className="font-bold text-slate-600">08.05.2026</span>
            </div>
          </div>
        </div>

        {/* Alt Satır: Uyarı ve QR */}
        <div className="col-span-2 grid grid-cols-5 gap-4">
          <div className="col-span-3 bg-orange-50/50 rounded-[1.5rem] p-5 border border-orange-100/50 flex items-start gap-3 print:bg-white print:border-orange-200">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
              <AlertTriangle size={16} />
            </div>
            <div>
              <p className="text-[9px] font-black text-orange-600/70 uppercase tracking-widest mb-1">KRİTİK UYARILAR</p>
              <p className="text-[11px] font-bold text-orange-800 leading-relaxed">
                {selectedRequest.warning || "Kritik etkileşim veya alerji uyarısı bulunmuyor."}
              </p>
            </div>
          </div>

          <div className="col-span-2 bg-white/80 rounded-[1.5rem] p-4 border border-white flex flex-col items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all group print:bg-white print:border-slate-200 print:hover:scale-100">
            <div className="bg-white p-1 rounded-lg">
               <QRCode 
                 size={60}
                 value={JSON.stringify({id: selectedRequest.id, p: selectedRequest.patientName, m: selectedRequest.medicine})}
                 viewBox={`0 0 256 256`}
                 style={{ height: "auto", maxWidth: "100%", width: "100%" }}
               />
            </div>
            <div className="text-center">
              <p className="text-[9px] font-black text-slate-800 uppercase tracking-tighter">DİJİTAL DOĞRULAMA</p>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">QR kodu eczaneye okutun</p>
            </div>
          </div>
        </div>

        {/* 💊 Kronik İlaçlar */}
        <div className="col-span-2 mt-2 pt-4 border-t border-slate-200/50 print:border-slate-100">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Takip Edilen İlaçlar</p>
          <div className="flex flex-wrap gap-2">
            {(selectedRequest.chronicMeds || ["Metformin", "Coraspin", "Ramipril"]).map((med, index) => (
              <span key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50/50 text-[#6FA9B7] rounded-full text-[10px] font-black border border-cyan-100 print:bg-white print:text-slate-500">
                <div className="w-1 h-1 rounded-full bg-[#6FA9B7] print:hidden" />
                {med}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer İşlem Çubuğu */}
      <div className="px-8 py-5 bg-white border-t border-slate-100 flex items-center justify-end gap-6 print:hidden">
         <button 
          onClick={() => setSelectedRequest(null)}
          className="text-[10px] font-black text-slate-400 hover:text-slate-600 transition-all uppercase tracking-widest"
         >
           KAPAT
         </button>
         <button 
          onClick={() => window.print()}
          className="px-6 py-3 bg-[#6FA9B7] text-white rounded-xl font-black text-[10px] shadow-md shadow-[#6FA9B7]/20 hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 uppercase tracking-widest"
         >
           <QrCode size={14} /> PDF OLARAK YAZDIR
         </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default DoctorRequestsPage;