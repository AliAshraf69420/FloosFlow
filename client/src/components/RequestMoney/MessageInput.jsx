export default function MessageInput({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label htmlFor="request-message" className="ff-label">
        Message (Optional)
      </label>
      <textarea
        id="request-message"
        rows={3}
        placeholder="Add a personal message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ff-input resize-none"
      />
    </div>
  );
}