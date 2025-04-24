import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FeedbackForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.includes("@")) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message can't be empty";
    return errs;
  };

  const submit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setLoading(true);

    await fetch("https://feedback-collector-1-nu87.onrender.com/submit-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    onSubmitted();
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <motion.form
      onSubmit={submit}
      className="p-4 space-y-4 bg-white dark:bg-gray-800 shadow rounded transition"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <input
          className="w-full p-2 border rounded"
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Your Feedback"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </motion.form>
  );
}
