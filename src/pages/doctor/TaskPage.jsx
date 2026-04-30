import { useState } from "react";
import { useTasks } from "../../context/TaskContext";

const TaskPage = () => {
  const { tasks, addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    if (!title) return;

    addTask({
      id: Date.now(),
      title,
      date,
    });

    setTitle("");
    setDate("");
  };

  return (
    <div className="space-y-6">

      <h1 className="text-xl font-semibold">Görevler</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Görev başlığı"
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-[#6FA9B7] text-white px-4 py-2 rounded"
        >
          Ekle
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="p-3 bg-gray-100 rounded flex justify-between"
          >
            <span>{t.title}</span>
            <span className="text-sm text-gray-500">{t.date}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TaskPage;