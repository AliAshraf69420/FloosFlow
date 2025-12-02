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
    <section id="support" className="ff-card">
      <h2 className="text-3xl font-bold mb-6">Support</h2>

      <div className="space-y-6">

        {/* Category */}
        <div>
          <label className="block text-gray-200 mb-2">Category</label>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="ff-input w-full bg-white/10 text-gray-100"
          >
            <option value="general">General Inquiry</option>
            <option value="billing">Billing Issue</option>
            <option value="technical">Technical Problem</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-gray-200 mb-2">Subject</label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            className="ff-input w-full"
            placeholder="Subject"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-200 mb-2">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className="ff-input w-full h-32 resize-none"
            placeholder="Describe your issue..."
          />
        </div>

        <button onClick={handleSend} className="ff-btn">
          Send Message
        </button>
      </div>
    </section>
  );
}