import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

const TaskPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Örnek Görev Verileri
  const tasks = [
    { id: 1, title: "Ali Yılmaz - Kontrol", time: "09:00", type: "muayene", day: 19 },
    { id: 2, title: "Laboratuvar Sonuç Analizi", time: "11:30", type: "analiz", day: 19 },
    { id: 3, title: "Eczacı Toplantısı", time: "14:00", type: "toplantı", day: 21 },
    { id: 4, title: "Rapor Onaylamaları", time: "16:45", type: "admin", day: 23 },
  ];

  const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  
  // Takvim günlerini oluşturma (Basit bir 30 günlük görünüm)
  const calendarDays = Array.from({ length: 35 }, (_, i) => i - 3); 

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 space-y-6 animate-in fade-in duration-500">
      
      {/* 🚀 ÜST NAVİGASYON (Görsel 2'deki gibi Sekmeli Yapı) */}
      <div className="bg-white rounded-[24px] p-2 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex gap-2">
          {["Görev Panosu", "Zaman Çizelgesi", "Takvim", "Raporlar"].map((tab, i) => (
            <button 
              key={tab}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === "Takvim" 
                ? "bg-[#64A5A5] text-white shadow-md shadow-[#64A5A5]/20" 
                : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 bg-[#F0F7F7] text-[#64A5A5] px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#DDECEC] transition-all">
          <Plus size={18} /> Yeni Görev
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* 📅 SOL TARAF: TAKVİM ANA GÖVDE */}
        <div className="col-span-12 lg:col-span-9 bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          {/* Takvim Başlığı */}
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Cumartesi, 19 Kasım
            </h2>
            <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-2xl">
              <button className="p-2 hover:bg-white rounded-xl shadow-sm transition-all"><ChevronLeft size={20}/></button>
              <span className="text-sm font-bold px-4 text-slate-600">Bugün</span>
              <button className="p-2 hover:bg-white rounded-xl shadow-sm transition-all"><ChevronRight size={20}/></button>
            </div>
          </div>

          {/* Takvim Izgarası */}
          <div className="grid grid-cols-7 border-b border-slate-50">
            {days.map(day => (
              <div key={day} className="py-4 text-center text-[11px] font-black text-slate-400 uppercase tracking-[2px]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
            {calendarDays.map((day, i) => (
              <div 
                key={i} 
                className={`border-r border-b border-slate-50 p-3 hover:bg-slate-50/50 transition-all relative ${
                  day === 19 ? 'bg-blue-50/30' : ''
                }`}
              >
                <span className={`text-sm font-bold ${
                  day <= 0 || day > 30 ? 'text-slate-200' : 'text-slate-500'
                } ${day === 19 ? 'text-[#64A5A5] bg-white w-7 h-7 flex items-center justify-center rounded-lg shadow-sm' : ''}`}>
                  {day > 0 && day <= 30 ? day : ''}
                </span>

                {/* Gün içindeki Görevler */}
                <div className="mt-2 space-y-1">
                  {tasks.filter(t => t.day === day).map(task => (
                    <div 
                      key={task.id}
                      className="group cursor-pointer p-2 bg-[#64A5A5] text-white rounded-lg text-[10px] font-bold shadow-sm hover:scale-[1.02] transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <span className="truncate">{task.title}</span>
                      </div>
                      <span className="text-[9px] opacity-80">{task.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 SAĞ TARAF: ANALİZ VE LİSTE */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          {/* Görev Analizi Kartı */}
          <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <Clock size={20} className="text-[#64A5A5]" /> Görev Analizi
            </h3>
            <div className="space-y-6">
              {[
                { label: "Bekleyenler", val: 45, color: "bg-amber-400" },
                { label: "İşlemde", val: 30, color: "bg-blue-400" },
                { label: "Tamamlanan", val: 25, color: "bg-emerald-400" }
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500 uppercase tracking-wider">{item.label}</span>
                    <span className="text-slate-800">%{item.val}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hızlı Hatırlatma Görsel 2'deki gibi */}
          <div className="bg-gradient-to-br from-[#64A5A5] to-[#4D8080] rounded-[32px] p-6 text-white shadow-lg shadow-[#64A5A5]/20">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-black mb-2">Hızlı Hatırlatma</h3>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
              Bugün tamamlanması gereken 3 öncelikli göreviniz var.
            </p>
            <button className="w-full py-3 bg-white text-[#64A5A5] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
              Takvimi Görüntüle
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TaskPage;