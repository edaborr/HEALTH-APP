const pharmacies = [
  {
    name: "Çankaya Eczanesi",
    distance: "350m",
    stock: true,
  },
  {
    name: "Merkez Eczane",
    distance: "1.2km",
    stock: false,
  },
];

const PharmacyPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Yakındaki Eczaneler
      </h1>

      <div className="space-y-4">
        {pharmacies.map((p, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow"
          >
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-500">
              {p.distance} uzaklıkta
            </p>

            <p
              className={`mt-2 ${
                p.stock ? "text-green-600" : "text-red-500"
              }`}
            >
              {p.stock ? "Stok Var" : "Stok Yok"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyPage;