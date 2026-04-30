import { useRequests } from "../../context/RequestContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTasks } from "../../context/TaskContext";

import {
  Bell,
  Activity,
  CheckCircle,
  ClipboardList,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DoctorDashboard = () => {
  const { requests } = useRequests();
  const { user } = useAuth();
const { tasks } = useTasks();

const todayTasks = tasks.filter((t) => {
  const today = new Date().toISOString().split("T")[0];
  return t.date === today;
});
  const [date, setDate] = useState(new Date());
  const [infoIndex, setInfoIndex] = useState(0);

  // 📊 stats
  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const total = requests.length;

  // 📈 fake chart data
  const chartData = [
    { name: "Pzt", requests: 2 },
    { name: "Sal", requests: 5 },
    { name: "Çar", requests: 3 },
    { name: "Per", requests: 6 },
    { name: "Cum", requests: 4 },
  ];

  // 🔥 canlı info
  const infoCards = [
    "Bugün 5 yeni hasta eklendi",
    "2 reçete onay bekliyor",
    "3 hasta kontrol zamanı geldi",
    "Yeni mesajınız var",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setInfoIndex((prev) => (prev + 1) % infoCards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">

      {/* 🔝 HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold">
            Hoşgeldiniz,{" "}
            <span className="text-[#6FA9B7]">{user?.name}</span>
          </h1>
          <p className="text-sm text-gray-400">
            Bugün sistemde olan genel durum
          </p>
        </div>

        <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          <Bell />
        </div>
      </div>

      {/* 📊 STATS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-50 shadow hover:scale-[1.02] transition">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Bekleyen</p>
            <Activity className="text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-yellow-600 mt-2">
            {pending}
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 shadow hover:scale-[1.02] transition">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Onaylanan</p>
            <CheckCircle className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {approved}
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 shadow hover:scale-[1.02] transition">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Toplam</p>
            <ClipboardList className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {total}
          </h2>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow">
  <h3 className="font-semibold mb-3">Bugünkü Görevler</h3>

  {todayTasks.length === 0 && (
    <p className="text-gray-400">Görev yok</p>
  )}

  {todayTasks.map((t) => (
    <div key={t.id} className="p-2 bg-gray-100 rounded mb-2">
      {t.title}
    </div>
  ))}
</div>

      {/* 🔥 MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          {/* 📈 CHART */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
            <h2 className="font-semibold mb-4">İstatistik</h2>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="#6FA9B7"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 🧾 REQUESTS */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
            <h2 className="font-semibold mb-4">Son Talepler</h2>

            {requests.length === 0 && (
              <p className="text-gray-400">Talep yok</p>
            )}

            <div className="space-y-3">
              {requests.slice(0, 5).map((r) => (
                <div
                  key={r.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div>
                    <p className="font-medium">{r.medicine}</p>
                    <p className="text-xs text-gray-400">
                      {r.patientName}
                    </p>
                  </div>

                  <span className="text-xs text-gray-500">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* 👨‍⚕️ DOCTOR CARD */}
          <div className="bg-gradient-to-r from-[#6FA9B7] to-[#4f8c9a]
          text-white p-5 rounded-2xl shadow flex items-center gap-4">

            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="doctor"
              className="w-16 h-16 rounded-full border-2 border-white"
            />

            <div>
              <h3 className="font-semibold">{user?.name}</h3>
              <p className="text-sm opacity-80">Doktor Paneli</p>
            </div>
          </div>

          {/* 📅 MINI CALENDAR */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex flex-col items-center">
            <h3 className="text-sm font-semibold mb-2">Takvim</h3>

            <Calendar
              onChange={setDate}
              value={date}
              className="!border-none text-sm"
            />
          </div>

          {/* ⚡ LIVE INFO */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
            <p className="text-sm text-gray-500 mb-2">Canlı Bilgi</p>

            <p className="font-medium animate-fadeIn">
              {infoCards[infoIndex]}
            </p>

            <div className="mt-2 h-2 bg-gray-200 rounded">
              <div className="h-2 bg-[#6FA9B7] w-1/2 rounded"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;