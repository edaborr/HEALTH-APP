import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Toast from "./context/Toast";
import Login from "./pages/Login";
import { TaskProvider } from "./context/TaskContext";
import { HealthProvider } from "./context/HealthContext"; 

// Layoutlar (Gezginindeki Layouts klasörüyle uyumlu)
import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout";
import PharmacyLayout from "./layouts/PharmacyLayout";

// Sayfalar - HASTA (Gezginindeki harf duyarlılığına göre düzenlendi)
import PatientDashboard from "./pages/patient/PatientDashboard"; 
import HealthTracking from "./pages/patient/HealthTracking"; 
import HistoryPage from "./pages/patient/HistoryPage"; 
import MedicationTracker from "./pages/patient/MedicationTracker"; 
import ProfilePage from "./pages/patient/ProfilePage";
import RequestsPage from "./pages/patient/RequestsPage"; // GezginindeRequestsPage.jsx olarak görünüyor

// Sayfalar - ECZACI
import PharmacyDashboard from "./pages/pharmacist/PharmacyDashboard";
import InventoryPage from "./pages/pharmacist/InventoryPage"; 
import PharmacyPage from "./pages/pharmacist/PharmacyPage"; 
import SettingsPage from "./pages/pharmacist/SettingsPage";

// Sayfalar - DOKTOR
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorRequestsPage from "./pages/doctor/DoctorRequestsPage";
import DoctorPatientsPage from "./pages/doctor/DoctorPatientsPage";
import DoctorPrescriptionsPage from "./pages/doctor/DoctorPrescriptionsPage"; 
import DoctorProfilePage from "./pages/doctor/DoctorProfilePage";
import TaskPage from "./pages/doctor/TaskPage";

// Güvenlik
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <TaskProvider>
      <HealthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* ================= HASTA PANELİ (TAMİR EDİLDİ) ================= */}
            <Route
              path="/patient"
              element={<ProtectedRoute role="patient"><PatientLayout /></ProtectedRoute>}
            >
              <Route index element={<PatientDashboard />} />
              <Route path="tracking" element={<HealthTracking />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
              
              {/* ÇIKIŞ YAPMA HATASINI ÖNLEYEN KRİTİK YOLLAR */}
              <Route path="medicines" element={<MedicationTracker />} />
              <Route path="medicine" element={<MedicationTracker />} />
              
              {/* Eczane İşlemleri: Hem pharmacy hem requests olarak tanımladık */}
              <Route path="pharmacy" element={<RequestsPage />} />
              <Route path="requests" element={<RequestsPage />} />
            </Route>

            {/* ================= ECZACI PANELİ (TAMİR EDİLDİ) ================= */}
            <Route
              path="/pharmacist"
              element={<ProtectedRoute role="pharmacist"><PharmacyLayout /></ProtectedRoute>}
            >
              <Route index element={<PharmacyDashboard />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="requests" element={<PharmacyPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<PharmacyDashboard />} />
            </Route>

            {/* ================= DOKTOR PANELİ (KORUNDU) ================= */}
            <Route
              path="/doctor"
              element={<ProtectedRoute role="doctor"><DoctorLayout /></ProtectedRoute>}
            >
              <Route index element={<DoctorDashboard />} />
              <Route path="requests" element={<DoctorRequestsPage />} />
              <Route path="patients" element={<DoctorPatientsPage />} />
              <Route path="prescriptions" element={<DoctorPrescriptionsPage />} />
              <Route path="profile" element={<DoctorProfilePage />} />
              <Route path="tasks" element={<TaskPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toast />
        </BrowserRouter>
      </HealthProvider>
    </TaskProvider>
  );
}

export default App;