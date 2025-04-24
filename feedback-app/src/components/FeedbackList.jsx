import { useEffect, useState } from 'react';

export default function FeedbackList({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://feedback-collector-1-nu87.onrender.com/feedbacks")
      .then((res) => res.json())
      .then(setData);
  }, [refresh]); // Trigger reload when refresh changes

  return (
    <div className="grid gap-4 mt-6">
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No feedback submitted yet.</p>
      ) : (
        data.map((f, i) => (
          <div
            key={i}
            className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{f.name}</h3>
              <span className="text-sm text-gray-500">
                {new Date(f.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{f.email}</p>
            <p className="text-gray-800">{f.message}</p>
          </div>
        ))
      )}
    </div>
  );
}
