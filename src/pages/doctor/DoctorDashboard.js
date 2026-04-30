import { useRequests } from "../../context/RequestContext";
import { useAuth } from "../../context/AuthContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  Activity,
  CheckCircle,
  ClipboardList,
  CalendarDays,
} from "lucide-react";

const DoctorDashboard = () => {
  const { requests } = useRequests();
  const { user } = useAuth();

  // ✅ CHART DATA (düzeltildi)
  const chartData = [
    { name: "Jan", requests: 10 },
    { name: "Feb", requests: 25 },
    { name: "Mar", requests: 18 },
    { name: "Apr", requests: 30 },
    { name: "May", requests: 22 },
  ];

  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (!taskInput) return;
    setTasks([...tasks, taskInput]);
    setTaskInput("");
  };

  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const total = requests.length;

  return (
    <div className="space-y-6">

      {/* 🔝 HEADER */}
      <div className="flex justify-between items-center
      bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-50
        shadow hover:scale-[1.03] transition">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Bekleyen</p>
            <Activity className="text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-yellow-600 mt-2">
            {pending}
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-100 to-green-50
        shadow hover:scale-[1.03] transition">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Onaylanan</p>
            <CheckCircle className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {approved}
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50
        shadow hover:scale-[1.03] transition">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Toplam</p>
            <ClipboardList className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {total}
          </h2>
        </div>
      </div>

      {/* 🔥 ALT GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* 📄 SOL */}
        <div className="md:col-span-2 space-y-6">

          {/* CHART */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
            <h2 className="font-semibold mb-4">İstatistik</h2>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
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

          {/* SON TALEPLER */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">

            <h2 className="font-semibold mb-4">Son Talepler</h2>

            {requests.length === 0 && (
              <p className="text-gray-400">Talep yok</p>
            )}

            <div className="space-y-3">
              {requests.slice(0, 5).map((r) => (
                <div
                  key={r.id}
                  className="flex justify-between items-center
                  p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
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

        {/* 📅 SAĞ */}
        <div className="space-y-4">

          {/* TAKVİM */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays size={18} />
              <h3 className="font-semibold">Takvim</h3>
            </div>

            <Calendar
              onChange={setDate}
              value={date}
              className="rounded-xl border-none"
            />
          </div>

          {/* TODO */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">

            <h3 className="font-semibold mb-3">Görevler</h3>

            <div className="flex gap-2 mb-3">
              <input
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Görev ekle..."
                className="flex-1 p-2 rounded-lg border dark:bg-gray-700"
              />
              <button
                onClick={addTask}
                className="bg-[#6FA9B7] text-white px-3 rounded-lg hover:scale-105 transition"
              >
                +
              </button>
            </div>

            <div className="space-y-2">
              {tasks.map((t, i) => (
                <div
                  key={i}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
                >
                  {t}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default DoctorDashboard;