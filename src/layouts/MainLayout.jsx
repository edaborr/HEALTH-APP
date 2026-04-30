import { Outlet, NavLink } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold mb-8 text-blue-600">
          Health System
        </h2>

        <nav className="space-y-2">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/doctor/prescriptions"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Reçeteler
          </NavLink>

          <NavLink
            to="/doctor/requests"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Talepler
          </NavLink>
          <NavLink
           to="/patient"
           className={({ isActive }) =>
            `block p-3 rounded-lg ${
              isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-100"
              }`
            }
          >
  Hasta Paneli
</NavLink>

        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="bg-white p-4 shadow flex justify-between items-center">
          <h1 className="font-semibold">Hoşgeldiniz, Dr. Ahmet</h1>
          <div>🔔 ⚙️</div>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default MainLayout;