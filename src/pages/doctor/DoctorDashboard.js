import React, { useState } from "react";
import {
  BookOpen,
  Activity,
  Search,
  Bell,
  MessageCircle,
  MoreVertical,
  Plus,
  Users,
  ClipboardList,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTasks } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { useMessages } from "../../context/MessageContext";
const istatistikVeri = [
  { ay: "Oca", randevu: 25, acil: 45 },
  { ay: "Şub", randevu: 45, acil: 35 },
  { ay: "Mar", randevu: 65, acil: 55 },
  { ay: "Nis", randevu: 40, acil: 20 },
  { ay: "May", randevu: 60, acil: 40 },
];

const DoctorDashboard = () => {
  const { tasks } = useTasks();
  const navigate = useNavigate();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const [newMessage, setNewMessage] = useState({
    name: "",
    message: "",
  });
  const { messages, setMessages } = useMessages();

  const bekleyenTasks = tasks.filter(
    (task) => task.status === "Bekleyenler"
  );

  return (
    <>
      <div className="space-y-6 font-sans">
        {/* TOPBAR */}
        <div
          className="
            flex
            justify-between
            items-center
            bg-white/65
            backdrop-blur-2xl
            p-4
            rounded-[32px]
            border
            border-white/40
            shadow-[0_10px_30px_rgba(14,116,144,0.06)]
          "
        >
          {/* SEARCH */}
          <div
            className="
              flex
              items-center
              gap-3
              bg-white/70
              px-4
              py-3
              rounded-2xl
              w-96
              border
              border-white/40
            "
          >
            <Search size={18} className="text-[#0891B2]" />
            <input
              type="text"
              placeholder="Hasta veya rapor ara..."
              className="
                bg-transparent
                outline-none
                text-sm
                w-full
                placeholder:text-slate-400
              "
            />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* MESSAGE */}
            <button
              onClick={() => navigate("/doctor/messages")}
              className="
                relative
                w-12
                h-12
                rounded-2xl
                bg-white
                border
                border-[#D7EEF2]
                flex
                items-center
                justify-center
                text-[#0891B2]
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              <MessageCircle size={20} />
              {/* ACTIVE DOT */}
              <span
                className="
                  absolute
                  top-3
                  right-3
                  w-2
                  h-2
                  rounded-full
                  bg-cyan-400
                "
              />
            </button>

            {/* NOTIFICATION */}
            <button
              className="
                relative
                w-12
                h-12
                rounded-2xl
                bg-white
                border
                border-[#D7EEF2]
                flex
                items-center
                justify-center
                text-[#0891B2]
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              <Bell size={20} />
              <span
                className="
                  absolute
                  top-3
                  right-3
                  w-2
                  h-2
                  rounded-full
                  bg-rose-400
                "
              />
            </button>

            {/* PROFILE */}
            <div className="flex items-center gap-3 pl-4 border-l border-white/40">
              <div className="text-right">
                <p className="text-xs font-black text-slate-800 uppercase">
                  Dr. Ahmet Yılmaz
                </p>
                <p className="text-[11px] font-semibold text-[#0891B2]">
                  Görevde • Aile Hekimi
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop"
                alt="doctor"
                className="
                  w-11
                  h-11
                  rounded-2xl
                  object-cover
                  border-2
                  border-white
                  shadow-lg
                "
              />
            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className="px-2">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Hoş Geldiniz, Dr. Ahmet!
          </h1>
          <p className="text-slate-400 font-medium mt-1">
            Güncel sağlık yönetim paneliniz hazır.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* TASKS */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                p-6
                text-white
                bg-gradient-to-br
                from-[#0891B2]
                to-[#0E7490]
                shadow-[0_20px_50px_rgba(8,145,178,0.25)]
              "
            >
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="font-black text-xl flex items-center gap-2">
                  Bekleyen Görevler
                  <span className="bg-white/20 px-2 py-1 rounded-xl text-xs">
                    {bekleyenTasks.length}
                  </span>
                </h3>
                <button
                  onClick={() => navigate("/doctor/tasks")}
                  className="
                    text-xs
                    font-bold
                    opacity-80
                    hover:opacity-100
                    transition-all
                  "
                >
                  TÜMÜNÜ GÖR
                </button>
              </div>

              <div className="space-y-4 relative z-10">
                {bekleyenTasks.length === 0 ? (
                  <div
                    className="
                      bg-white/10
                      border
                      border-white/10
                      rounded-3xl
                      p-6
                      text-center
                      text-white/80
                      font-semibold
                    "
                  >
                    Henüz görev eklenmedi.
                  </div>
                ) : (
                  bekleyenTasks.slice(0, 3).map((gorev, i) => (
                    <div
                      key={i}
                      onClick={() => navigate("/doctor/tasks")}
                      className="
                        bg-white/95
                        rounded-3xl
                        p-4
                        flex
                        items-center
                        gap-4
                        cursor-pointer
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-2xl
                        hover:scale-[1.02]
                      "
                    >
                      <div
                        className={`
                          w-12
                          h-12
                          rounded-2xl
                          bg-gradient-to-br
                          ${
                            i % 3 === 0
                              ? "from-[#67C6D3] to-[#4DAFC4]"
                              : i % 3 === 1
                              ? "from-[#7DD3FC] to-[#38BDF8]"
                              : "from-[#38BDF8] to-[#0891B2]"
                          }
                          flex
                          items-center
                          justify-center
                          font-black
                          text-white
                          shadow-lg
                        `}
                      >
                        {gorev.title?.charAt(0) || "G"}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-800 font-black text-sm">
                          {gorev.title}
                        </p>
                        <p className="text-[#0891B2] text-xs font-semibold mt-1">
                          {gorev.time || "Saat Yok"}
                        </p>
                      </div>
                      <MoreVertical
                        size={18}
                        className="text-slate-300 hover:text-[#0891B2]"
                      />
                    </div>
                  ))
                )}
              </div>
              <Activity
                className="
                  absolute
                  -right-10
                  -bottom-10
                  w-52
                  h-52
                  text-white/10
                  rotate-12
                "
              />
            </div>

            {/* CALENDAR */}
            <div
              className="
                bg-white/70
                backdrop-blur-xl
                rounded-[32px]
                p-6
                border
                border-white/40
                shadow-[0_10px_30px_rgba(14,116,144,0.06)]
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-slate-800 text-xl">
                  Çalışma Takvimi
                </h3>
                <div className="flex gap-2">
                  <button
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-[#F4FBFC]
                      hover:bg-[#E0F7FA]
                      text-[#0891B2]
                      transition-all
                    "
                  >
                    ‹
                  </button>
                  <button
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-[#F4FBFC]
                      hover:bg-[#E0F7FA]
                      text-[#0891B2]
                      transition-all
                    "
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-y-3 text-center">
                {["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"].map((d) => (
                  <span
                    key={d}
                    className="text-[11px] font-bold text-slate-400"
                  >
                    {d}
                  </span>
                ))}
                {[...Array(30)].map((_, i) => (
                  <span
                    key={i}
                    className={`
                      text-sm
                      font-bold
                      p-3
                      cursor-pointer
                      transition-all
                      rounded-2xl
                      ${
                        i + 1 === 6
                          ? `
                            bg-gradient-to-br
                            from-[#0891B2]
                            to-[#0E7490]
                            text-white
                            shadow-lg
                          `
                          : `
                            text-slate-700
                            hover:bg-[#F4FBFC]
                          `
                      }
                    `}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* MESSAGES */}
            <div
              className="
                bg-white/70
                backdrop-blur-xl
                rounded-[32px]
                p-6
                border
                border-white/40
                shadow-[0_10px_30px_rgba(14,116,144,0.06)]
                h-[420px]
                flex
                flex-col
              "
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-slate-800 text-xl">
                  Son Mesajlar
                </h3>
                <button
                  onClick={() => setShowMessageModal(true)}
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-[#F2FBFD]
                    flex
                    items-center
                    justify-center
                    text-[#0891B2]
                    hover:scale-105
                    transition-all
                  "
                >
                  <Plus size={22} />
                </button>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className="
                      flex
                      items-center
                      gap-4
                      p-4
                      rounded-3xl
                      bg-white/60
                      hover:bg-white
                      transition-all
                      duration-300
                      cursor-pointer
                      hover:-translate-y-1
                      hover:shadow-lg
                    "
                  >
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-gradient-to-br
                        from-[#67C6D3]
                        to-[#0891B2]
                        flex
                        items-center
                        justify-center
                        text-white
                        font-black
                        shadow-lg
                      "
                    >
                      {m.name?.[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-black text-slate-800">
                          {m.name}
                        </p>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {m.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#0891B2] italic mt-1 truncate">
                        "{m.message}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ARTICLE */}
            <div
              className="
                group
                bg-white/70
                backdrop-blur-xl
                rounded-[32px]
                p-6
                border
                border-white/40
                shadow-[0_10px_30px_rgba(14,116,144,0.06)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_40px_rgba(14,116,144,0.10)]
                cursor-pointer
              "
            >
              <div className="flex items-center gap-2 mb-5">
                <BookOpen size={20} className="text-[#0891B2]" />
                <h3 className="font-black text-slate-800 text-xl">
                  Tıbbi Makaleler
                </h3>
              </div>
              <div className="relative h-52 rounded-[28px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173bc999565?w=500"
                  alt="medical"
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#0E7490]/90
                    via-[#0891B2]/30
                    to-transparent
                    flex
                    items-end
                    p-5
                  "
                >
                  <p className="text-white text-sm font-bold leading-relaxed">
                    Yeni nesil antibiyotik kullanımında dikkat edilmesi gerekenler.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* CHART */}
            <div
              className="
                bg-white/70
                backdrop-blur-xl
                rounded-[32px]
                p-6
                border
                border-white/40
                shadow-[0_10px_30px_rgba(14,116,144,0.06)]
              "
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-slate-800 text-xl">
                  İstatistikler
                </h3>
                <select
                  className="
                    text-xs
                    font-bold
                    bg-[#F4FBFC]
                    px-3
                    py-2
                    rounded-xl
                    outline-none
                    text-[#0891B2]
                  "
                >
                  <option>Son 6 Ay</option>
                </select>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={istatistikVeri}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#D9F3F8"
                    />
                    <XAxis
                      dataKey="ay"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fontWeight: 700,
                        fill: "#94A3B8",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "20px",
                        border: "none",
                        backdropFilter: "blur(20px)",
                        background: "rgba(255,255,255,0.85)",
                        boxShadow: "0 20px 40px rgba(14,116,144,0.10)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="acil"
                      stroke="#0891B2"
                      strokeWidth={4}
                      strokeLinecap="round"
                      animationDuration={1200}
                      dot={{
                        r: 5,
                        fill: "#0891B2",
                        strokeWidth: 3,
                        stroke: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="randevu"
                      stroke="#67C6D3"
                      strokeWidth={4}
                      strokeLinecap="round"
                      animationDuration={1200}
                      dot={{
                        r: 5,
                        fill: "#67C6D3",
                        strokeWidth: 3,
                        stroke: "#fff",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#0891B2] rounded-full"></span>
                  <span className="text-xs font-bold text-slate-500">
                    Acil Giriş
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#67C6D3] rounded-full"></span>
                  <span className="text-xs font-bold text-slate-500">
                    Randevulu
                  </span>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="
                  bg-gradient-to-br
                  from-[#0891B2]
                  to-[#0E7490]
                  rounded-[32px]
                  p-5
                  text-white
                  h-44
                  flex
                  flex-col
                  justify-between
                  shadow-[0_20px_40px_rgba(8,145,178,0.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                <div className="flex justify-between">
                  <p className="text-xs font-bold opacity-80">Yeni Kayıtlar</p>
                  <Users size={18} className="opacity-60" />
                </div>
                <div>
                  <h4 className="text-4xl font-black mb-2">40</h4>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                    %51 Artış
                  </span>
                </div>
              </div>

              <div
                className="
                  bg-gradient-to-br
                  from-[#67C6D3]
                  to-[#4DAFC4]
                  rounded-[32px]
                  p-5
                  text-white
                  h-44
                  flex
                  flex-col
                  justify-between
                  shadow-[0_20px_40px_rgba(103,198,211,0.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                <div className="flex justify-between">
                  <p className="text-xs font-bold opacity-80">Kronik Hastalar</p>
                  <ClipboardList size={18} className="opacity-60" />
                </div>
                <div>
                  <h4 className="text-4xl font-black mb-2">22</h4>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                    %32 Takip
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MESSAGE MODAL */}
      {showMessageModal && (
        <div
          className="
            fixed
            inset-0
            bg-black/20
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
          "
        >
          <div
            className="
              w-[420px]
              bg-white
              rounded-[32px]
              p-6
              shadow-2xl
            "
          >
            <h2 className="text-2xl font-black text-slate-800 mb-6">
              Yeni Mesaj
            </h2>
            <select
            value={newMessage.name}
            onChange={(e) =>
              setNewMessage({
                ...newMessage,
                name: e.target.value,
              })
            }
            className="
              w-full
              h-14
              rounded-2xl
              border
              border-[#DCEFF3]
              px-4
              outline-none
              mb-4
              bg-white
              text-slate-700
              font-medium
            "
          >
            <option value="">Kime?</option>

            <option value="Hemşire Elif">
              Hemşire Elif
            </option>

            <option value="Dr. Selin Demir">
              Dr. Selin Demir
            </option>

            <option value="Ecz. Murat">
              Ecz. Murat
            </option>
          </select>
            <textarea
              placeholder="Mesaj yaz..."
              value={newMessage.message}
              onChange={(e) =>
                setNewMessage({
                  ...newMessage,
                  message: e.target.value,
                })
              }
              className="
                w-full
                h-32
                rounded-2xl
                border
                border-[#DCEFF3]
                p-4
                outline-none
                resize-none
              "
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowMessageModal(false)}
                className="
                  px-5
                  h-12
                  rounded-2xl
                  bg-slate-100
                  font-semibold
                "
              >
                İptal
              </button>
              <button
                onClick={() => {

  if (!newMessage.name || !newMessage.message) return;

  setMessages((prev) =>
  prev.map((msg) =>
    msg.name === newMessage.name
      ? {
          ...msg,
          message: newMessage.message,
          time: "Şimdi",
        }
      : msg
  )
);

  setShowMessageModal(false);

  setNewMessage({
    name: "",
    message: "",
  });
}}
                className="
                  px-6
                  h-12
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#0891B2]
                  to-[#0E7490]
                  text-white
                  font-bold
                "
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorDashboard;