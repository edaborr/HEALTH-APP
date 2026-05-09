import { useState } from "react";
import { 
  Search, 
  Plus, 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  ArrowUpDown,
  Edit3,
  Trash2
} from "lucide-react";

const InventoryPage = () => {
  // Veri setinden fiyat (price) kaldırıldı
  const [inventory, setInventory] = useState([
    { id: 1, name: "Parol 500mg", category: "Analjezik", stock: 15, unit: "Kutu", status: "Kritik" },
    { id: 2, name: "Augmentin BID", category: "Antibiyotik", stock: 85, unit: "Kutu", status: "Normal" },
    { id: 3, name: "Arveles 25mg", category: "Ağrı Kesici", stock: 120, unit: "Tablet", status: "Yüksek" },
    { id: 4, name: "Coraspin 100mg", category: "Kan Sulandırıcı", stock: 8, unit: "Kutu", status: "Kritik" },
    { id: 5, name: "Ventolin Şurup", category: "Solunum", stock: 42, unit: "Şişe", status: "Normal" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Backend entegrasyonu yapacağın yer burası olacak
  const handleAddNewMedicine = () => {
    alert("Backend bağlantısı yapıldığında burada bir form açılacak.");
    console.log("Yeni ilaç ekleme isteği gönderildi.");
  };

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      
      {/* ÜST AKSİYON ÇUBUĞU */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tighter uppercase">
            İlaç Envanteri
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Depo Stok Takip Sistemi
          </p>
        </div>

        <button 
          onClick={handleAddNewMedicine}
          className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
        >
          <Plus size={18} /> Yeni İlaç Kaydı
        </button>
      </div>

      {/* STOK ÖZET KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-white dark:border-gray-800 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-2xl">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-gray-800 dark:text-white">2 Ürün</h4>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kritik Stok</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-white dark:border-gray-800 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-2xl">
            <Package size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-black">{inventory.length} Kalem</h4>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kayıtlı İlaç</p>
          </div>
        </div>
      </div>

      {/* ENVANTER TABLOSU */}
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-white dark:border-gray-800 overflow-hidden">
        <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input 
              type="text" 
              placeholder="İlaç ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/50 dark:bg-gray-800/30">
                <th className="p-8">İlaç / Kategori</th>
                <th className="p-8 text-center">Stok</th>
                <th className="p-8 text-center">Durum</th>
                <th className="p-8 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-700 font-sans font-bold">💊</div>
                      <div>
                        <p className="font-black text-gray-800 dark:text-gray-100 text-sm uppercase">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <span className="text-sm font-black text-gray-700 dark:text-gray-300">{item.stock}</span>
                    <span className="text-[10px] font-bold text-gray-400 ml-1 uppercase">{item.unit}</span>
                  </td>
                  <td className="p-8">
                    <div className="flex justify-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        item.status === "Kritik" 
                        ? "bg-rose-50 text-rose-500 border-rose-100 dark:bg-rose-900/20" 
                        : "bg-blue-50 text-blue-500 border-blue-100 dark:bg-blue-900/20"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-xl hover:text-blue-500">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-xl hover:text-rose-500">
                        <Trash2 size={16} />
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

export default InventoryPage;