import { useRequests } from "../../context/RequestContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Search, Pill, ArrowUpRight, FileText, 
  PlusCircle, Calendar, AlertCircle, Info, X, Activity // X ve Activity eklendi
} from "lucide-react";

// --- MODAL BİLEŞENİ ---
const PatientDetailModal = ({ patient, onClose }) => {
  if (!patient) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 bg-[#F8FAFC] border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1E293B]">{patient.name}</h2>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">Hasta Dosyası • {patient.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-200 rounded-xl transition-colors text-slate-400">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Yaş</p>
              <p className="font-bold text-blue-900">{patient.age} Yaşında</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-2xl">
              <p className="text-[10px] font-black text-purple-400 uppercase mb-1">Kan Grubu</p>
              <p className="font-bold text-purple-900">A Rh (+)</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl">
              <p className="text-[10px] font-black text-emerald-400 uppercase mb-1">Son Ziyaret</p>
              <p className="font-bold text-emerald-900">{patient.lastVisit}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Activity size={20} className="text-blue-500" /> Tıbbi Notlar
            </h3>
            <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50 text-sm text-slate-600 leading-relaxed">
              Hastanın kronik takibi devam etmektedir. İlaç kullanım uyumu yüksek. 
              Son tetkiklerde değerler stabil gözlemlenmiştir.
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Pill size={20} className="text-blue-500" /> Takip Edilen İlaçlar
            </h3>
            <div className="flex flex-wrap gap-2">
              {patient.chronicMeds?.map((med, i) => (
                <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm">
                  {med}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-50 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest">
            Dosyayı Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

const patientsData = [
  { id: 1, name: "Ali", email: "ali@mail.com", chronicMeds: ["Metformin", "Lisinopril", "Aspirin"], age: 45, lastVisit: "12 Nisan" },
  { id: 2, name: "Ayşe", email: "ayse@mail.com", chronicMeds: ["Levotiron", "Ventolin"], age: 32, lastVisit: "20 Mart" },
  { id: 3, name: "Mehmet", email: "mehmet@mail.com", chronicMeds: ["Atorvastatin", "Ramipril", "Glifor", "Coraspin"], age: 62, lastVisit: "05 Nisan" }
];

const DoctorPatientsPage = () => {
  const { requests } = useRequests();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // 🔥 MODAL İÇİN STATE
  const [selectedPatientForModal, setSelectedPatientForModal] = useState(null);

  const activePatients = Object.values(
    requests.reduce((acc, req) => {
      const details = patientsData.find(p => p.email === req.patientEmail) || {};
      acc[req.patientEmail] = {
        name: req.patientName,
        email: req.patientEmail,
        ...details
      };
      return acc;
    }, {})
  ).filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleWritePrescription = (patient) => {
    navigate("/doctor/prescriptions", { state: { selectedPatient: patient } });
  };

  // 🔥 NAVIGATE YERİNE MODAL'I AÇIYORUZ
  const handleOpenFolder = (patient) => {
    setSelectedPatientForModal(patient);
  };

  return (
    <div className="min-h-screen w-full space-y-8 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-gray-800 tracking-tight">Hastalarım</h1>
          <p className="text-gray-500 font-medium mt-1">Toplam {activePatients.length} kayıtlı hasta portföyü</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-white flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center"><AlertCircle size={20}/></div>
            <div>
              <p className="text-[10px] font-black text-gray-400">KRİTİK TAKİP</p>
              <p className="text-xl font-black">{activePatients.filter(p => p.chronicMeds?.length > 3).length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-white flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center"><Info size={20}/></div>
            <div>
              <p className="text-[10px] font-black text-gray-400">STABİL</p>
              <p className="text-xl font-black">{activePatients.filter(p => p.chronicMeds?.length <= 3).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Hasta adı ile ara..." 
          className="w-full pl-12 pr-6 py-3.5 bg-white rounded-2xl border-none shadow-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePatients.map((patient) => (
          <div key={patient.email} className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-6 border border-white shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner">
                  <User size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{patient.name}</h3>
                  <p className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                    <Calendar size={12}/> {patient.age} Yaş • Son: {patient.lastVisit}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleOpenFolder(patient)}
                className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm"
              >
                <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Pill size={12}/> Takip Edilen İlaçlar
              </p>
              <div className="flex flex-wrap gap-2">
                {patient.chronicMeds?.map((med, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-gray-100 text-gray-600 rounded-lg text-[10px] font-bold shadow-sm">
                    {med}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleWritePrescription(patient)}
                className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-2xl text-[11px] font-black hover:brightness-110 transition-all shadow-md shadow-blue-100"
              >
                <PlusCircle size={16} /> REÇETE YAZ
              </button>
              <button 
                onClick={() => handleOpenFolder(patient)}
                className="flex items-center justify-center gap-2 py-3 bg-white text-gray-600 border border-gray-100 rounded-2xl text-[11px] font-black hover:bg-gray-50 transition-all shadow-sm"
              >
                <FileText size={16} /> DOSYA AÇ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 MODAL RENDER */}
      <PatientDetailModal 
        patient={selectedPatientForModal} 
        onClose={() => setSelectedPatientForModal(null)} 
      />
    </div>
  );
};

export default DoctorPatientsPage;