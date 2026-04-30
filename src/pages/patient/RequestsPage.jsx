import { useRequests } from "../../context/RequestContext";
import { useAuth } from "../../context/AuthContext";
import { commonMeds } from "../../data/mockUsers";

const RequestsPage = () => {
  const { addRequest } = useRequests();
  const { user } = useAuth();

  // 🔥 ARTIK USER GÖNDERİYORUZ
  const handleAdd = (medicine) => {
    addRequest(medicine, user);
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Talep Oluştur
      </h1>

      {/* KRONİK */}
      <div>
        <h2 className="font-semibold mb-2">
          Kronik İlaçların
        </h2>

        <div className="flex flex-wrap gap-2">
          {user?.chronicMeds.map((med) => (
            <button
              key={med}
              onClick={() => handleAdd(med)}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded hover:scale-105 transition"
            >
              {med}
            </button>
          ))}
        </div>
      </div>

      {/* DİĞER */}
      <div>
        <h2 className="font-semibold mb-2">
          Diğer İlaçlar
        </h2>

        <div className="flex flex-wrap gap-2">
          {commonMeds.map((med) => (
            <button
              key={med}
              onClick={() => handleAdd(med)}
              className="bg-green-100 text-green-700 px-3 py-1 rounded hover:scale-105 transition"
            >
              {med}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default RequestsPage;