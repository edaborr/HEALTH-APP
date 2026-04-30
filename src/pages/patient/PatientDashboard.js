import { useState } from "react";
import { useRequests } from "../../context/RequestContext";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useTheme } from "../../context/ThemeContext";

const PatientDashboard = () => {
  const { requests } = useRequests();
  const { user } = useAuth();
  const { notifications, markAllAsRead } = useNotifications();
  const { dark, toggleTheme } = useTheme(); // ✅ DOĞRU YER

  const [showNotif, setShowNotif] = useState(false);

  const myRequests = requests.filter(
    (req) => req.patientEmail === user?.email
  );

  const myNotifications = notifications.filter(
    (n) => n.userEmail === user?.email
  );

  const unreadCount = myNotifications.filter((n) => !n.read).length;

  const toggleNotif = () => {
    setShowNotif((s) => !s);
    if (user?.email) markAllAsRead(user.email);
  };

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white/70 dark:bg-gray-800 backdrop-blur-xl p-4 rounded-2xl shadow relative">
        <h1 className="text-xl font-semibold text-black dark:text-white">
          Hoşgeldiniz,{" "}
          <span className="text-blue-600">{user?.name}</span>
        </h1>

        <div className="flex gap-4 text-lg relative items-center">

          {/* 🌙 DARK MODE */}
          <button onClick={toggleTheme}>
            {dark ? "🌙" : "☀️"}
          </button>

          {/* 🔔 */}
          <div className="relative cursor-pointer" onClick={toggleNotif}>
            🔔
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

          {/* PANEL */}
          {showNotif && (
            <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl shadow w-72 z-10 animate-fadeIn">
              <h3 className="font-semibold mb-2">Bildirimler</h3>

              {myNotifications.length === 0 && (
                <p className="text-gray-500 text-sm">Bildirim yok</p>
              )}

              {myNotifications.map((n) => (
                <div key={n.id} className="text-sm border-b py-2">
                  <p>{n.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          <span>⚙️</span>
        </div>
      </div>

      {/* LIST */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-black dark:text-white">
          Reçete Durumu
        </h2>

        {myRequests.length === 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center text-gray-500">
            📭 Talep yok
          </div>
        )}

        <div className="space-y-3">
          {myRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl shadow flex justify-between"
            >
              <span>{req.medicine}</span>

              {req.status === "pending" && <span>Bekliyor</span>}
              {req.status === "approved" && <span>Onaylandı</span>}
              {req.status === "prepared" && <span>Hazırlandı</span>}
              {req.status === "delivered" && <span>✔ Teslim</span>}
              {req.status === "rejected" && (
                <span className="text-red-500">Reddedildi</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;