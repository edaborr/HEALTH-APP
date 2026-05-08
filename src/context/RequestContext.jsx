import { createContext, useContext, useEffect, useState } from "react";
import { useNotifications } from "./NotificationContext";

const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const { addNotification } = useNotifications();

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("requests");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);

  // 🔥 TALEP OLUŞTUR
  const addRequest = (medicine, user) => {
    if (!medicine) return;

    const exists = requests.some(
      (r) =>
        r.medicine === medicine &&
        r.patientEmail === user.email &&
        r.status !== "rejected"
    );

    if (exists) return;

    const newRequest = {
      id: Date.now(),
      medicine,
      usageHistory: [
  {
    date: "01.04.2026",
    amount: "28 Tablet",
  },
  {
    date: "02.03.2026",
    amount: "28 Tablet",
  },
],
  age: user.age,
  gender: user.gender,
  diagnosis: user.diagnosis,
  allergies: user.allergies || [],
  bloodType: user.bloodType,
  chronicMeds: user.chronicMeds || [],

  

  warning:
    user.allergies?.length > 0
      ? `${user.allergies.join(", ")} alerjisi mevcut.`
      : user.age > 60
      ? "İleri yaş hasta. Doz kontrolü önerilir."
      : "",



patientNote:
  "İlacım bitti, rapor yazabilir misiniz?",
      patientEmail: user.email,
      patientName: user.name,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setRequests((prev) => [...prev, newRequest]);

    // 🔥 HASTAYA
    addNotification(
      `${medicine} için talep oluşturuldu`,
      user.email
    );

    // 🔥 DOKTORA
    addNotification(
      `${user.name} yeni talep oluşturdu`,
      "doctor@mail.com"
    );
  };

  // 🔥 ONAY
  const approveRequest = (id) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          // HASTA
          addNotification(
            `${req.medicine} onaylandı`,
            req.patientEmail
          );

          // DOKTOR
          addNotification(
            `${req.medicine} onayladınız`,
            "doctor@mail.com"
          );

          return { ...req, status: "approved" };
        }
        return req;
      })
    );
  };

  // 🔥 RED
  const rejectRequest = (id) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          addNotification(
            `${req.medicine} reddedildi`,
            req.patientEmail
          );

          addNotification(
            `${req.medicine} reddettiniz`,
            "doctor@mail.com"
          );

          return { ...req, status: "rejected" };
        }
        return req;
      })
    );
  };

  // 🔥 HAZIRLA
  const prepareRequest = (id) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          addNotification(
            `${req.medicine} hazırlandı`,
            req.patientEmail
          );

          addNotification(
            `${req.medicine} hazırladınız`,
            "pharmacy@mail.com"
          );

          return { ...req, status: "prepared" };
        }
        return req;
      })
    );
  };

  // 🔥 TESLİM
  const deliverRequest = (id) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          addNotification(
            `${req.medicine} teslim edildi`,
            req.patientEmail
          );

          addNotification(
            `${req.medicine} teslim edildi`,
            "pharmacy@mail.com"
          );

          return { ...req, status: "delivered" };
        }
        return req;
      })
    );
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        addRequest,
        approveRequest,
        rejectRequest,
        prepareRequest,
        deliverRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = () => useContext(RequestContext);