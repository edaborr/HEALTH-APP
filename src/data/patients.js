export const patients = [
  {
    id: 1,
    name: "Ali",
    email: "ali@mail.com",
    password: "123",
    role: "patient",

    age: 45,
    gender: "Erkek",
    bloodType: "A Rh+",

    diagnosis: [
      "Hipertansiyon",
      "Tip 2 Diyabet"
    ],

    allergies: ["Penisilin", "Polen"],

    chronicMeds: [
      "Metformin",
      "Lisinopril",
      "Aspirin"
    ],

    riskScore: 35,

    height: "178cm",
    weight: "82kg",

    lastVisit: "12 Nisan",

    labResults: {
      hba1c: "7.1",
      creatinine: "0.9",
      ldl: "130",
      glucose: "110"
    },

    notes: [
      {
        id: 1,
        text: "İlaç uyumu yüksek gözlemlendi.",
        doctor: "Dr. Ahmet",
        createdAt: "08.05.2026 14:32"
      },

      {
        id: 2,
        text: "Son kontrolde tansiyon stabil.",
        doctor: "Dr. Ahmet",
        createdAt: "02.05.2026 11:18"
      }
    ],

    appointments: [
      {
        id: 1,
        hospital: "MedTrack Klinik",
        department: "Kardiyoloji",
        doctor: "Dr. Ahmet",
        date: "12.04.2026"
      },

      {
        id: 2,
        hospital: "MedTrack Klinik",
        department: "Endokrinoloji",
        doctor: "Dr. Elif",
        date: "03.03.2026"
      }
    ],

    prescriptionHistory: [
      {
        id: 1,
        medicine: "Metformin",
        status: "Teslim Edildi",
        date: "01.05.2026"
      },

      {
        id: 2,
        medicine: "Aspirin",
        status: "Arşivlendi",
        date: "15.04.2026"
      }
    ]
  },

  {
    id: 2,
    name: "Ayşe",
    email: "ayse@mail.com",
    password: "123",
    role: "patient",

    age: 32,
    gender: "Kadın",
    bloodType: "0 Rh-",

    diagnosis: [
      "Astım"
    ],

    allergies: [],

    chronicMeds: [
      "Levotiron",
      "Ventolin"
    ],

    riskScore: 20,

    height: "165cm",
    weight: "58kg",

    lastVisit: "20 Mart",

    labResults: {
      hba1c: "5.4",
      creatinine: "0.7",
      ldl: "92",
      glucose: "89"
    },

    notes: [
      {
        id: 1,
        text: "Astım atak sıklığında azalma gözlemlendi.",
        doctor: "Dr. Ahmet",
        createdAt: "07.05.2026 10:15"
      },

      {
        id: 2,
        text: "İnhaler kullanım tekniği tekrar anlatıldı.",
        doctor: "Dr. Ahmet",
        createdAt: "28.04.2026 13:48"
      }
    ],

    appointments: [
      {
        id: 1,
        hospital: "MedTrack Klinik",
        department: "Göğüs Hastalıkları",
        doctor: "Dr. Selin",
        date: "20.03.2026"
      },

      {
        id: 2,
        hospital: "MedTrack Klinik",
        department: "Alerji",
        doctor: "Dr. Ahmet",
        date: "11.02.2026"
      }
    ],

    prescriptionHistory: [
      {
        id: 1,
        medicine: "Ventolin",
        status: "Teslim Edildi",
        date: "05.05.2026"
      },

      {
        id: 2,
        medicine: "Levotiron",
        status: "Arşivlendi",
        date: "18.04.2026"
      }
    ]
  },

  {
    id: 3,
    name: "Mehmet",
    email: "mehmet@mail.com",
    password: "123",
    role: "patient",

    age: 62,
    gender: "Erkek",
    bloodType: "B Rh+",

    diagnosis: [
      "Hiperlipidemi",
      "Kalp Yetmezliği"
    ],

    allergies: ["Sülfonamid"],

    chronicMeds: [
      "Atorvastatin",
      "Ramipril",
      "Glifor",
      "Coraspin"
    ],

    riskScore: 75,

    height: "172cm",
    weight: "91kg",

    lastVisit: "05 Nisan",

    labResults: {
      hba1c: "8.2",
      creatinine: "1.5",
      ldl: "182",
      glucose: "164"
    },

    notes: [
      {
        id: 1,
        text: "LDL yüksek seyrediyor. Diyet önerildi.",
        doctor: "Dr. Ahmet",
        createdAt: "06.05.2026 16:22"
      },

      {
        id: 2,
        text: "Kalp yetmezliği açısından yakın takip önerildi.",
        doctor: "Dr. Ahmet",
        createdAt: "30.04.2026 09:35"
      }
    ],

    appointments: [
      {
        id: 1,
        hospital: "MedTrack Klinik",
        department: "Kardiyoloji",
        doctor: "Dr. Ahmet",
        date: "05.04.2026"
      },

      {
        id: 2,
        hospital: "MedTrack Klinik",
        department: "Dahiliye",
        doctor: "Dr. Elif",
        date: "22.03.2026"
      }
    ],

    prescriptionHistory: [
      {
        id: 1,
        medicine: "Ramipril",
        status: "Teslim Edildi",
        date: "29.04.2026"
      },

      {
        id: 2,
        medicine: "Coraspin",
        status: "Arşivlendi",
        date: "14.04.2026"
      },

      {
        id: 3,
        medicine: "Glifor",
        status: "Teslim Edildi",
        date: "02.04.2026"
      }
    ]
  },

  // DOKTOR
  {
    id: 4,
    email: "doctor@mail.com",
    password: "123",
    role: "doctor",
    name: "Dr. Ahmet"
  },

  // ECZACI
  {
    id: 5,
    email: "pharmacy@mail.com",
    password: "123",
    role: "pharmacist",
    name: "Eczacı Mehmet"
  }
];



// İLAÇ VERİLERİ

export const commonMeds = [
  {
    name: "Parol",
    defaultDosage: "500mg",
    instruction: "Tok Karnına",
    frequency: "1x1"
  },

  {
    name: "Nurofen",
    defaultDosage: "200mg",
    instruction: "Tok Karnına",
    frequency: "2x1"
  },

  {
    name: "Dolorex",
    defaultDosage: "50mg",
    instruction: "Aç/Tok Farketmez",
    frequency: "1x1"
  },

  {
    name: "Augmentin",
    defaultDosage: "1000mg",
    instruction: "Tok Karnına",
    frequency: "2x1"
  },

  {
    name: "Majezik",
    defaultDosage: "100mg",
    instruction: "Tok Karnına",
    frequency: "1x1"
  }
];