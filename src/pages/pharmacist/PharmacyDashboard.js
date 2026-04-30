import { useRequests } from "../../context/RequestContext";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

const PharmacyDashboard = () => {
  const { requests, prepareRequest, deliverRequest } = useRequests();
  const { user } = useAuth();
  const { notifications, markAllAsRead } = useNotifications();
  const { dark, toggleTheme } = useTheme(); // ✅ DOĞRU YER

  const [showNotif, setShowNotif] = useState(false);

  const myNotifications = notifications.filter(
    (n) => n.userEmail === user?.email
  );

  const unreadCount = myNotifications.filter((n) => !n.read).length;

  const toggleNotif = () => {
    setShowNotif((s) => !s);
    if (user?.email) markAllAsRead(user.email);
  };

  const list = requests.filter(
    (r) =>
      r.status === "approved" ||
      r.status === "prepared" ||
      r.status === "delivered"
  );

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
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          <span>⚙️</span>
        </div>
      </div>

      {/* LIST */}
      <h2 className="text-lg font-semibold text-black dark:text-white">
        Reçeteler
      </h2>

      {list.length === 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center text-gray-500">
          📭 Reçete yok
        </div>
      )}

      <div className="space-y-4">
        {list.map((req) => (
          <div
            key={req.id}
            className="bg-white dark:bg-gray-800 text-black dark:text-white p-5 rounded-2xl shadow flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <p className="font-semibold">{req.medicine}</p>
              <p className="text-sm text-gray-500">{req.patientName}</p>
              <p className="text-xs text-gray-400">
                {new Date(req.createdAt).toLocaleString()}
              </p>

              {req.status === "approved" && (
                <span className="text-green-600 dark:text-green-400">
                  Onaylandı
                </span>
              )}
              {req.status === "prepared" && (
                <span className="text-blue-600 dark:text-blue-400">
                  Hazırlandı
                </span>
              )}
              {req.status === "delivered" && (
                <span className="text-gray-600 dark:text-gray-300">
                  Teslim Edildi
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {req.status === "approved" && (
                <button
                  onClick={() => prepareRequest(req.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Hazırla
                </button>
              )}

              {req.status === "prepared" && (
                <button
                  onClick={() => deliverRequest(req.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Teslim Et
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyDashboard;