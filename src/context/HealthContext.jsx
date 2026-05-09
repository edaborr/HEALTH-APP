import { createContext, useContext, useState } from "react";

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [history, setHistory] = useState([
    { id: 1, date: "07 Mayıs", time: "10:30", type: "tansiyon", value: "120/80", status: "Normal" },
    { id: 2, date: "07 Mayıs", time: "14:00", type: "seker", value: "95", status: "Normal" },
  ]);

  // Yeni veri ekleme fonksiyonu
  const addRecord = (type, value, status) => {
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long' }),
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      type,
      value,
      status,
    };
    setHistory([newRecord, ...history]);
  };

  const deleteRecord = (id) => setHistory(history.filter(h => h.id !== id));

  return (
    <HealthContext.Provider value={{ history, addRecord, deleteRecord }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);