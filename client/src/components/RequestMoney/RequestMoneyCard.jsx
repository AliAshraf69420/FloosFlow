import { useState } from "react";
import SearchUser from "./SearchUser";
import AmountInput from "./AmountInput";
import ReasonInput from "./ReasonInput";
import MessageInput from "./MessageInput";
import RequestButton from "./RequestButton";

export default function RequestMoneyCard() {
  const [form, setForm] = useState({
    search: "",
    amount: "",
    reason: "",
    message: "",
  });

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Request sent:", form);
  };

  return (
    <div className="ff-card-Transfer p-6 lg:p-8 w-full max-w-[1100px] mx-auto mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Request Money
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <SearchUser value={form.search} onChange={(v) => update("search", v)} />

        <AmountInput value={form.amount} onChange={(v) => update("amount", v)} />

        <ReasonInput value={form.reason} onChange={(v) => update("reason", v)} />

        <MessageInput value={form.message} onChange={(v) => update("message", v)} />

        <RequestButton />
      </form>
    </div>
  );
}