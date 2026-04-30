import { useRequests } from "../../context/RequestContext";

const DoctorPatientsPage = () => {
  const { requests } = useRequests();

  // 🔥 UNIQUE PATIENTS
  const patients = Object.values(
    requests.reduce((acc, req) => {
      acc[req.patientEmail] = {
        name: req.patientName,
        email: req.patientEmail,
      };
      return acc;
    }, {})
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Hastalarım
      </h1>

      {patients.length === 0 && (
        <p className="text-gray-500">Hasta yok</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patients.map((p) => (
          <div
            key={p.email}
            className="bg-white p-5 rounded-xl shadow"
          >
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-500">
              {p.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPatientsPage;