import React, { useEffect, useState } from 'react';

const Whoami = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('/whoami')
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => {
        console.error("Erreur :", err);
        setStatus({ error: "Erreur lors de la requête" });
      });
  }, []);

  if (!status) return <p>Chargement...</p>;

  if (status.error) return <p>{status.error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Statut de session</h1>
      {status.connecté ? (
        <div>
          <p className="text-green-600">✅ Connecté</p>
          <pre className="bg-gray-100 p-2 mt-2 rounded">{JSON.stringify(status.utilisateur, null, 2)}</pre>
        </div>
      ) : (
        <p className="text-red-600">❌ Non connecté</p>
      )}
    </div>
  );
};

export default Whoami;
