export default function ReasonInput({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label htmlFor="request-reason" className="ff-label">
        Reason
      </label>
      <input
        id="request-reason"
        type="text"
        placeholder="What's this request for?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ff-input"
      />
    </div>
  );
}