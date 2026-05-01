export const patients = [
  {
    id: 1,
    name: "Ali",
    email: "ali@mail.com",
    password: "123",
    role: "patient",
    age: 45,
    gender: "Erkek",
    diagnosis: "Hipertansiyon & Tip-2 Diyabet", // Temel Tanı
    allergies: ["Penisilin", "Polen"], // Kritik Güvenlik Verisi
    chronicMeds: ["Metformin", "Lisinopril", "Aspirin"],
    bloodType: "A Rh+"
  },
  {
    id: 2,
    name: "Ayşe",
    email: "ayse@mail.com",
    password: "123",
    role: "patient",
    age: 32,
    gender: "Kadın",
    diagnosis: "Astım",
    allergies: [], 
    chronicMeds: ["Levotiron", "Ventolin"],
    bloodType: "0 Rh-"
  },
  {
    id: 3,
    name: "Mehmet",
    email: "mehmet@mail.com",
    password: "123",
    role: "patient",
    age: 62,
    gender: "Erkek",
    diagnosis: "Hiperlipidemi & Kalp Yetmezliği",
    allergies: ["Sülfonamid"],
    chronicMeds: ["Atorvastatin", "Ramipril", "Glifor", "Coraspin"],
    bloodType: "B Rh+"
  },
  // Doktor ve Eczacı rolleri sabit kalabilir
  { id: 4, email: "doctor@mail.com", password: "123", role: "doctor", name: "Dr. Ahmet" },
  { id: 5, email: "pharmacy@mail.com", password: "123", role: "pharmacist", name: "Eczacı Mehmet" }
];

// İlaçları sadece isim değil, birer tıbbi obje olarak tanımlıyoruz
export const commonMeds = [
  { name: "Parol", defaultDosage: "500mg", instruction: "Tok Karnına", frequency: "1x1" },
  { name: "Nurofen", defaultDosage: "200mg", instruction: "Tok Karnına", frequency: "2x1" },
  { name: "Dolorex", defaultDosage: "50mg", instruction: "Aç/Tok Farketmez", frequency: "1x1" },
  { name: "Augmentin", defaultDosage: "1000mg", instruction: "Tok Karnına", frequency: "2x1" },
  { name: "Majezik", defaultDosage: "100mg", instruction: "Tok Karnına", frequency: "1x1" }
];