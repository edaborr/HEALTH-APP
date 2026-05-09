import { useState } from "react";
import { Save, Lock, Moon } from "lucide-react";

const SettingsPage = () => {
  const [isNoBET, setIsNobet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  // 💾 KAYDETME FONKSİYONU
  const handleSave = () => {
    setLoading(true);
    // Simüle edilmiş kayıt süreci
    setTimeout(() => {
      setLoading(false);
      setShowStatus(true);
      // 3 saniye sonra başarı yazısını kaldır
      setTimeout(() => setShowStatus(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      
      {/* BAŞLIK */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tighter uppercase">
            Eczane Ayarları
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Sistem ve Profil Tercihleri
          </p>
        </div>
        
        {showStatus && (
          <div className="bg-emerald-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase animate-bounce">
            ✓ Ayarlar Kaydedildi
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-white dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-800 dark:text-white flex items-center gap-3">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Eczane Bilgileri
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Eczane Adı</label>
                <input type="text" defaultValue="Merkez Eczanesi" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Telefon</label>
                <input type="text" defaultValue="0212 555 00 00" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Adres Bilgisi</label>
                <textarea rows="2" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 resize-none font-sans">Atatürk Mah. Sağlık Sokak No:45/A Kadıköy/İstanbul</textarea>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-white dark:border-gray-800">
            <h3 className="text-lg font-black text-gray-800 dark:text-white flex items-center gap-3 mb-6">
              <span className="w-1.5 h-6 bg-rose-500 rounded-full"></span>
              Güvenlik Merkeziniz
            </h3>
            <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl group cursor-pointer hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-gray-900 rounded-xl text-rose-500 shadow-sm"><Lock size={20}/></div>
                <div>
                  <p className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight">Şifre İşlemleri</p>
                  <p className="text-[10px] font-bold text-gray-400">Şifrenizi güncellemek için tıklayın</p>
                </div>
              </div>
              <span className="text-rose-500 font-black text-[10px] uppercase tracking-widest mr-4">Değiştir</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-8 rounded-[2.5rem] transition-all duration-500 border ${isNoBET ? 'bg-emerald-600 text-white shadow-xl' : 'bg-white dark:bg-gray-900 border-white dark:border-gray-800 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-6">
              <Moon size={24} className={isNoBET ? 'text-white' : 'text-gray-400'} />
              <button 
                type="button"
                onClick={() => setIsNobet(!isNoBET)}
                className={`w-14 h-7 rounded-full relative transition-all duration-300 ${isNoBET ? 'bg-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 ${isNoBET ? 'bg-emerald-600 left-8' : 'bg-white left-1 shadow-md'}`} />
              </button>
            </div>
            <h4 className="text-lg font-black uppercase tracking-tight">Nöbetçi Modu</h4>
            <p className="text-[10px] font-bold uppercase mt-2 opacity-70 leading-relaxed font-sans">
              Modu değiştirdiğinizde sistem genelinde durumunuz güncellenir.
            </p>
          </div>

          <button 
            onClick={handleSave}
            disabled={loading}
            className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3
              ${loading ? 'bg-gray-400' : 'bg-blue-600 text-white shadow-blue-200 dark:shadow-none'}`}
          >
            {loading ? "Sistem Güncelleniyor..." : <><Save size={18} /> Ayarları Kaydet</>}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;