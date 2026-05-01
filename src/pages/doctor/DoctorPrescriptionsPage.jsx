import { useRequests } from "../../context/RequestContext";
import { useState } from "react";
import { 
  FileText, Search, Calendar, Copy, 
  Send, ExternalLink, CheckCircle2, AlertTriangle, 
  Filter, Download, User, Info, Pill, Clock, X 
} from "lucide-react";
import { patients, commonMeds } from "../../data/patients";

const DoctorPrescriptionsPage = () => {
  const { requests } = useRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Hepsi"); // Filtre durumu
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Filtreleme Seçenekleri
  const filterOptions = ["Hepsi", "Antibiyotik", "Ağrı Kesici", "Kronik", "Normal Reçete"];

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
      
      // Filtreleme Mantığı
      if (activeFilter === "Hepsi") return matchesSearch;
      if (activeFilter === "Normal Reçete") return matchesSearch; // Örnek mantık
      return matchesSearch && res.medDetail?.category === activeFilter;
    });

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert("Reçete kodu kopyalandı: " + code);
  };

  return (
    <div className="min-h-screen w-full space-y-8 p-6 animate-in fade-in duration-700 bg-[#F4F7F9]">
      
      {/* 🧾 ÜST BAŞLIK ALANI */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-[#1E293B] tracking-tight">Reçete Arşivi</h1>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#64A5A5] rounded-full animate-pulse"></span>
            {activeFilter !== "Hepsi" ? `${activeFilter} kategorisinde ` : ""}toplam {prescriptions.length} dijital reçete listeleniyor
          </p>
        </div>
        <div className="flex gap-3 relative">
          {/* ÇALIŞAN FİLTRELE BUTONU */}
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-[13px] transition-all shadow-sm border ${
              showFilterMenu || activeFilter !== "Hepsi" 
              ? "bg-[#64A5A5] text-white border-[#64A5A5]" 
              : "bg-white text-[#64A5A5] border-slate-200 hover:border-[#64A5A5]/30"
            }`}
          >
            <Filter size={18} /> {activeFilter === "Hepsi" ? "Filtrele" : activeFilter}
          </button>

          {/* FİLTRE DROP-DOWN MENÜ */}
          {showFilterMenu && (
            <div className="absolute top-14 right-0 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center px-3 py-2 border-b border-slate-50 mb-1">
                <span className="text-[11px] font-black text-slate-400 uppercase">Kategori Seç</span>
                <X size={14} className="text-slate-300 cursor-pointer" onClick={() => setShowFilterMenu(false)} />
              </div>
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setActiveFilter(opt);
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold transition-colors ${
                    activeFilter === opt ? "bg-[#F0F7F7] text-[#64A5A5]" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          <button className="flex items-center gap-2 px-5 py-3 bg-[#0077B6] rounded-2xl font-bold text-[13px] text-white shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all">
            <Download size={18} /> Excel Çıktısı
          </button>
        </div>
      </div>

      {/* 🔍 AKILLI ARAMA */}
      <div className="relative max-w-xl group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#64A5A5] transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Hasta adı, ilaç veya tanı ara..." 
          className="w-full pl-14 pr-6 py-4 bg-white rounded-[20px] border-none shadow-sm outline-none focus:ring-4 focus:ring-[#64A5A5]/10 transition-all text-[15px] font-medium placeholder:text-slate-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 📑 MODERN REÇETE TABLOSU */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Hasta ve Klinik Tanı</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Tedavi Detayı (Doz/Periyot)</th>
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
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-[#64A5A5] font-bold shadow-inner">
                        {res.patientName[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold text-slate-800">{res.patientName}</p>
                          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md font-bold text-slate-500 italic">
                            {res.patientDetail?.age} Yaş, {res.patientDetail?.gender}
                          </span>
                        </div>
                        <p className="text-[12px] font-bold text-[#64A5A5]/80 mt-0.5">
                          {res.patientDetail?.diagnosis} 
                          <span className="ml-2 text-[10px] text-slate-400 font-medium bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                            {res.patientDetail?.diagnosis.includes("Hipertansiyon") ? "ICD-10: I10" : "ICD-10: E11"}
                          </span>
                        </p>
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
                        <span className="text-[11px] font-black bg-[#E6F0F0] text-[#3D8B8B] px-2 py-0.5 rounded-lg border border-[#D1E5E5]">
                          {res.medDetail?.defaultDosage || "500mg"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={12}/> {res.medDetail?.frequency || "1x1"}</span>
                        <span className="flex items-center gap-1"><Info size={12}/> {res.medDetail?.instruction || "Tok Karnına"}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" title="Normal Reçete"></div>
                        <code className="bg-[#0077B6] text-white px-3 py-1.5 rounded-xl text-xs font-black tracking-[0.2em] shadow-lg shadow-blue-100">
                          {res.id.toString().padStart(6, '0').toUpperCase()}
                        </code>
                        <button 
                          onClick={() => copyToClipboard(res.id)}
                          className="p-2 text-slate-300 hover:text-[#64A5A5] hover:bg-[#64A5A5]/5 rounded-lg transition-all"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                        {new Date(res.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-[#3D8B8B] bg-[#E6F0F0] border border-[#D1E5E5] px-3 py-1.5 rounded-xl w-fit uppercase tracking-tighter">
                        <CheckCircle2 size={12} /> Eczaneye Hazır
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 pl-1 italic">
                        Onaylandı: {new Date(res.createdAt).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-3 bg-white text-slate-400 rounded-2xl border border-slate-100 hover:text-[#64A5A5] hover:border-[#64A5A5]/30 shadow-sm transition-all group-hover:scale-110">
                        <Send size={18} />
                      </button>
                      <button className="p-3 bg-white text-slate-400 rounded-2xl border border-slate-100 hover:text-[#0F172A] hover:border-slate-300 shadow-sm transition-all">
                        <ExternalLink size={18} />
                      </button>
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