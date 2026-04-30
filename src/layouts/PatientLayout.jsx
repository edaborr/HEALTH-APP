import { Outlet, NavLink } from "react-router-dom";

const PatientLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 transition">

      {/* SIDEBAR */}
      <div className="w-64 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md p-5 transition flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-bold mb-6 text-blue-600 tracking-wide">
            Health System
          </h2>

          <nav className="space-y-2">

            <NavLink
              to="/patient"
              className={({ isActive }) =>
                `block p-2 rounded transition ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/patient/requests"
              className={({ isActive }) =>
                `block p-2 rounded transition ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Taleplerim
            </NavLink>

            <NavLink
              to="/patient/tracking"
              className={({ isActive }) =>
                `block p-2 rounded transition ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Kullanım Takibi
            </NavLink>

            <NavLink
              to="/patient/pharmacy"
              className={({ isActive }) =>
                `block p-2 rounded transition ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Eczane
            </NavLink>

            <NavLink
              to="/patient/reminders"
              className={({ isActive }) =>
                `block p-2 rounded transition ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Hatırlatmalar
            </NavLink>

            <NavLink
              to="/patient/profile"
              className={({ isActive }) =>
                `block p-2 rounded transition ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Profil
            </NavLink>

          </nav>
        </div>

        {/* ALT KISIM (istersen logout vs ekleyebilirsin) */}
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-6">
          v1.0 Health App
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 overflow-auto text-black dark:text-white transition">
        <Outlet />
      </div>

    </div>
  );
};

export default PatientLayout;