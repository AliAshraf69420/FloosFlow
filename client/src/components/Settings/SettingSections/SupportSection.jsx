import React, { useState } from "react";

export default function SupportSection({ onSend }) {
  const [form, setForm] = useState({
    subject: "",
    message: "",
    category: "general",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSend = () => {
    onSend?.(form);
  };

  return (
    <section
      id="support"
      className="ff-card hover:bg-gradient-to-r from-[#62A6BF]/10 via-[#49EB8C]/10 to-[#65E67F]/10 max-w-4xl mx-auto p-6 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-r from-gray-800/50 via-gray-900/50 to-gray-800/50 shadow-lg"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white text-center sm:text-left">
        Support
      </h2>

      <div className="space-y-6">

        {/* Category */}
        <div>
          <label className="block text-gray-200 mb-2 font-medium">Category</label>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="general">General Inquiry</option>
            <option value="billing">Billing Issue</option>
            <option value="technical">Technical Problem</option>
          </select>

        </div>

        {/* Subject */}
        <div>
          <label className="block text-gray-200 mb-2 font-medium">Subject</label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            className="ff-input w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Subject"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-200 mb-2 font-medium">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className="ff-input w-full h-40 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Describe your issue..."
          />
        </div>

        <button
          onClick={handleSend}
          className="ff-btn px-6 py-3 mb-15  rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Send Message
        </button>
      </div>
    </section>
  );
}