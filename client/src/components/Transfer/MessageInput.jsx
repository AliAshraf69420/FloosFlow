import React from "react";

export default function MessageInput({ value, onChange }) {
  return (
    <div>
      <label
        htmlFor="message"
        className="block text-sm font-medium mb-2 text-white text-left"
      >
        Message
      </label>

      <textarea
        id="message"
        rows={3}
        placeholder="Add a message for the recipient (optional)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ff-input"
      />
    </div>
  );
}
