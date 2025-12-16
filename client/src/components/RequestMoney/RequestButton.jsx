export default function RequestButton({ loading, disabled }) {
  return (
    <button type="submit" className="ff-btn-primary" disabled={disabled}>
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Sending
        </span>
      ) : (
        "Send Request"
      )}
    </button>
  );
}