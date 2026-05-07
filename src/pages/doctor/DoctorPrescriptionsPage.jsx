import { useRequests } from "../../context/RequestContext";
import { useState } from "react";
import { 
  Search, Calendar, Copy, Send, ExternalLink, 
  CheckCircle2, AlertTriangle, Filter, Download, 
  Info, Pill, Clock, X 
} from "lucide-react";
import { patients, commonMeds } from "../../data/patients";

const DoctorPrescriptionsPage = () => {
  const { requests } = useRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("Tümü");
  const [activeFilter, setActiveFilter] = useState("Hepsi");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filterOptions = ["Hepsi", "Antibiyotik", "Ağrı Kesici", "Kronik", "Normal Reçete"];
  const dateFilters = ["Son 7 Gün", "Son 1 Ay", "Son 1 Yıl", "Tümü"];

  const prescriptions = requests
    .filter(req => req.status === 'approved')
    .map(req => {
      const patientDetail = patients.find(p => p.name === req.patientName);
      const medDetail = commonMeds.find(m => m.name === req.medicine);
      return { ...req, patientDetail, medDetail };
    })
    .filter(res => {
      const matchesSearch = res.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           res.medicine.toLowerCase().includes(searchTerm.toLowerCase());
      const createdDate = new Date(res.createdAt);
      const now = new Date();
      const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);

      let matchesDate = true;
      if (startDate && endDate) {
        const selectedDate = new Date(res.createdAt);
        matchesDate = selectedDate >= new Date(startDate) && selectedDate <= new Date(endDate);
      } else if (dateFilter === "Son 7 Gün") matchesDate = diffDays <= 7;
      else if (dateFilter === "Son 1 Ay") matchesDate = diffDays <= 30;
      else if (dateFilter === "Son 1 Yıl") matchesDate = diffDays <= 365;

      if (activeFilter === "Hepsi") return matchesSearch && matchesDate;
      return matchesSearch && matchesDate && res.medDetail?.category === activeFilter;
    });

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert("Reçete kodu kopyalandı: " + code);
  };

  return (
    <div className="min-h-screen w-full space-y-8 p-6 animate-in fade-in duration-700 bg-[#F4F7F9]">
      
      {/* 🧾 ÜST BAŞLIK VE ARAÇLAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* SOL: Başlık */}
        <div>
          <h1 className="text-4xl font-black text-[#1E293B] tracking-tight">Reçete Arşivi</h1>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#64A5A5] rounded-full animate-pulse"></span>
            {activeFilter !== "Hepsi" ? `${activeFilter} kategorisinde ` : ""}toplam {prescriptions.length} dijital reçete
          </p>
        </div>

        {/* SAĞ: Araç Çubuğu (Sıralama: Arama - Zaman - Filtre - Excel) */}
        <div className="flex flex-wrap items-center gap-3 relative">
          
          {/* 1. ARAMA ÇUBUĞU */}
          <div className="relative w-[280px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#64A5A5] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Hasta, ilaç veya tanı..." 
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm outline-none focus:ring-4 focus:ring-[#64A5A5]/10 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 2. ZAMAN ARALIĞI */}
          <div className="relative">
            <button
              onClick={() => { setShowDateMenu(!showDateMenu); setShowFilterMenu(false); }}
              className="bg-white border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold text-slate-600 flex items-center gap-2 shadow-sm hover:border-[#64A5A5]/40 transition-all"
            >
              <Calendar size={18} className="text-[#64A5A5]" /> Zaman Aralığı
            </button>
            {showDateMenu && (
              <div className="absolute top-14 right-0 z-50 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 space-y-2">
                {dateFilters.map((f) => (
                  <button key={f} onClick={() => { setDateFilter(f); setShowDateMenu(false); }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${dateFilter === f ? "bg-[#64A5A5] text-white" : "text-slate-500 hover:bg-slate-50"}`}>
                    {f}
                  </button>
                ))}
                <div className="border-t pt-3 mt-1 space-y-2">
                   <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none" />
                   <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none" />
                </div>
              </div>
            )}
          </div>

          {/* 3. FİLTRELE */}
          <div className="relative">
            <button 
              onClick={() => { setShowFilterMenu(!showFilterMenu); setShowDateMenu(false); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm border ${showFilterMenu || activeFilter !== "Hepsi" ? "bg-[#64A5A5] text-white border-[#64A5A5]" : "bg-white text-[#64A5A5] border-slate-200"}`}
            >
              <Filter size={18} /> {activeFilter === "Hepsi" ? "Filtrele" : activeFilter}
            </button>
            {showFilterMenu && (
              <div className="absolute top-14 right-0 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center px-3 py-2 border-b border-slate-50 mb-1 text-[10px] font-black text-slate-400 uppercase">Kategori Seç <X size={14} className="cursor-pointer" onClick={() => setShowFilterMenu(false)} /></div>
                {filterOptions.map((opt) => (
                  <button key={opt} onClick={() => { setActiveFilter(opt); setShowFilterMenu(false); }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeFilter === opt ? "bg-[#F0F7F7] text-[#64A5A5]" : "text-slate-600 hover:bg-slate-50"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. EXCEL ÇIKTISI */}
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0077B6] rounded-2xl font-bold text-sm text-white shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all">
            <Download size={18} /> Excel Çıktısı
          </button>
        </div>
      </div>

      {/* 📑 TABLO VERİLERİ */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Hasta ve Klinik Tanı</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Tedavi Detayı</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">E-Reçete No</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Durum</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {prescriptions.map((res) => (
                <tr key={res.id} className="group hover:bg-[#F0F7F7] transition-all cursor-default">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-[#64A5A5] font-bold shadow-inner">{res.patientName[0]}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold text-slate-800">{res.patientName}</p>
                          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md font-bold text-slate-500 italic">{res.patientDetail?.age} Yaş, {res.patientDetail?.gender}</span>
                        </div>
                        <p className="text-[12px] font-bold text-[#64A5A5]/80 mt-0.5">{res.patientDetail?.diagnosis}</p>
                        {res.patientDetail?.allergies.length > 0 && (
                          <div className="flex items-center gap-1 text-[10px] text-[#EF4444] font-black mt-1 uppercase tracking-tighter">
                            <AlertTriangle size={10} /> Alerji: {res.patientDetail.allergies.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Pill size={14} className="text-[#64A5A5]" />
                        <span className="font-bold text-slate-700">{res.medicine}</span>
                        <span className="text-[11px] font-black bg-[#E6F0F0] text-[#3D8B8B] px-2 py-0.5 rounded-lg border border-[#D1E5E5]">{res.medDetail?.defaultDosage || "500mg"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={12}/> {res.medDetail?.frequency || "1x1"}</span>
                        <span className="flex items-center gap-1"><Info size={12}/> {res.medDetail?.instruction || "Tok Karnına"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex flex-col items-center gap-1.5">
                      <div className="flex items-center gap-2">
                        <code className="bg-[#0077B6] text-white px-3 py-1.5 rounded-xl text-xs font-black tracking-[0.2em] shadow-lg shadow-blue-100">{res.id.toString().padStart(6, '0').toUpperCase()}</code>
                        <button onClick={() => copyToClipboard(res.id)} className="p-2 text-slate-300 hover:text-[#64A5A5] transition-all"><Copy size={14} /></button>
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase">06.05.2026</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-[#3D8B8B] bg-[#E6F0F0] border border-[#D1E5E5] px-3 py-1.5 rounded-xl w-fit uppercase tracking-tighter">
                      <CheckCircle2 size={12} /> Eczaneye Hazır
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-3 bg-white text-slate-400 rounded-2xl border border-slate-100 hover:text-[#64A5A5] transition-all"><Send size={18} /></button>
                      <button className="p-3 bg-white text-slate-400 rounded-2xl border border-slate-100 hover:text-[#0F172A] transition-all"><ExternalLink size={18} /></button>
                    </div>
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

export default DoctorPrescriptionsPage;