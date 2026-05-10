import { useRequests } from "../../context/RequestContext";
import { patients } from "../../data/patients";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Search, Pill, ArrowUpRight, FileText, 
  PlusCircle, Calendar, AlertCircle, Info, X, 
  Activity, FlaskConical, History, ClipboardList, TrendingUp, Clock, Send
} from "lucide-react";

// --- YARDIMCI BİLEŞEN: HASTA DETAY MODALI ---
const PatientDetailModal = ({ patient, onClose }) => {
  const [activeTab, setActiveTab] = useState("Genel");
  const [noteText, setNoteText] = useState("");
  const [patientData, setPatientData] = useState(patient);

  useEffect(() => {
    setPatientData(patient);
  }, [patient]);

  if (!patient || !patientData) return null;

  const tabs = [
    { id: "Genel", icon: <User size={16}/> },
    { id: "Reçeteler", icon: <Pill size={16}/> },
    { id: "Laboratuvar", icon: <FlaskConical size={16}/> },
    { id: "Notlar", icon: <ClipboardList size={16}/> },
    { id: "Geçmiş", icon: <History size={16}/> }
  ];

  const addPatientNote = () => {
    if (!noteText.trim()) return;
    const newNote = {
      id: Date.now(),
      text: noteText,
      doctor: "Dr. Ahmet",
      createdAt: new Date().toLocaleString("tr-TR"),
    };
    setPatientData((prev) => ({
      ...prev,
      notes: [newNote, ...(prev.notes || [])],
    }));
    setNoteText("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white/90 backdrop-blur-2xl w-full max-w-3xl rounded-[40px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Modal Header - Petrol Mavisi Tema */}
        <div className="p-8 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#1589a0] rounded-3xl flex items-center justify-center text-white shadow-lg shadow-[#1589a0]/20">
              <User size={32} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-gray-800">{patientData.name}</h2>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                  patientData.riskScore > 70 ? "bg-red-100 text-red-600" : "bg-[#1589a0]/10 text-[#1589a0]"
                }`}>
                  Risk Skoru: {patientData.riskScore}/100
                </span>
              </div>
              <p className="text-gray-500 font-bold text-sm">{patientData.email} • {patientData.age} Yaş</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:rotate-90">
            <X size={24} />
          </button>
        </div>

        {/* Sekme Navigasyonu */}
        <div className="flex px-8 border-b border-gray-50 bg-white/50 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id 
                  ? "border-[#1589a0] text-[#1589a0] bg-[#1589a0]/5" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.icon} {tab.id}
            </button>
          ))}
        </div>

        {/* Modal İçerik Alanı */}
        <div className="p-8 overflow-y-auto grow space-y-6">
          {activeTab === "Genel" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 bg-gray-50 rounded-[24px] border border-gray-100">
                  <p className="text-[10px] font-black text-[#1589a0] uppercase mb-1">Kan Grubu</p>
                  <p className="font-bold text-gray-800 text-lg">{patientData.bloodType}</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-[24px] border border-gray-100">
                  <p className="text-[10px] font-black text-[#1589a0] uppercase mb-1">Son Muayene</p>
                  <p className="font-bold text-gray-800 text-lg">{patientData.lastVisit}</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-[24px] border border-gray-100">
                  <p className="text-[10px] font-black text-[#1589a0] uppercase mb-1">Boy / Kilo</p>
                  <p className="font-bold text-gray-800 text-lg">{patientData.height} / {patientData.weight}</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-[24px] border border-gray-100 shadow-sm">
                <h4 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2">
                  <Activity size={16} className="text-[#1589a0]" /> Aktif Tanılar
                </h4>
                <div className="flex flex-wrap gap-2">
                  {patientData.diagnosis?.map((t) => (
                    <span key={t} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Laboratuvar" && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
              {[
                { label: "HbA1c", val: patientData.labResults?.hba1c, unit: "%", status: patientData.labResults?.hba1c > 6.5 ? "high" : "normal" },
                { label: "Kreatinin", val: patientData.labResults?.creatinine, unit: "mg/dL", status: patientData.labResults?.creatinine > 1.2 ? "high" : "normal" },
                { label: "LDL Kolesterol", val: patientData.labResults?.ldl, unit: "mg/dL", status: patientData.labResults?.ldl > 100 ? "high" : "normal" },
                { label: "Açlık Kan Şekeri", val: patientData.labResults?.glucose, unit: "mg/dL", status: patientData.labResults?.glucose > 100 ? "high" : "normal" }
              ].map((lab, i) => (
                <div key={i} className="p-5 border border-gray-100 rounded-3xl flex justify-between items-center bg-white shadow-sm">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">{lab.label}</p>
                    <p className="text-xl font-black text-gray-800">{lab.val} <span className="text-xs font-medium text-gray-400">{lab.unit}</span></p>
                  </div>
                  {lab.status === "high" && <AlertCircle className="text-orange-500" size={20}/>}
                </div>
              ))}
            </div>
          )}

          {activeTab === "Notlar" && (
            <div className="space-y-5">
              {patientData.notes?.map((note) => (
                <div key={note.id} className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-black text-gray-700">{note.doctor}</h4>
                    <span className="text-xs text-gray-400 font-bold">{note.createdAt}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">{note.text}</p>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <input
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Doktor notu ekle..."
                  className="flex-1 h-14 px-5 rounded-2xl border border-gray-200 outline-none focus:border-[#1589a0] text-sm"
                />
                <button
                  onClick={addPatientNote}
                  className="px-6 bg-[#1589a0] text-white rounded-2xl font-black text-sm hover:brightness-110 transition-all"
                >
                  Kaydet
                </button>
              </div>
            </div>
          )}

          {activeTab === "Geçmiş" && (
            <div className="space-y-4">
              {patientData.appointments?.map((appt) => (
                <div key={appt.id} className="flex gap-4 p-5 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-[#1589a0] mt-2 shadow-sm shadow-[#1589a0]/50" />
                  <div>
                    <h4 className="font-black text-gray-800">{appt.department}</h4>
                    <p className="text-sm text-gray-500">{appt.hospital} • {appt.doctor}</p>
                    <span className="text-xs font-bold text-gray-400">{appt.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Reçeteler" && (
            <div className="space-y-4">
              {patientData.prescriptionHistory?.map((rx) => (
                <div key={rx.id} className="p-5 bg-white rounded-3xl border border-gray-100 flex justify-between items-center shadow-sm">
                  <div>
                    <h4 className="font-black text-gray-800">{rx.medicine}</h4>
                    <p className="text-sm text-gray-500 font-medium">{rx.status}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-400">{rx.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-50 bg-white flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-[22px] font-black text-xs hover:bg-gray-200 transition-all uppercase tracking-widest">
            Kapat
          </button>
          <button className="flex-[2] py-4 bg-[#1589a0] text-white rounded-[22px] font-black text-xs shadow-lg shadow-[#1589a0]/20 hover:scale-[1.02] transition-all uppercase tracking-widest flex items-center justify-center gap-2">
            <PlusCircle size={18}/> Yeni Kayıt Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

// --- ANA SAYFA: HASTALARIM ---
const DoctorPatientsPage = () => {
  const { requests } = useRequests();
  const navigate = useNavigate();
  
  const [selectedPatientForModal, setSelectedPatientForModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const activePatients = useMemo(() => {
    return patients
      .filter((p) => p.role === "patient")
      .map((patient) => {
        let risk = 20;
        if (patient.age > 60) risk += 30;
        if (patient.chronicMeds?.length > 3) risk += 25;
        if (patient.name.includes("Ali")) risk += 15;

        return {
          ...patient,
          riskScore: risk,
          lastVisit: patient.id === 1 ? "12 Nisan" : patient.id === 2 ? "20 Mart" : "05 Nisan",
          lastPrescription: "2 gün önce"
        };
      })
      .filter((p) => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.chronicMeds?.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [searchTerm]);

  const handleWritePrescription = (patient) => {
    navigate("/doctor/prescriptions", { state: { selectedPatient: patient } });
  };

  return (
    <div className="min-h-screen w-full space-y-8 p-8 bg-[#F8FAFC]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">Hastalarım</h1>
          <div className="text-gray-400 font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-[#1589a0] rounded-full animate-pulse shadow-sm shadow-[#1589a0]"/>
            Sistemde aktif {activePatients.length} kayıtlı hasta bulunuyor
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center"><AlertCircle size={24}/></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Yüksek Risk</p>
              <p className="text-2xl font-black text-gray-800">{activePatients.filter(p => p.riskScore > 60).length}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-[#1589a0] rounded-2xl flex items-center justify-center"><TrendingUp size={24}/></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Ortalama Risk</p>
              <p className="text-2xl font-black text-gray-800">
                {(activePatients.reduce((acc, curr) => acc + curr.riskScore, 0) / activePatients.length || 0).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-xl group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1589a0] transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Hasta adı veya ilaç adına göre akıllı arama..." 
          className="w-full pl-16 pr-8 py-5 bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] outline-none focus:border-[#1589a0]/30 transition-all font-bold text-gray-700"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activePatients.map((p) => (
          <div key={p.id} className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl font-black text-[10px] shadow-sm ${
              p.riskScore > 60 ? "bg-red-500 text-white" : "bg-[#1589a0] text-white"
            }`}>
              RİSK: {p.riskScore}
            </div>

            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 bg-gray-50 text-[#1589a0] rounded-[24px] flex items-center justify-center shadow-inner group-hover:bg-[#1589a0] group-hover:text-white transition-all duration-500">
                <User size={32} />
              </div>
              <div>
                <h3 className="font-black text-gray-800 text-xl mb-1">{p.name}</h3>
                <div className="text-[11px] text-gray-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                  <Calendar size={13} className="text-[#1589a0]"/> {p.age} Yaş • Son: {p.lastVisit}
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center px-1">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Pill size={14} className="text-[#1589a0]"/> Kronik İlaçlar
                </div>
                <span className="text-[10px] font-bold text-[#1589a0] bg-[#1589a0]/5 px-2 py-0.5 rounded-lg">
                  {p.lastPrescription}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.chronicMeds?.map((med, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-600 rounded-2xl text-[11px] font-bold group-hover:bg-white transition-colors">
                    {med}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleWritePrescription(p)}
                className="flex items-center justify-center gap-2 py-4 bg-[#1589a0] text-white rounded-[20px] text-xs font-black hover:brightness-110 transition-all shadow-lg shadow-[#1589a0]/20 hover:scale-[1.05]"
              >
                <PlusCircle size={18} /> REÇETE YAZ
              </button>
              <button 
                onClick={() => setSelectedPatientForModal(p)}
                className="flex items-center justify-center gap-2 py-4 bg-white text-gray-600 border border-gray-100 rounded-[20px] text-xs font-black hover:bg-gray-50 transition-all hover:scale-[1.05]"
              >
                <FileText size={18} /> DOSYA AÇ
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPatientForModal && (
        <PatientDetailModal 
          patient={selectedPatientForModal} 
          onClose={() => setSelectedPatientForModal(null)} 
        />
      )}
      
    </div>
  );
};

export default DoctorPatientsPage;