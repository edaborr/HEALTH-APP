import { useRequests } from "../../context/RequestContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTasks } from "../../context/TaskContext";
import { 
  Bell, Activity, CheckCircle, Search, 
  ArrowUpRight, AlertCircle, Coffee, Plus
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, RadialBarChart, RadialBar,CartesianGrid
} from "recharts";

const DoctorDashboard = () => {
  const { requests } = useRequests();
  const { user } = useAuth();
  const { tasks } = useTasks();
  const [date, setDate] = useState(new Date());

  const approved = requests.filter((r) => r.status === "approved").length;
  const pendingRequests = requests.filter(r => r.status === 'pending');

  const patientData = [
    { name: 'Kronik', value: 400, color: '#6FA9B7' },
    { name: 'Çocuk', value: 300, color: '#A2D2DF' },
    { name: 'Genel', value: 300, color: '#D1E9F6' },
  ];

  const workloadData = [{ name: 'L', value: 85, fill: '#6FA9B7' }];

  const chartData = [
    { name: "Pzt", requests: 32 }, { name: "Sal", requests: 45 },
    { name: "Çar", requests: 38 }, { name: "Per", requests: 51 }, { name: "Cum", requests: 46 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10">
      
      {/* 🔝 ÜST NAVİGASYON */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-6">
           <h1 className="text-2xl font-bold text-gray-800">Genel Bakış</h1>
           <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Hasta ara..." className="pl-10 pr-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-[#6FA9B7] outline-none text-sm w-64"/>
           </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative p-2 bg-white rounded-xl shadow-sm border border-gray-50">
            <Bell size={20} className="text-gray-600"/>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-xl shadow-sm border border-gray-50">
            <div className="w-8 h-8 bg-[#6FA9B7] rounded-lg flex items-center justify-center text-white font-bold text-xs">DR</div>
            <div>
              <p className="text-xs font-bold text-gray-800">{user?.name}</p>
              <p className="text-[10px] text-[#6FA9B7] font-medium tracking-wider">Aile Hekimi</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* ANA İÇERİK (SOL) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 🌊 HERO PANEL (V1'in görseli + V2'nin içeriği) */}
          <div className="bg-[#6FA9B7] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-[#6FA9B7]/20 min-h-[320px] flex items-center">
            <div className="relative z-10 w-full md:w-3/5">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-semibold mb-4 inline-block backdrop-blur-sm uppercase tracking-widest">Sistem Yayında</span>
              <h2 className="text-4xl font-bold mb-4 leading-tight">İyi Günler, <br/> Dr. {user?.name.split(" ")[0]}</h2>
              
              {/* Kritik Uyarı Modülü */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 mb-8 inline-flex items-center gap-3">
                <AlertCircle size={18} className="text-yellow-200" />
                <p className="text-xs font-medium">3 Hastanın reçete süresi dolmak üzere. <span className="underline ml-2 cursor-pointer">Kontrol et</span></p>
              </div>

              <div className="flex gap-4">
                <button className="bg-white text-[#6FA9B7] px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2">
                  <Plus size={18}/> Yeni Reçete Oluştur
                </button>
              </div>
            </div>
            
            {/* V1'deki Doktor Görseli */}
            <div className="absolute right-0 bottom-0 h-full w-1/2 hidden md:block">
               <div className="absolute inset-0 bg-gradient-to-r from-[#6FA9B7] via-transparent to-transparent z-10"></div>
               <img 
                 src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop" 
                 className="w-full h-full object-cover mix-blend-luminosity opacity-40 transform scale-110" 
                 alt="doctor" 
               />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* GRAFİK (V1 Stili) */}
            <div className="bg-white rounded-[2.5rem] p-7 shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Haftalık Akış</h3>
                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-lg font-bold">+12.5%</span>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6FA9B7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6FA9B7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip />
                    <Area type="monotone" dataKey="requests" stroke="#6FA9B7" strokeWidth={3} fill="url(#colorReq)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* HASTA PROFİLİ (V2 Analitik) */}
            <div className="bg-white rounded-[2.5rem] p-7 shadow-sm border border-gray-50">
               <h3 className="font-bold text-gray-800 mb-4">Hasta Demografisi</h3>
               <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={patientData} innerRadius={45} outerRadius={65} paddingAngle={8} dataKey="value">
                      {patientData.map((entry, index) => <Cell key={index} fill={entry.color} cornerRadius={10} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-4 px-2">
                {patientData.map(d => (
                  <div key={d.name} className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full mb-1" style={{backgroundColor: d.color}}></div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">{d.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ PANEL */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* YOĞUNLUK GÖSTERGESİ (V2 Modern) */}
          <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-gray-50 text-center relative overflow-hidden">
             <h3 className="font-bold text-gray-800 mb-2">Günlük Kapasite</h3>
             <div className="h-32 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={8} data={workloadData} startAngle={180} endAngle={0}>
                    <RadialBar background dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2">
                   <p className="text-2xl font-black text-gray-800">%85</p>
                   <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Yoğunluk</p>
                </div>
             </div>
             <div className="mt-4 flex items-center gap-2 justify-center bg-[#6FA9B7]/5 p-2 rounded-xl">
                <Coffee size={14} className="text-[#6FA9B7]" />
                <p className="text-[11px] text-[#6FA9B7] font-bold uppercase">Mola Zamanı: 15:30</p>
             </div>
          </div>

          {/* TAKVİM */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
             <Calendar onChange={setDate} value={date} className="!border-none !w-full custom-calendar" />
          </div>

          {/* SİSTEM NOTU (V1 Tasarımı) */}
          <div className="bg-gray-900 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-2">
                 <CheckCircle size={14} className="text-[#6FA9B7]" />
                 <p className="text-[10px] text-[#6FA9B7] font-bold uppercase">Sistem Notu</p>
               </div>
               <p className="text-xs font-medium leading-relaxed italic text-gray-300">"Eczane entegrasyonu başarıyla güncellendi. Tüm stok verileri anlık olarak çekiliyor."</p>
             </div>
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#6FA9B7]/10 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;