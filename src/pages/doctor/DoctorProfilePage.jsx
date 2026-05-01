import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Award, 
  ShieldCheck, Calendar, Users, FileText, 
  Settings, Edit3, Camera, CheckCircle, Save, X
} from 'lucide-react';

const DoctorProfilePage = () => {
  // Düzenleme modu state'i
  const [isEditing, setIsEditing] = useState(false);
  
  // Doktor verilerini state'e aldık ki güncellenebilsin
  const [doctorData, setDoctorData] = useState({
    name: "Dr. Ahmet Yılmaz",
    title: "Aile Hekimi / Uzman Doktor",
    diplomaNo: "123456-789",
    email: "ahmet.yilmaz@saglik.gov.tr",
    phone: "+90 532 000 00 00",
    address: "Çankaya Aile Sağlığı Merkezi, Oda No: 4",
    patientCount: 3450,
    joinDate: "Ocak 2022",
    eSignatureStatus: "Aktif",
    specialties: ["Kronik Hastalık Takibi", "Diyabet Yönetimi", "Pediyatri"]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Burada API'ye kayıt isteği atılabilir
    alert("Profil bilgileri başarıyla güncellendi!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full p-6 space-y-8 animate-in fade-in duration-700 bg-[#F4F7F9]">
      
      {/* 🚀 ÜST BAŞLIK VE AKSİYONLAR */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-[#1E293B] tracking-tight">Profil Bilgileri</h1>
          <p className="text-slate-500 font-medium mt-1">Sistem üzerindeki profesyonel kimliğinizi yönetin</p>
        </div>
        
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#64A5A5] text-white rounded-2xl font-bold text-[14px] shadow-lg shadow-[#64A5A5]/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Edit3 size={18} /> Profili Düzenle
          </button>
        ) : (
          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-slate-500 border border-slate-200 rounded-2xl font-bold text-[14px] hover:bg-slate-50 transition-all"
            >
              <X size={18} /> İptal
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-[#0077B6] text-white rounded-2xl font-bold text-[14px] shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all"
            >
              <Save size={18} /> Değişiklikleri Kaydet
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 👤 SOL SÜTUN */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full bg-[#E6F0F0] rounded-[40px] flex items-center justify-center text-[#64A5A5]">
                <User size={64} strokeWidth={1.5} />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-xl shadow-md border border-slate-100 text-slate-400 hover:text-[#64A5A5] transition-colors">
                <Camera size={18} />
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <input 
                  name="name"
                  value={doctorData.name} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#64A5A5]/20 rounded-xl text-center font-bold focus:ring-2 focus:ring-[#64A5A5]/10 outline-none"
                />
                <input 
                  name="title"
                  value={doctorData.title} 
                  onChange={handleChange}
                  className="w-full px-4 py-1 border border-[#64A5A5]/20 rounded-xl text-center text-xs font-bold text-[#64A5A5] uppercase outline-none"
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-[#1E293B]">{doctorData.name}</h2>
                <p className="text-[#64A5A5] font-bold uppercase text-xs tracking-widest mt-1">{doctorData.title}</p>
              </>
            )}
            
            <div className="mt-8 pt-8 border-t border-slate-50 space-y-4 text-left">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Mail size={18}/></div>
                {isEditing ? (
                  <input name="email" value={doctorData.email} onChange={handleChange} className="flex-1 text-sm bg-transparent border-b border-slate-100 focus:border-[#64A5A5] outline-none" />
                ) : (
                  <span className="text-sm font-medium">{doctorData.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Phone size={18}/></div>
                {isEditing ? (
                  <input name="phone" value={doctorData.phone} onChange={handleChange} className="flex-1 text-sm bg-transparent border-b border-slate-100 focus:border-[#64A5A5] outline-none" />
                ) : (
                  <span className="text-sm font-medium">{doctorData.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><MapPin size={18}/></div>
                {isEditing ? (
                  <textarea name="address" value={doctorData.address} onChange={handleChange} className="flex-1 text-sm bg-transparent border-b border-slate-100 focus:border-[#64A5A5] outline-none resize-none" rows="2" />
                ) : (
                  <span className="text-sm font-medium leading-tight">{doctorData.address}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 📊 SAĞ SÜTUN */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500"><Users size={24}/></div>
              <div>
                <p className="text-2xl font-black text-slate-800">{doctorData.patientCount}</p>
                <p className="text-xs font-bold text-slate-400 uppercase">Kayıtlı Hasta</p>
              </div>
            </div>
            {/* Diğer metrik kartları... */}
          </div>

          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-8">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-800 mb-6">
                <Award className="text-[#64A5A5]" size={22} /> Uzmanlık Alanları
              </h3>
              <div className="flex flex-wrap gap-3">
                {doctorData.specialties.map((spec, i) => (
                  <span key={i} className="px-4 py-2 bg-[#F0F7F7] text-[#64A5A5] rounded-xl text-sm font-bold border border-[#D1E5E5]">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50">
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-800 mb-6">
                <Settings className="text-[#64A5A5]" size={22} /> Kurumsal Bilgiler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Tescil / Diploma No</p>
                  {isEditing ? (
                    <input name="diplomaNo" value={doctorData.diplomaNo} onChange={handleChange} className="w-full font-bold text-slate-700 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-[#64A5A5]/20" />
                  ) : (
                    <p className="font-bold text-slate-700 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">{doctorData.diplomaNo}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;