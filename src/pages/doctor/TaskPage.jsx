import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock,
  AlertCircle,
  X,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';

const TaskPage = () => {
  // --- STATE YÖNETİMİ ---
  const [activeTab, setActiveTab] = useState("Görev Panosu");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", time: "09:00", day: 19, status: "Bekleyenler" });
  
  const [tasks, setTasks] = useState([
    { id: 1, title: "Ali Yılmaz - Kontrol", time: "09:00", type: "muayene", day: 19, status: "Bekleyenler" },
    { id: 2, title: "Laboratuvar Sonuç Analizi", time: "11:30", type: "analiz", day: 19, status: "İşlemde" },
    { id: 3, title: "Eczacı Toplantısı", time: "14:00", type: "toplantı", day: 21, status: "Bekleyenler" },
    { id: 4, title: "Rapor Onaylamaları", time: "16:45", type: "admin", day: 23, status: "Tamamlanan" },
  ]);

  // --- FONKSİYONLAR ---
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.day) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setShowAddModal(false);
      setNewTask({ title: "", time: "09:00", day: 19, status: "Bekleyenler" });
    }
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const calendarDays = Array.from({ length: 35 }, (_, i) => i - 3); 

  // --- ALT BİLEŞEN: GÖREV PANOSU (KANBAN) ---
  const TaskBoard = () => {
    const statuses = ["Bekleyenler", "İşlemde", "Tamamlanan"];
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
        {statuses.map(status => (
          <div key={status} className="bg-slate-50/50 rounded-[32px] p-4 min-h-[600px] border border-slate-100/50">
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[2px] flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  status === "Bekleyenler" ? "bg-amber-400" : 
                  status === "İşlemde" ? "bg-blue-400" : "bg-emerald-400"
                }`} />
                {status}
              </h3>
              <span className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-slate-400 shadow-sm border border-slate-100 font-mono">
                {tasks.filter(t => (t.status || "Bekleyenler") === status).length}
              </span>
            </div>
            <div className="space-y-4">
              {tasks.filter(t => (t.status || "Bekleyenler") === status).map(task => (
                <div key={task.id} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 group hover:border-[#64A5A5]/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-[#F0F7F7] text-[#64A5A5]">
                      {task.type || "Genel"}
                    </span>
                    <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={16}/></button>
                  </div>
                  <h4 className="text-sm font-bold text-slate-700 mb-4">{task.title}</h4>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-slate-400 font-mono">
                      <Clock size={12} />
                      <span className="text-[10px] font-bold">{task.time}</span>
                    </div>
                    <div className="flex gap-1">
                      {status !== "İşlemde" && status !== "Tamamlanan" && (
                        <button onClick={() => moveTask(task.id, "İşlemde")} className="p-1.5 hover:bg-blue-50 text-blue-400 rounded-lg transition-colors">
                          <Clock size={14} />
                        </button>
                      )}
                      {status !== "Tamamlanan" && (
                        <button onClick={() => moveTask(task.id, "Tamamlanan")} className="p-1.5 hover:bg-emerald-50 text-emerald-400 rounded-lg transition-colors">
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // --- ALT BİLEŞEN: ZAMAN ÇİZELGESİ (TIMELINE) ---
  const TimelineBoard = () => {
    const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
    
    return (
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 animate-in fade-in duration-500">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-black text-slate-800">Günlük Akış</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">19 Kasım, Cumartesi</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase">Aktif Görevler</span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Zaman Çizgisi Sol Bar */}
          <div className="absolute left-[80px] top-0 bottom-0 w-px bg-slate-100" />

          <div className="space-y-2">
            {hours.map((hour) => {
              const currentTasks = tasks.filter(t => t.day === 19 && t.time.startsWith(hour.split(":")[0]));
              
              return (
                <div key={hour} className="flex min-h-[100px] group">
                  {/* Saat Kısmı */}
                  <div className="w-[80px] pt-1 pr-4 text-right">
                    <span className="text-xs font-black text-slate-400 font-mono tracking-tighter">{hour}</span>
                  </div>

                  {/* Görev Kartları Alanı */}
                  <div className="flex-1 pl-8 pb-4 relative">
                    {/* Nokta Göstergesi */}
                    <div className="absolute left-[-4.5px] top-2.5 w-2 h-2 rounded-full bg-white border-2 border-slate-200 group-hover:border-[#64A5A5] transition-colors z-10" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentTasks.length > 0 ? (
                        currentTasks.map(task => (
                          <div key={task.id} className={`p-4 rounded-[20px] border flex flex-col justify-between transition-all hover:shadow-lg ${
                            task.status === "Tamamlanan" 
                            ? "bg-emerald-50/30 border-emerald-100" 
                            : "bg-white border-slate-100 shadow-sm"
                          }`}>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-bold text-slate-700">{task.title}</h4>
                              <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${
                                task.status === "İşlemde" ? "bg-blue-100 text-blue-500" : "bg-slate-100 text-slate-400"
                              }`}>
                                {task.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-[#64A5A5] font-mono">
                              <Clock size={12} />
                              {task.time}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="h-px w-full bg-slate-50 mt-4 self-start" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 space-y-6 animate-in fade-in duration-500 font-sans">
      
      {/* 🚀 ÜST NAVİGASYON */}
      <div className="bg-white rounded-[24px] p-2 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex gap-2">
          {["Görev Panosu", "Zaman Çizelgesi", "Takvim", "Raporlar"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab 
                ? "bg-[#64A5A5] text-white shadow-md shadow-[#64A5A5]/20" 
                : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#F0F7F7] text-[#64A5A5] px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#DDECEC] transition-all"
        >
          <Plus size={18} /> Yeni Görev
        </button>
      </div>

      {/* SEKME İÇERİĞİ KONTROLÜ */}
      {activeTab === "Görev Panosu" ? (
        <TaskBoard />
      ) : activeTab === "Zaman Çizelgesi" ? (
        <TimelineBoard />
      ) : activeTab === "Takvim" ? (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9 bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Cumartesi, 19 Kasım</h2>
              <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-2xl">
                <button className="p-2 hover:bg-white rounded-xl shadow-sm transition-all"><ChevronLeft size={20}/></button>
                <button className="text-sm font-bold px-4 text-slate-600 hover:text-[#64A5A5]">Bugün</button>
                <button className="p-2 hover:bg-white rounded-xl shadow-sm transition-all"><ChevronRight size={20}/></button>
              </div>
            </div>
            <div className="grid grid-cols-7 border-b border-slate-50">
              {days.map(day => <div key={day} className="py-4 text-center text-[11px] font-black text-slate-400 uppercase tracking-[2px]">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
              {calendarDays.map((day, i) => (
                <div key={i} className={`border-r border-b border-slate-50 p-3 hover:bg-slate-50/50 transition-all relative ${day === 19 ? 'bg-blue-50/10' : ''}`}>
                  <span className={`text-sm font-bold ${day <= 0 || day > 30 ? 'text-slate-200' : 'text-slate-500'} ${day === 19 ? 'text-[#64A5A5] bg-white w-7 h-7 flex items-center justify-center rounded-lg shadow-md border border-slate-50' : ''}`}>
                    {day > 0 && day <= 30 ? day : ''}
                  </span>
                  <div className="mt-2 space-y-1">
                    {tasks.filter(t => t.day === day).map(task => (
                      <div key={task.id} className="group cursor-pointer p-2 bg-[#64A5A5] text-white rounded-lg text-[10px] font-bold shadow-sm truncate">{task.title}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* SAĞ ANALİZ PANELİ */}
          <div className="col-span-12 lg:col-span-3 space-y-6 text-slate-800 font-sans">
             <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black mb-6 flex items-center gap-2"><Clock size={20} className="text-[#64A5A5]" /> Görev Analizi</h3>
                <div className="space-y-6">
                  {["Bekleyenler", "İşlemde", "Tamamlanan"].map(s => (
                    <div key={s} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black">
                         <span className="text-slate-400 uppercase tracking-wider">{s}</span>
                         <span>{tasks.filter(t => (t.status || "Bekleyenler") === s).length * 25}%</span>
                       </div>
                       <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className={`h-full transition-all duration-1000 ${s === "Bekleyenler" ? "bg-amber-400" : s === "İşlemde" ? "bg-blue-400" : "bg-emerald-400"}`} style={{width: `${tasks.filter(t => (t.status || "Bekleyenler") === s).length * 25}%`}}></div>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="h-[600px] bg-white rounded-[32px] flex items-center justify-center border-2 border-dashed border-slate-100">
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300"><CalendarIcon size={40} /></div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">"{activeTab}" Sayfası Hazırlanıyor</p>
          </div>
        </div>
      )}

      {/* ➕ MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800 font-sans">Yeni Görev Oluştur</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Başlık</label>
                <input required className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 font-sans">Saat</label>
                  <input type="time" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none text-sm font-mono font-bold" value={newTask.time} onChange={(e) => setNewTask({...newTask, time: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Gün</label>
                  <input type="number" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold" value={newTask.day} onChange={(e) => setNewTask({...newTask, day: parseInt(e.target.value)})} />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-[#64A5A5] text-white rounded-2xl font-black text-sm uppercase tracking-widest mt-4 shadow-lg shadow-[#64A5A5]/20 font-sans">Kaydet</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;