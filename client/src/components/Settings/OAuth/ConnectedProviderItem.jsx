export default function ConnectedProviderItem({ provider, onDisconnect }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="px-4 py-1 rounded-xl ff-gradient text-white font-semibold shadow-md">{provider.name}</div>
        <p className="text-sm text-gray-400">connected</p>
      </div>
      <button onClick={() => onDisconnect(provider.id)} className="ff-btn">Disconnect</button>
    </div>
  );
}