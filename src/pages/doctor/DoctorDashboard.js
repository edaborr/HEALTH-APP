import React from 'react';
import { 
  CheckCircle2, MessageSquare, BookOpen, Activity, 
  Search, Bell, MoreVertical, Plus, Calendar as CalendarIcon,
  Users, ClipboardList, TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const istatistikVeri = [
  { ay: 'Oca', randevu: 25, acil: 45 }, { ay: 'Şub', randevu: 45, acil: 35 },
  { ay: 'Mar', randevu: 65, acil: 55 }, { ay: 'Nis', randevu: 40, acil: 20 },
  { ay: 'May', randevu: 60, acil: 40 },
];

const DoktorDashboard = () => {
  return (
    <div className="p-6 bg-[#E0F2F1] min-h-screen space-y-6 font-sans">
      
      {/* ÜST BİLGİ ÇUBUĞU */}
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-[#B2DFDB]">
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl w-96 border border-[#B2DFDB]">
          <Search size={18} className="text-[#00796B]" />
          <input type="text" placeholder="Hasta veya rapor ara..." className="bg-transparent outline-none text-sm w-full" />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2.5 bg-white text-[#00796B] rounded-xl hover:bg-[#B2DFDB] transition-all relative border border-[#B2DFDB]">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-[#B2DFDB]">
            <div className="text-right">
              <p className="text-xs font-black text-[#004D40] uppercase">Dr. Ahmet Yılmaz</p>
              <p className="text-[10px] font-bold text-[#00796B] uppercase tracking-tighter">Görevde • Aile Hekimi</p>
            </div>
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop" className="w-10 h-10 rounded-xl object-cover shadow-md border-2 border-[#B2DFDB]" alt="Doktor" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-black text-[#004D40] tracking-tight px-2">Hoş Geldiniz, Dr. Ahmet!</h1>

      {/* ANA PANEL YERLEŞİMİ */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* SOL KOLON: GÖREVLER VE TAKVİM */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* GÖREVLER KARTI */}
          <div className="bg-[#00796B] rounded-[32px] p-6 text-white shadow-xl shadow-[#00796B]/20 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="font-black text-lg flex items-center gap-2">Bekleyen Görevler <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs">12</span></h3>
              <button className="text-[10px] font-black uppercase opacity-80 hover:opacity-100 underline tracking-widest">TÜMÜNÜ GÖR</button>
            </div>
            <div className="space-y-3 relative z-10">
              {[
                { baslik: "Hasta Viziti", saat: "16:00", kod: "V", renk: "bg-[#4DB6AC]" },
                { baslik: "Laboratuvar Sonuçları", saat: "14:00", kod: "L", renk: "bg-[#80CBC4]" },
                { baslik: "Reçete Onayları", saat: "09:00", kod: "R", renk: "bg-[#26A69A]" }
              ].map((gorev, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-4 group cursor-pointer hover:bg-[#E0F2F1] transition-all">
                  <div className={`w-10 h-10 ${gorev.renk} rounded-xl flex items-center justify-center font-black text-white text-sm shadow-sm`}>{gorev.kod}</div>
                  <div className="flex-1">
                    <p className="text-[#004D40] font-black text-sm">{gorev.baslik}</p>
                    <p className="text-[#00796B]/60 text-[10px] font-bold uppercase tracking-tighter">{gorev.saat}</p>
                  </div>
                  <MoreVertical size={16} className="text-[#B2DFDB] group-hover:text-[#00796B]" />
                </div>
              ))}
            </div>
            <Activity className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12" />
          </div>

          {/* TAKVİM */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#B2DFDB]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-[#004D40]">Çalışma Takvimi</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#E0F2F1] text-[#00796B]">‹</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#E0F2F1] text-[#00796B]">›</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center">
              {['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'].map(d => <span key={d} className="text-[10px] font-black text-[#B2DFDB] uppercase">{d}</span>)}
              {[...Array(30)].map((_, i) => (
                <span key={i} className={`text-xs font-bold p-2 cursor-pointer transition-all ${i+1 === 6 ? 'bg-[#00796B] text-white rounded-xl shadow-lg' : 'text-[#004D40] hover:bg-[#E0F2F1]'}`}>{i+1}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ORTA KOLON: MESAJLAR VE GÜNCEL OKUMALAR */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* MESAJLAŞMA */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#B2DFDB] h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-[#004D40]">Son Mesajlar</h3>
              <button className="p-2 bg-[#E0F2F1] text-[#00796B] rounded-xl hover:bg-[#B2DFDB] transition-all"><Plus size={18} /></button>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2 scrollbar-hide flex-1">
              {[
                { ad: "Hemşire Elif", mesaj: "204 nolu hasta stabil.", saat: "16:45" },
                { ad: "Dr. Selin Demir", mesaj: "Konsültasyon raporu hazır.", saat: "15:20" },
                { ad: "Ecz. Murat", mesaj: "İlaç stok güncellemesi hakkında...", saat: "14:10" }
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 hover:bg-[#E0F2F1]/50 rounded-2xl transition-all cursor-pointer border-b border-[#F5F5F5] last:border-none">
                  <div className="w-11 h-11 rounded-xl bg-[#B2DFDB] border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-[#00796B] font-black">
                    {m.ad[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-black text-[#004D40]">{m.ad}</p>
                      <span className="text-[9px] font-bold text-[#00796B]/50">{m.saat}</span>
                    </div>
                    <p className="text-[11px] text-[#00796B] truncate italic">"{m.mesaj}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GÜNLÜK OKUMA (Görseldeki Makale Bölümü) */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#B2DFDB] space-y-4 group cursor-pointer">
             <div className="flex items-center gap-2 text-[#00796B]">
               <BookOpen size={18} />
               <h3 className="font-black text-[#004D40]">Tıbbi Makaleler</h3>
             </div>
             <div className="relative h-40 rounded-2xl overflow-hidden shadow-inner">
               <img src="https://images.unsplash.com/photo-1576091160550-2173bc999565?w=500" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="medical" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#004D40]/90 to-transparent flex items-end p-4">
                 <p className="text-white text-xs font-bold leading-snug">Yeni nesil antibiyotik kullanımında dikkat edilmesi gerekenler.</p>
               </div>
             </div>
          </div>
        </div>

        {/* SAĞ KOLON: İSTATİSTİKLER VE HASTA SAYILARI */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* VERİ ANALİZİ */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#B2DFDB]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-[#004D40]">İstatistikler</h3>
              <select className="text-[10px] font-black border-none outline-none bg-[#E0F2F1] p-1.5 rounded-lg text-[#00796B]">
                <option>Son 6 Ay</option>
              </select>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={istatistikVeri}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0F2F1" />
                  <XAxis dataKey="ay" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#80CBC4'}} />
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Line type="monotone" dataKey="acil" stroke="#00796B" strokeWidth={4} dot={{r: 4, fill: '#00796B', strokeWidth: 2, stroke: '#fff'}} />
                  <Line type="monotone" dataKey="randevu" stroke="#4DB6AC" strokeWidth={4} dot={{r: 4, fill: '#4DB6AC', strokeWidth: 2, stroke: '#fff'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
               <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#00796B] rounded-full"></span> <span className="text-[10px] font-black text-[#80CBC4] uppercase tracking-widest">Acil Giriş</span></div>
               <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#4DB6AC] rounded-full"></span> <span className="text-[10px] font-black text-[#80CBC4] uppercase tracking-widest">Randevulu</span></div>
            </div>
          </div>

          {/* ÖZET KARTLARI */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#00796B] rounded-[28px] p-5 text-white shadow-lg shadow-[#00796B]/20 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <p className="text-[10px] font-black uppercase opacity-80 leading-tight">Yeni<br/>Kayıtlar</p>
                <Users size={18} className="opacity-50" />
              </div>
              <div>
                <h4 className="text-2xl font-black mb-1">40</h4>
                <p className="text-[10px] font-bold bg-white/20 w-fit px-2 py-0.5 rounded-full">%51 Artış</p>
              </div>
            </div>

            <div className="bg-[#80CBC4] rounded-[28px] p-5 text-white shadow-lg shadow-[#80CBC4]/20 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <p className="text-[10px] font-black uppercase opacity-80 leading-tight">Kronik<br/>Hastalar</p>
                <ClipboardList size={18} className="opacity-50" />
              </div>
              <div>
                <h4 className="text-2xl font-black mb-1">22</h4>
                <p className="text-[10px] font-bold bg-white/20 w-fit px-2 py-0.5 rounded-full">%32 Takip</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoktorDashboard;