import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // ➕ TASK EKLE
  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  // 🔄 STATUS DEĞİŞTİR (kanban için)
  const updateTaskStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status } : t
      )
    );
  };

  // ❌ TASK SİL (ileride lazım olacak)
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ✏️ TASK GÜNCELLE (ileride modal vs için)
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTaskStatus,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);