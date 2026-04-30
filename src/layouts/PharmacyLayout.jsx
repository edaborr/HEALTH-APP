import { NavLink, Outlet } from "react-router-dom";

const PharmacyLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 transition">

      {/* SIDEBAR */}
      <div className="w-64 bg-white dark:bg-gray-900 text-black dark:text-white p-5 shadow flex flex-col justify-between transition">

        <div>
          <h2 className="text-xl font-bold mb-6 text-blue-600">
            Eczacı Panel
          </h2>

          <nav className="flex flex-col gap-2">

            <NavLink
              to="/pharmacist"
              className={({ isActive }) =>
                `p-2 rounded transition ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/pharmacist/requests"
              className={({ isActive }) =>
                `p-2 rounded transition ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Reçeteler
            </NavLink>

            <NavLink
              to="/pharmacist/profile"
              className={({ isActive }) =>
                `p-2 rounded transition ${
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

        {/* ALT */}
        <div className="text-xs text-gray-400 dark:text-gray-500">
          v1.0 Health App
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-950 text-black dark:text-white transition">
        <Outlet />
      </div>
    </div>
  );
};

export default PharmacyLayout;