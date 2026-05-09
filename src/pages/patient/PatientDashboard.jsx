import { useState, useEffect, useMemo } from "react";
import { useRequests } from "../../context/RequestContext";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useTheme } from "../../context/ThemeContext";
import { useHealth } from "../../context/HealthContext"; // 🟢 3. ADIM: Context Importu


const PatientDashboard = () => {
  const { requests } = useRequests();
  const { user } = useAuth();
  const { notifications, markAllAsRead } = useNotifications();
  const { dark, toggleTheme } = useTheme();
  const { addRecord } = useHealth(); // 🟢 3. ADIM: Kayıt fonksiyonunu çağırdık

  const [showNotif, setShowNotif] = useState(false);

  // --- Sağlık Verileri ---
  const [water, setWater] = useState(4);
  const [bloodPressure, setBloodPressure] = useState({ high: "", low: "" });
  const [sugar, setSugar] = useState("");
  
  // --- Vücut Analizi State ---
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("180");

  // --- Dinamik Listeler (Ekleme/Silme İçin) ---
  const [tasks, setTasks] = useState([
    { id: 1, text: "Su iç", completed: false },
    { id: 2, text: "Sabah yürüyüşü", completed: false },
    { id: 3, text: "Tansiyon ölçümü", completed: false },
  ]);

  const [medicines, setMedicines] = useState([
    { id: 1, name: "Parol", time: "09:00", taken: false },
    { id: 2, name: "Vitamin D", time: "21:00", taken: true },
  ]);

  const [newTaskText, setNewTaskText] = useState("");
  const [newMed, setNewMed] = useState({ name: "", time: "" });

  // --- Randevular ---
  const appointments = [
    { id: 1, doctor: "Dr. Selim Yılmaz", clinic: "Kardiyoloji", date: "12 Mayıs", time: "14:30" },
    { id: 2, doctor: "Ecz. Merve Can", clinic: "İlaç Teslim", date: "Bugün", time: "17:00" },
  ];

  // --- EKLEME VE SİLME FONKSİYONLARI ---
  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText, completed: false }]);
    setNewTaskText("");
  };

  const handleAddMed = () => {
    if (!newMed.name || !newMed.time) return;
    setMedicines([...medicines, { id: Date.now(), ...newMed, taken: false }]);
    setNewMed({ name: "", time: "" });
  };

  // 🟢 3. ADIM: KAYDETME FONKSİYONLARI
  const handleSaveBP = () => {
    if (!bloodPressure.high || !bloodPressure.low) return;
    const status = getBloodPressureStatus()?.text || "Normal";
    addRecord("tansiyon", `${bloodPressure.high}/${bloodPressure.low}`, status);
    alert("Tansiyon değerleri günlüğe kaydedildi! ✅");
  };

  const handleSaveSugar = () => {
    if (!sugar) return;
    const status = getSugarStatus()?.text || "Normal";
    addRecord("seker", sugar, status);
    alert("Şeker değeri günlüğe kaydedildi! ✅");
  };

  const handleSaveWater = () => {
    addRecord("su", `${water} Bardak`, "İyi");
    alert("Su tüketimi günlüğe kaydedildi! 💧");
  };

  // --- ANALİZ VE SKOR HESAPLAMALARI ---
  const vki = useMemo(() => {
    const h = Number(height) / 100;
    const w = Number(weight);
    return h > 0 ? (w / (h * h)).toFixed(1) : 0;
  }, [weight, height]);

  const healthScore = useMemo(() => {
    const taskPoint = tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 40 : 0;
    const waterPoint = (water / 12) * 30;
    const medPoint = medicines.length > 0 ? (medicines.filter(m => m.taken).length / medicines.length) * 30 : 0;
    return Math.round(taskPoint + waterPoint + medPoint);
  }, [tasks, water, medicines]);

  const getBloodPressureStatus = () => {
    const high = Number(bloodPressure.high);
    const low = Number(bloodPressure.low);
    if (!high || !low) return null;
    if (high < 120 && low < 80) return { text: "Normal", color: "text-green-600", bg: "bg-green-100" };
    return { text: "Yüksek", color: "text-red-600", bg: "bg-red-100" };
  };

  const getSugarStatus = () => {
    const value = Number(sugar);
    if (!value) return null;
    if (value >= 70 && value <= 140) return { text: "Normal", color: "text-green-600", bg: "bg-green-100" };
    return { text: "Riskli", color: "text-red-600", bg: "bg-red-100" };
  };

  const myRequests = requests.filter(req => req.patientEmail === user?.email);
  const unreadCount = notifications.filter(n => n.userEmail === user?.email && !n.read).length;

  return (
    <div className="space-y-6 bg-[#edf4ff] dark:bg-gray-950 min-h-screen p-5 transition-colors duration-300 relative">
      
      {/* 🟢 MODERN BİLDİRİM PANELİ (OVERLAY) */}
      {showNotif && (
        <div className="absolute top-24 right-5 z-[100] w-[350px] md:w-[400px] bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-blue-50 dark:border-gray-800 p-6 animate-fadeIn transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-gray-800 dark:text-white uppercase text-xs tracking-widest">Bildirim Merkezi</h3>
            <button onClick={() => markAllAsRead()} className="text-[9px] font-black text-blue-500 uppercase hover:underline">Tümünü Oku</button>
          </div>
          
          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            {notifications.length > 0 ? (
              notifications.filter(n => n.userEmail === user?.email).map((notif, index) => (
                <div key={index} className={`p-4 rounded-2xl border transition-all ${notif.read ? 'bg-gray-50 dark:bg-gray-800/50 border-transparent opacity-60' : 'bg-blue-50/50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30 shadow-sm'}`}>
                  <div className="flex gap-3">
                    <span className="text-xl">{notif.type === 'danger' ? '⚠️' : '✅'}</span>
                    <div className="space-y-1">
                      <p className={`text-xs font-black uppercase tracking-tight ${notif.read ? 'text-gray-500' : 'text-blue-700 dark:text-blue-400'}`}>{notif.title}</p>
                      <p className="text-[11px] font-medium leading-relaxed text-gray-600 dark:text-gray-400 italic">"{notif.message}"</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{notif.time || "Yeni"}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-[10px] font-bold text-gray-400 uppercase italic">Henüz bildirim bulunmuyor.</div>
            )}
          </div>
          <button onClick={() => setShowNotif(false)} className="w-full mt-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-[10px] font-black uppercase text-gray-500 hover:bg-gray-200 transition-all">Kapat</button>
        </div>
      )}

      {/* HEADER */}
      <header className="flex justify-between items-center bg-white/80 dark:bg-gray-900 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-sm border border-white/20">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Merhaba, <span className="text-blue-500">{user?.name?.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-sm text-gray-400">Tüm sağlık verilerin tek bir ekranda.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={toggleTheme} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl transition hover:scale-110">{dark ? "🌙" : "☀️"}</button>
          <button onClick={() => setShowNotif(!showNotif)} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl relative transition hover:scale-110">
            🔔 {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800">{unreadCount}</span>}
          </button>
        </div>
      </header>

      {/* ÜST KARTLAR (Su, Tansiyon, Şeker, Skor) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/90 dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-transparent">
          <h3 className="font-bold mb-4 text-blue-500 flex justify-between items-center">💧 Su Takibi <span className="text-xs opacity-50">{water}/12</span></h3>
          <div className="w-full h-2 bg-blue-50 dark:bg-gray-800 rounded-full mb-4 overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(water / 12) * 100}%` }} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => water > 0 && setWater(w => w - 1)} className="flex-1 bg-gray-100 dark:bg-gray-800 py-2 rounded-xl text-gray-400">-</button>
            <button onClick={() => water < 12 && setWater(w => w + 1)} className="flex-1 bg-blue-500 text-white py-2 rounded-xl">+</button>
            <button onClick={handleSaveWater} className="bg-blue-50 dark:bg-gray-800 px-3 rounded-xl text-[10px] font-bold text-blue-600">💾</button>
          </div>
        </div>

        <div className="bg-white/90 dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between">
          <h3 className="font-bold mb-4 text-red-500">❤️ Tansiyon</h3>
          <div className="flex gap-2 mb-2">
            <input type="number" placeholder="Sys" value={bloodPressure.high} onChange={(e) => setBloodPressure({...bloodPressure, high: e.target.value})} className="w-full p-2 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white outline-none text-xs text-center" />
            <input type="number" placeholder="Dia" value={bloodPressure.low} onChange={(e) => setBloodPressure({...bloodPressure, low: e.target.value})} className="w-full p-2 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white outline-none text-xs text-center" />
          </div>
          {getBloodPressureStatus() && <div className={`p-2 rounded-xl text-[10px] font-bold text-center mb-2 ${getBloodPressureStatus().bg} ${getBloodPressureStatus().color}`}>{getBloodPressureStatus().text}</div>}
          <button onClick={handleSaveBP} className="w-full py-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-[10px] font-bold">KAYDET</button>
        </div>

        <div className="bg-white/90 dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between">
          <h3 className="font-bold mb-4 text-green-500">🍬 Şeker</h3>
          <input type="number" placeholder="mg/dL" value={sugar} onChange={(e) => setSugar(e.target.value)} className="w-full p-2 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white outline-none mb-2 text-xs text-center" />
          {getSugarStatus() && <div className={`p-2 rounded-xl text-[10px] font-bold text-center mb-2 ${getSugarStatus().bg} ${getSugarStatus().color}`}>{getSugarStatus().text}</div>}
          <button onClick={handleSaveSugar} className="w-full py-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl text-[10px] font-bold">KAYDET</button>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-500 text-white p-6 rounded-[2.5rem] shadow-xl flex flex-col justify-between">
          <h3 className="text-[10px] font-bold opacity-70 tracking-widest uppercase">SAĞLIK SKORU</h3>
          <span className="text-5xl font-black">{healthScore}%</span>
          <div className="h-1 bg-white/20 rounded-full mt-2 overflow-hidden"><div className="h-full bg-white transition-all duration-1000" style={{ width: `${healthScore}%` }} /></div>
        </div>
      </div>

      {/* ORTA BÖLÜM: VKİ VE HAFTALIK PERFORMANS GRAFİĞİ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/90 dark:bg-gray-900 p-6 rounded-[2.5rem] shadow-sm border border-white/50 dark:border-gray-800 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="text-lg font-bold dark:text-white">⚖️ Vücut Analizi (VKİ)</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 text-center">Boy</p>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-transparent text-center font-bold dark:text-white outline-none" />
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 text-center">Kilo</p>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-transparent text-center font-bold dark:text-white outline-none" />
              </div>
            </div>
            <div className="p-4 rounded-[2rem] flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/10 border dark:border-blue-900/30">
              <span className="text-4xl font-black text-blue-600">{vki}</span>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Vücut Kitle İndeksi</p>
            </div>
          </div>

          {/* HAFTALIK PERFORMANS GRAFİĞİ */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-bold dark:text-white mb-6">📊 Haftalık Performans</h2>
            <div className="flex items-end justify-between flex-1 gap-2 h-32 px-2">
              {[85, 40, 90, 65, 100, 50, 70].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-100 dark:bg-gray-800 rounded-t-lg relative group">
                  <div className="absolute bottom-0 w-full bg-blue-300 dark:bg-blue-700 rounded-t-lg opacity-40" style={{ height: `${h}%` }}></div>
                  <div className="absolute bottom-0 w-full bg-indigo-600 rounded-t-lg transition-all duration-700" style={{ height: `${Math.max(0, h - 20)}%` }}></div>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">%{h}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-bold px-1 uppercase"><span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span></div>
          </div>
        </div>

        {/* RANDEVULAR */}
        <div className="bg-white/90 dark:bg-gray-900 p-6 rounded-[2.5rem] shadow-sm border dark:border-gray-800">
          <h2 className="text-lg font-bold mb-4 dark:text-white">📅 Yaklaşan Randevular</h2>
          <div className="space-y-3">
            {appointments.map(app => (
              <div key={app.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-l-4 border-blue-500 flex justify-between items-center group hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-sm font-semibold">
                <div>
                  <p className="font-bold text-sm dark:text-white">{app.doctor}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">{app.clinic}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-blue-600 uppercase">{app.date}</p>
                  <p className="text-[10px] font-bold text-gray-500">{app.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ALT BÖLÜM: GÖREVLER VE İLAÇLAR (EKLEME/SİLME ÖZELLİKLİ) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/90 dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border dark:border-gray-800">
          <h2 className="text-lg font-bold mb-5 dark:text-white flex justify-between items-center">✅ Görevlerim <span className="text-[10px] font-normal opacity-50">{tasks.length} Adet</span></h2>
          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Görev ekle..." value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} className="flex-1 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none text-xs dark:text-white" />
            <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 rounded-xl font-bold">+</button>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {tasks.map(task => (
              <div key={task.id} className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:translate-x-1 transition-all">
                <div onClick={() => setTasks(tasks.map(t => t.id === task.id ? {...t, completed: !t.completed} : t))} className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{task.completed && "✓"}</div>
                  <span className={`text-sm font-semibold ${task.completed ? 'line-through opacity-50' : 'dark:text-white'}`}>{task.text}</span>
                </div>
                <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} className="opacity-0 group-hover:opacity-100 text-red-500 text-[10px] font-bold">SİL</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border dark:border-gray-800">
          <h2 className="text-lg font-bold mb-5 dark:text-white">💊 Günlük İlaç Takibi</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <input type="text" placeholder="İlaç adı" value={newMed.name} onChange={(e) => setNewMed({...newMed, name: e.target.value})} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 outline-none text-xs dark:text-white" />
            <div className="flex gap-2">
              <input type="time" value={newMed.time} onChange={(e) => setNewMed({...newMed, time: e.target.value})} className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 outline-none text-xs dark:text-white" />
              <button onClick={handleAddMed} className="bg-blue-500 text-white px-4 rounded-xl font-bold">+</button>
            </div>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {medicines.map(med => (
              <div key={med.id} className="group flex justify-between items-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-l-4 border-blue-500 transition-all">
                <div onClick={() => setMedicines(medicines.map(m => m.id === med.id ? {...m, taken: !m.taken} : m))} className="cursor-pointer">
                  <p className={`font-bold text-sm ${med.taken ? 'line-through opacity-50' : 'dark:text-white'}`}>{med.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{med.time}</p>
                </div>
                <button onClick={() => setMedicines(medicines.filter(m => m.id !== med.id))} className="opacity-0 group-hover:opacity-100 text-red-500 text-[10px] font-bold">SİL</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ECZANE VE ACİL DURUM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-600 text-white p-6 rounded-[2.5rem] shadow-lg flex flex-col justify-between">
          <div><h3 className="font-bold opacity-70 text-[10px] tracking-widest uppercase mb-2">Son Eczane İşlemi</h3><p className="font-bold text-lg mb-1">Parol 500mg</p><p className="text-xs opacity-70 italic">Kadıköy Merkez Eczanesi</p></div>
          <div className="flex justify-between items-center mt-4"><span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Hazırlanıyor</span><button className="text-xs font-bold underline">Detay</button></div>
        </div>
        <button className="bg-red-600 text-white rounded-[2.5rem] flex flex-col items-center justify-center gap-2 shadow-xl shadow-red-100 dark:shadow-none hover:scale-[1.02] active:scale-95 transition-all font-black text-xl uppercase tracking-tighter text-center px-4"><span className="text-4xl animate-bounce">🚨</span>Acil Yardım Çağır</button>
      </div>
    </div>
  );
};

export default PatientDashboard;