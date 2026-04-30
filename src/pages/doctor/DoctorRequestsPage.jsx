import { useRequests } from "../../context/RequestContext";
import { useState } from "react";

const DoctorRequestsPage = () => {
  const { requests, approveRequest, rejectRequest } = useRequests();

  const [filter, setFilter] = useState("all");

  // 🔥 LOADING STATE
  const [loadingId, setLoadingId] = useState(null);

  // 🔥 FILTER
  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r) => r.status === filter);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Yenileme Talepleri
      </h1>

      {/* 🔥 FİLTRE */}
      <div className="flex gap-2 mb-4">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 🔥 EMPTY STATE (GELİŞTİRİLDİ) */}
      {filteredRequests.length === 0 && (
        <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-lg font-medium">
            Talep bulunamadı
          </p>
          <p className="text-sm mt-1">
            Bu filtreye ait kayıt yok
          </p>
        </div>
      )}

      <div className="space-y-4">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            {/* ÜST */}
            <div className="flex justify-between items-start">
              
              {/* SOL */}
              <div>
                <h3 className="font-semibold text-lg">
                  {req.medicine}
                </h3>

                {/* TARİH */}
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(req.createdAt).toLocaleString()}
                </p>

                {/* HASTA */}
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium text-black">
                    {req.patientName || "Bilinmiyor"}
                  </p>
                  <p>{req.patientEmail}</p>
                </div>
              </div>

              {/* STATUS */}
              <div>
                {req.status === "pending" && (
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                    Bekliyor
                  </span>
                )}

                {req.status === "approved" && (
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    Onaylandı
                  </span>
                )}

                {req.status === "rejected" && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                    Reddedildi
                  </span>
                )}
              </div>
            </div>

            {/* 🔥 BUTONLAR + LOADING */}
            {req.status === "pending" && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setLoadingId(req.id);
                    setTimeout(() => {
                      approveRequest(req.id);
                      setLoadingId(null);
                    }, 500);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  {loadingId === req.id
                    ? "Onaylanıyor..."
                    : "Onayla"}
                </button>

                <button
                  onClick={() => {
                    setLoadingId(req.id);
                    setTimeout(() => {
                      rejectRequest(req.id);
                      setLoadingId(null);
                    }, 500);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  {loadingId === req.id
                    ? "Reddediliyor..."
                    : "Reddet"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorRequestsPage;