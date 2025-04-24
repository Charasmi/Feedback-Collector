import { useState } from 'react';
import FeedbackList from './components/FeedbackList';
import FeedbackForm from './components/FeedbackForm';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [dark, setDark] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [showFeedbacks, setShowFeedbacks] = useState(false);

  const adminPassword = "admin123"; // Replace with your password

  const handleAdminAccess = () => {
    if (passInput === adminPassword) {
      setAdmin(true);
      setShowFeedbacks(true);
    } else {
      alert("Incorrect password!");
    }
    setPassInput('');
  };

  const handleToggleFeedbackView = () => {
    setShowFeedbacks(!showFeedbacks);
  };

  return (
    <div className={`${dark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen transition-colors duration-300`}>
      <div className="max-w-xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Feedback Collector</h1>
          <button onClick={() => setDark(!dark)} className="text-sm px-3 py-1 border rounded">
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        <FeedbackForm onSubmitted={() => setRefresh(!refresh)} />

        {!admin ? (
          <div className="mt-6 space-y-2">
            <input
              type="password"
              placeholder="Enter admin password"
              value={passInput}
              onChange={e => setPassInput(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAdminAccess}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              View Submitted Feedback
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <button
              onClick={handleToggleFeedbackView}
              className="mb-4 bg-gray-700 text-white px-4 py-2 rounded"
            >
              {showFeedbacks ? "Hide Feedback" : "View Feedback Again"}
            </button>
            {showFeedbacks && <FeedbackList refresh={refresh} />}
          </div>
        )}

        <footer className="text-center mt-6 text-sm opacity-60">
          Built by charasmi – 2025 Submission
        </footer>
      </div>
    </div>
  );
}

export default App;
