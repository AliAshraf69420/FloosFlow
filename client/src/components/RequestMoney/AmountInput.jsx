export default function AmountInput({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label htmlFor="request-amount" className="ff-label">
        Amount
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
          $
        </span>
        <input
          id="request-amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ff-input pl-8"
        />
      </div>
    </div>
  );
}