import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toast from "./context/Toast";
import Login from "./pages/Login";
import DoctorPatientsPage from "./pages/doctor/DoctorPatientsPage";
import { TaskProvider } from "./context/TaskContext";
import DoctorProfilePage from "./pages/doctor/DoctorProfilePage";

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
// 🔥 Yeni eklediğimiz sayfa buraya import edildi
import DoctorPrescriptionsPage from "./pages/doctor/DoctorPrescriptionsPage"; 

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";
import TaskPage from "./pages/doctor/TaskPage";
import MessagesPage from "./pages/doctor/MessagesPage";
import { MessageProvider } from "./context/MessageContext";

function App() {
  return (
    <MessageProvider>
  <TaskProvider>
    <BrowserRouter>
        <Routes>

          {/* LOGIN */}
          <Route path="/" element={<Login />} />

          // ... Diğer importlar ...

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
  <Route path="patients" element={<DoctorPatientsPage />} />
  <Route path="prescriptions" element={<DoctorPrescriptionsPage />} />
  <Route path="messages" element={<MessagesPage />} />
  
  {/* ✅ DOĞRU KULLANIM: Diğer iki satırı silip sadece bunu bırakın */}
  <Route path="profile" element={<DoctorProfilePage />} />
  
  <Route path="tasks" element={<TaskPage />} />
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
  </TaskProvider>
</MessageProvider>
  );
}

export default App;