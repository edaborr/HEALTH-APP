import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  X,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react";

import { useTasks } from "../../context/TaskContext";

const TaskPage = () => {
  const [activeTab, setActiveTab] = useState("Görev Panosu");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    time: "09:00",
    day: 19,
    status: "Bekleyenler",
    type: "Genel",
  });

  const { tasks, addTask, moveTask } = useTasks();

  const handleAddTask = (e) => {
    e.preventDefault();

    if (newTask.title && newTask.day) {
      addTask(newTask);

      setShowAddModal(false);

      setNewTask({
        title: "",
        time: "09:00",
        day: 19,
        status: "Bekleyenler",
        type: "Genel",
      });
    }
  };

  const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  const calendarDays = Array.from(
    { length: 35 },
    (_, i) => i - 3
  );

  /* ------------------------------------------------ */
  /* TASK BOARD */
  /* ------------------------------------------------ */

  const TaskBoard = () => {
    const statuses = [
      "Bekleyenler",
      "İşlemde",
      "Tamamlanan",
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">

        {statuses.map((status) => (
          <div
            key={status}
            className="
              bg-white/60
              backdrop-blur-xl
              rounded-[32px]
              p-4
              min-h-[650px]
              border
              border-white/40
              shadow-[0_10px_30px_rgba(14,116,144,0.06)]
            "
          >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6 px-2">

              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[2px] flex items-center gap-2">

                <div
                  className={`
                    w-2 h-2 rounded-full

                    ${
                      status === "Bekleyenler"
                        ? "bg-amber-400"
                        : status === "İşlemde"
                        ? "bg-cyan-400"
                        : "bg-emerald-400"
                    }
                  `}
                />

                {status}
              </h3>

              <span
                className="
                  bg-white
                  px-3
                  py-1
                  rounded-full
                  text-[10px]
                  font-black
                  text-slate-400
                  shadow-sm
                  border
                  border-slate-100
                  font-mono
                "
              >
                {
                  tasks.filter(
                    (t) =>
                      (t.status || "Bekleyenler") ===
                      status
                  ).length
                }
              </span>
            </div>

            {/* TASKS */}
            <div className="space-y-4">

              {tasks
                .filter(
                  (t) =>
                    (t.status || "Bekleyenler") ===
                    status
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className="
                      relative
                      overflow-hidden
                      bg-white/90
                      backdrop-blur-lg
                      p-5
                      rounded-[24px]
                      border
                      border-white/50
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-[0_12px_30px_rgba(14,116,144,0.12)]
                      cursor-pointer
                    "
                  >

                    {/* STATUS STRIP */}
                    <div
                      className={`
                        absolute
                        top-0
                        left-0
                        w-full
                        h-1

                        ${
                          status === "Bekleyenler"
                            ? "bg-amber-400"
                            : status === "İşlemde"
                            ? "bg-cyan-400"
                            : "bg-emerald-400"
                        }
                      `}
                    />

                    {/* TOP */}
                    <div className="flex justify-between items-start mb-3">

                      <span
                        className="
                          px-3
                          py-1
                          rounded-lg
                          text-[9px]
                          font-black
                          uppercase
                          tracking-wider
                          bg-[#E0F7FA]
                          text-[#0891B2]
                        "
                      >
                        {task.type || "Genel"}
                      </span>

                      <button className="text-slate-300 hover:text-slate-600 transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    {/* TITLE */}
                    <h4 className="text-sm font-bold text-slate-700 mb-5">
                      {task.title}
                    </h4>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">

                      <div className="flex items-center gap-2 text-slate-400 font-mono">

                        <Clock size={12} />

                        <span className="text-[10px] font-bold">
                          {task.time}
                        </span>
                      </div>

                      <div className="flex gap-1">

                        {status !== "İşlemde" &&
                          status !== "Tamamlanan" && (
                            <button
                              onClick={() =>
                                moveTask(
                                  task.id,
                                  "İşlemde"
                                )
                              }
                              className="
                                p-1.5
                                hover:bg-cyan-50
                                text-cyan-500
                                rounded-lg
                                transition-colors
                              "
                            >
                              <Clock size={14} />
                            </button>
                          )}

                        {status !== "Tamamlanan" && (
                          <button
                            onClick={() =>
                              moveTask(
                                task.id,
                                "Tamamlanan"
                              )
                            }
                            className="
                              p-1.5
                              hover:bg-emerald-50
                              text-emerald-500
                              rounded-lg
                              transition-colors
                            "
                          >
                            <CheckCircle2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              {/* EMPTY STATE */}
              {tasks.filter(
                (t) =>
                  (t.status || "Bekleyenler") ===
                  status
              ).length === 0 && (
                <div
                  className="
                    border-2
                    border-dashed
                    border-slate-200
                    rounded-[24px]
                    p-10
                    text-center
                    bg-white/40
                  "
                >
                  <p className="text-slate-400 text-sm font-bold">
                    Görev bulunamadı
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* ------------------------------------------------ */
  /* TIMELINE */
  /* ------------------------------------------------ */

  const TimelineBoard = () => {
    const hours = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
    ];

    return (
      <div
        className="
          bg-white/70
          backdrop-blur-xl
          rounded-[32px]
          p-8
          border
          border-white/40
          shadow-[0_10px_30px_rgba(14,116,144,0.06)]
          animate-in
          fade-in
          duration-500
        "
      >

        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-xl font-black text-slate-800">
              Günlük Akış
            </h2>

            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
              19 Kasım, Cumartesi
            </p>
          </div>

          <div className="flex gap-2">

            <div className="flex items-center gap-2 px-4 py-2 bg-[#F4FBFC] rounded-xl">

              <div className="w-2 h-2 rounded-full bg-cyan-400" />

              <span className="text-[10px] font-black text-slate-500 uppercase">
                Aktif Görevler
              </span>
            </div>
          </div>
        </div>

        <div className="relative">

          <div className="absolute left-[80px] top-0 bottom-0 w-px bg-slate-100" />

          <div className="space-y-2">

            {hours.map((hour) => {
              const currentTasks = tasks.filter(
                (t) =>
                  t.day === 19 &&
                  t.time.startsWith(
                    hour.split(":")[0]
                  )
              );

              return (
                <div
                  key={hour}
                  className="flex min-h-[100px] group"
                >

                  <div className="w-[80px] pt-1 pr-4 text-right">

                    <span className="text-xs font-black text-slate-400 font-mono tracking-tighter">
                      {hour}
                    </span>
                  </div>

                  <div className="flex-1 pl-8 pb-4 relative">

                    <div
                      className="
                        absolute
                        left-[-4.5px]
                        top-2.5
                        w-2
                        h-2
                        rounded-full
                        bg-white
                        border-2
                        border-slate-200
                        group-hover:border-[#0891B2]
                        transition-colors
                        z-10
                      "
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                      {currentTasks.length > 0 ? (
                        currentTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`
                              p-4
                              rounded-[20px]
                              border
                              flex
                              flex-col
                              justify-between
                              transition-all
                              hover:shadow-lg
                              hover:-translate-y-1

                              ${
                                task.status ===
                                "Tamamlanan"
                                  ? `
                                    bg-emerald-50/60
                                    border-emerald-100
                                  `
                                  : `
                                    bg-white/90
                                    border-white/40
                                  `
                              }
                            `}
                          >

                            <div className="flex justify-between items-start mb-2">

                              <h4 className="text-sm font-bold text-slate-700">
                                {task.title}
                              </h4>

                              <span
                                className={`
                                  text-[8px]
                                  font-black
                                  px-2
                                  py-0.5
                                  rounded-full
                                  uppercase

                                  ${
                                    task.status ===
                                    "İşlemde"
                                      ? `
                                        bg-cyan-100
                                        text-cyan-500
                                      `
                                      : `
                                        bg-slate-100
                                        text-slate-400
                                      `
                                  }
                                `}
                              >
                                {task.status}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] font-black text-[#0891B2] font-mono">

                              <Clock size={12} />

                              {task.time}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="h-px w-full bg-slate-100 mt-4 self-start" />
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
    <div className="min-h-screen bg-[#EEF7F8] p-6 space-y-6 animate-in fade-in duration-500 font-sans">

      {/* TOPBAR */}
      <div
        className="
          bg-white/80
          backdrop-blur-xl
          rounded-[24px]
          p-2
          shadow-[0_8px_30px_rgba(15,23,42,0.04)]
          border
          border-white/40
          flex
          items-center
          justify-between
        "
      >

        <div className="flex gap-2">

          {[
            "Görev Panosu",
            "Zaman Çizelgesi",
            "Takvim",
            "Raporlar",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6
                py-2.5
                rounded-xl
                text-sm
                font-bold
                transition-all

                ${
                  activeTab === tab
                    ? `
                      bg-gradient-to-r
                      from-[#1EAEDB]
                      to-[#0E7490]
                      text-white
                      shadow-lg
                    `
                    : `
                      text-slate-500
                      hover:bg-slate-50
                    `
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ADD TASK */}
        <button
          onClick={() => setShowAddModal(true)}
          className="
            flex
            items-center
            gap-2
            bg-gradient-to-r
            from-[#E0F7FA]
            to-[#CFFAFE]
            text-[#0891B2]
            px-4
            py-2
            rounded-xl
            font-bold
            text-sm
            hover:scale-[1.02]
            transition-all
          "
        >
          <Plus size={18} />

          Yeni Görev
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === "Görev Panosu" ? (
        <TaskBoard />
      ) : activeTab === "Zaman Çizelgesi" ? (
        <TimelineBoard />
      ) : (
        <div
          className="
            h-[600px]
            bg-white/70
            backdrop-blur-xl
            rounded-[32px]
            flex
            items-center
            justify-center
            border-2
            border-dashed
            border-slate-100
          "
        >

          <div className="text-center">

            <div
              className="
                w-20
                h-20
                bg-[#F4FBFC]
                rounded-full
                flex
                items-center
                justify-center
                mx-auto
                mb-4
                text-slate-300
              "
            >
              <CalendarIcon size={40} />
            </div>

            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              "{activeTab}" Sayfası Hazırlanıyor
            </p>
          </div>
        </div>
      )}

      {/* MODAL */}
      {showAddModal && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            p-4
            bg-slate-900/40
            backdrop-blur-sm
          "
        >

          <div
            className="
              bg-white
              w-full
              max-w-md
              rounded-[32px]
              p-8
              shadow-2xl
            "
          >

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-black text-slate-800">
                Yeni Görev Oluştur
              </h2>

              <button
                onClick={() =>
                  setShowAddModal(false)
                }
                className="text-slate-400 hover:text-slate-600"
              >
                <X />
              </button>
            </div>

            <form
              onSubmit={handleAddTask}
              className="space-y-4"
            >

              <div>

                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                  Başlık
                </label>

                <input
                  required
                  className="
                    w-full
                    p-4
                    bg-slate-50
                    rounded-2xl
                    border-none
                    outline-none
                    text-sm
                    font-bold
                  "
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                    Saat
                  </label>

                  <input
                    type="time"
                    className="
                      w-full
                      p-4
                      bg-slate-50
                      rounded-2xl
                      border-none
                      outline-none
                      text-sm
                      font-mono
                      font-bold
                    "
                    value={newTask.time}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        time: e.target.value,
                      })
                    }
                  />
                </div>

                <div>

                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                    Gün
                  </label>

                  <input
                    type="number"
                    className="
                      w-full
                      p-4
                      bg-slate-50
                      rounded-2xl
                      border-none
                      outline-none
                      text-sm
                      font-bold
                    "
                    value={newTask.day}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        day: parseInt(
                          e.target.value
                        ),
                      })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="
                  w-full
                  py-4
                  bg-gradient-to-r
                  from-[#06B6D4]
                  to-[#0891B2]
                  text-white
                  rounded-2xl
                  font-black
                  text-sm
                  uppercase
                  tracking-widest
                  mt-4
                  shadow-lg
                "
              >
                Kaydet
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;