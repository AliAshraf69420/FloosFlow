import React from "react";
import ConnectedProviderItem from "./ConnectedProviderItem";

/**
 * Props:
 * - providers: [{ id, name, connectedAt, meta }]
 * - onDisconnect(providerId)
 */
export default function ConnectedProviderList({ providers = [], onDisconnect }) {
  return (
    <div className="space-y-4">
      <p className="text-white mb-3">Manage Connected Accounts (OAuth)</p>

      <div className="space-y-3 text-gray-300">
        {providers.length === 0 ? (
          <p className="text-gray-400">No providers connected</p>
        ) : (
          providers.map((p) => (
            <ConnectedProviderItem key={p.id || p.name} provider={p} onDisconnect={onDisconnect} />
          ))
        )}
      </div>
    </div>
  );
}