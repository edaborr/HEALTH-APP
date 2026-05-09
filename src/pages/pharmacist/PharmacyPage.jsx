import { useState } from "react";
import { useRequests } from "../../context/RequestContext";
import { Search, CheckCircle, XCircle, Clock, Calendar, Package } from "lucide-react";

const PharmacyPage = () => {
  const { requests } = useRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Hepsi");

  // Arama ve Filtreleme Mantığı
  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.medicineName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "Hepsi" || req.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      
      {/* 🟢 ÜST BAŞLIK */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tighter uppercase">
            Eczane İşlem Merkezi
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Reçete Geçmişi ve Stok Takibi
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input 
              type="text" 
              placeholder="Hasta veya ilaç ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-900 border-none shadow-sm text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>

          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-900 border-none shadow-sm text-xs font-black uppercase text-gray-500 outline-none cursor-pointer hover:bg-gray-50 transition-all"
          >
            <option value="Hepsi">Tüm İşlemler</option>
            <option value="Onaylandı">Onaylananlar</option>
            <option value="Reddedildi">Reddedilenler</option>
            <option value="Bekliyor">Bekleyenler</option>
          </select>
        </div>
      </div>

      {/* 🟢 İŞLEM GEÇMİŞİ TABLOSU */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-white dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Hasta / Alıcı</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Verilen İlaç</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Tarih</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-lg">👤</div>
                        <div>
                          <p className="font-black text-sm text-gray-800 dark:text-gray-200 uppercase tracking-tight">{req.patientName}</p>
                          <p className="text-[10px] font-bold text-gray-400 lowercase">{req.patientEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-black text-xs text-blue-600 dark:text-blue-400 uppercase italic">
                          {req.medicineName}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Sistem Kaydı: #{req.id.toString().slice(-5)}</span>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-gray-500 dark:text-gray-400">
                        <Calendar size={14} className="opacity-50" />
                        {req.date}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end italic">
                        {req.status === "Onaylandı" ? (
                          <span className="text-emerald-500 font-black text-[10px] uppercase">✓ Onaylandı</span>
                        ) : req.status === "Reddedildi" ? (
                          <span className="text-rose-500 font-black text-[10px] uppercase">✕ Reddedildi</span>
                        ) : (
                          <span className="text-amber-500 font-black text-[10px] uppercase">● Beklemede</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    Herhangi bir kayıt bulunamadı
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🟢 HIZLI STOK ÖZETİ (Dashboard'dan farklı bir görünüm) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-white dark:border-gray-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600"><Package size={24}/></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Toplam Stok Çeşitliliği</p>
              <h4 className="text-2xl font-black text-gray-800 dark:text-white">458 Kalem</h4>
            </div>
          </div>
          <button className="text-[10px] font-black text-blue-500 uppercase border-b-2 border-blue-500 pb-1">Envanter Aç</button>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-white dark:border-gray-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-rose-600">⚠️</div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kritik Seviyedeki İlaçlar</p>
              <h4 className="text-2xl font-black text-gray-800 dark:text-white">12 Ürün</h4>
            </div>
          </div>
          <button className="text-[10px] font-black text-rose-500 uppercase border-b-2 border-rose-500 pb-1">Sipariş Ver</button>
        </div>
      </div>

    </div>
  );
};

export default PharmacyPage;