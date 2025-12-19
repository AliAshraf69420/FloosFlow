import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestsApi } from "../../api";
import SearchUser from "./SearchUser";
import AmountInput from "./AmountInput";
import ReasonInput from "./ReasonInput";
import MessageInput from "./MessageInput";
import RequestButton from "./RequestButton";

export default function RequestMoneyCard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: null,
    search: "",
    amount: "",
    reason: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUserSelect = (user) => {
    setForm((prev) => ({
      ...prev,
      userId: user.id,
      search: user.name || user.email,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.userId) {
      setError("Please select a user to request from");
      return;
    }

    if (!form.amount || parseFloat(form.amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      await requestsApi.create({
        toUserId: form.userId,
        amount: parseFloat(form.amount),
        reason: form.reason,
        message: form.message,
      });
      // Success - redirect or show success message
      navigate("/Transactions");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ff-card-Transfer p-6 lg:p-8 w-full max-w-[1100px] mx-auto mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Request Money
      </h2>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <SearchUser
          value={form.search}
          onChange={(v) => update("search", v)}
          onSelect={handleUserSelect}
        />

        <AmountInput value={form.amount} onChange={(v) => update("amount", v)} />

        <ReasonInput value={form.reason} onChange={(v) => update("reason", v)} />

        <MessageInput value={form.message} onChange={(v) => update("message", v)} />

        <RequestButton loading={loading} disabled={loading} />
      </form>
    </div>
  );
}