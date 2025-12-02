import React, { useState } from "react";

/**
 * Props:
 * - availableProviders: [{ value, label }]
 * - onAuthorize({ provider, email }) => Promise
 *
 * Basic flow:
 * - choose provider
 * - enter email
 * - click Authorize -> calls onAuthorize, shows status
 */
export default function ProviderConnectForm({ availableProviders = [], onAuthorize }) {
  const [provider, setProvider] = useState(availableProviders?.[0]?.value ?? "");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | pending | success | error
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!provider) {
      setError("Choose a provider");
      return;
    }
    try {
      setStatus("pending");
      await onAuthorize?.({ provider, email });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 1200);
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Authorization failed");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-gray-200 mb-2">Provider</label>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="ff-input w-full"
        >
          {availableProviders.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-200 mb-2">Account Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="ff-input w-full"
          placeholder="Account email for provider"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="ff-btn"
          disabled={status === "pending"}
          aria-live="polite"
        >
          {status === "pending" ? "Authorizing…" : "Authorize"}
        </button>
        {status === "success" && <span className="text-sm text-green-300">Authorized</span>}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}