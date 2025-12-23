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
      className="ff-card ff-settings-card"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center sm:text-left">
        Support
      </h2>

      <div className="space-y-6">

        {/* Category */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">Category</label>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="ff-input"
          >
            <option value="general">General Inquiry</option>
            <option value="billing">Billing Issue</option>
            <option value="technical">Technical Problem</option>
          </select>

        </div>

        {/* Subject */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">Subject</label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            className="ff-input"
            placeholder="Subject"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className="ff-input h-40 resize-none"
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
