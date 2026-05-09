import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Toast from "./context/Toast";
import Login from "./pages/Login";

import { TaskProvider } from "./context/TaskContext";
import { HealthProvider } from "./context/HealthContext";
import { MessageProvider } from "./context/MessageContext";

// Layoutlar
import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout";
import PharmacyLayout from "./layouts/PharmacyLayout";

// ================= HASTA =================
import PatientDashboard from "./pages/patient/PatientDashboard";
import HealthTracking from "./pages/patient/HealthTracking";
import HistoryPage from "./pages/patient/HistoryPage";
import MedicationTracker from "./pages/patient/MedicationTracker";
import ProfilePage from "./pages/patient/ProfilePage";
import RequestsPage from "./pages/patient/RequestsPage";

// ================= ECZACI =================
import PharmacyDashboard from "./pages/pharmacist/PharmacyDashboard";
import InventoryPage from "./pages/pharmacist/InventoryPage";
import PharmacyPage from "./pages/pharmacist/PharmacyPage";
import SettingsPage from "./pages/pharmacist/SettingsPage";

// ================= DOKTOR =================
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorRequestsPage from "./pages/doctor/DoctorRequestsPage";
import DoctorPatientsPage from "./pages/doctor/DoctorPatientsPage";
import DoctorPrescriptionsPage from "./pages/doctor/DoctorPrescriptionsPage";
import DoctorProfilePage from "./pages/doctor/DoctorProfilePage";
import TaskPage from "./pages/doctor/TaskPage";
import MessagesPage from "./pages/doctor/MessagesPage";

// Güvenlik
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <MessageProvider>
      <TaskProvider>
        <HealthProvider>
          <BrowserRouter>
            <Routes>

              {/* LOGIN */}
              <Route path="/" element={<Login />} />

              {/* ================= HASTA PANELİ ================= */}
              <Route
                path="/patient"
                element={
                  <ProtectedRoute role="patient">
                    <PatientLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<PatientDashboard />} />
                <Route path="tracking" element={<HealthTracking />} />
                <Route path="history" element={<HistoryPage />} />
                <Route path="profile" element={<ProfilePage />} />

                <Route path="medicines" element={<MedicationTracker />} />
                <Route path="medicine" element={<MedicationTracker />} />

                <Route path="pharmacy" element={<RequestsPage />} />
                <Route path="requests" element={<RequestsPage />} />

                <Route path="reminders" element={<div>Hatırlatmalar</div>} />
              </Route>

              {/* ================= ECZACI PANELİ ================= */}
              <Route
                path="/pharmacist"
                element={
                  <ProtectedRoute role="pharmacist">
                    <PharmacyLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<PharmacyDashboard />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="requests" element={<PharmacyPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="profile" element={<PharmacyDashboard />} />
              </Route>

              {/* ================= DOKTOR PANELİ ================= */}
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
                <Route path="profile" element={<DoctorProfilePage />} />
                <Route path="tasks" element={<TaskPage />} />
              </Route>

              {/* HATALI URL */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>

            <Toast />
          </BrowserRouter>
        </HealthProvider>
      </TaskProvider>
    </MessageProvider>
  );
}

export default App;