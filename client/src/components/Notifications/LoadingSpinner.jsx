export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-white/20 border-t-ff-accent rounded-full animate-spin" />

      <p className="text-white/60 text-sm">Loading </p>
    </div>
  );
}