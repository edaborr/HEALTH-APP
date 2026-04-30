import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toast from "./context/Toast";
import Login from "./pages/Login";
import DoctorPatientsPage from "./pages/doctor/DoctorPatientsPage";

// Layouts
import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout";
import PharmacyLayout from "./layouts/PharmacyLayout";

// Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PharmacyDashboard from "./pages/pharmacist/PharmacyDashboard";

// Extra pages
import RequestsPage from "./pages/patient/RequestsPage";
import DoctorRequestsPage from "./pages/doctor/DoctorRequestsPage";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ================= DOKTOR ================= */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorDashboard />} />
          <Route path="requests" element={<DoctorRequestsPage />} />

          {/* 🔥 BURAYI DÜZELTTİM */}
          <Route path="patients" element={<DoctorPatientsPage />} />

          <Route path="prescriptions" element={<div>Reçeteler</div>} />
          <Route path="profile" element={<div>Profil</div>} />
        </Route>

        {/* ================= HASTA ================= */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute role="patient">
              <PatientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PatientDashboard />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="tracking" element={<div>Kullanım Takibi</div>} />
          <Route path="pharmacy" element={<div>Eczane</div>} />
          <Route path="reminders" element={<div>Hatırlatmalar</div>} />
          <Route path="profile" element={<div>Profil</div>} />
        </Route>

        {/* ================= ECZACI ================= */}
        <Route
          path="/pharmacist"
          element={
            <ProtectedRoute role="pharmacist">
              <PharmacyLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PharmacyDashboard />} />
        </Route>

      </Routes>

      <Toast />
    </BrowserRouter>
  );
}

export default App;