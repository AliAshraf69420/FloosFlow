import React, { useState } from "react";
import SearchUser from "./SearchUser";
import TransferMoneyInput from "./TransferMoneyInput";
import MessageInput from "./MessageInput";
import TransferButton from "./TransferButton";

export default function TransferMoneyCard() {
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
    console.log(form);
  };

  return (
    <div className="ff-card-Transfer p-6 lg:p-8 w-full max-w-[1100px] mx-auto mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Transfer Money
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <SearchUser value={form.search} onChange={(v) => update("search", v)} />

        <TransferMoneyInput
          id="transfer-amount"
          label="Amount"
          type="number"
          placeholder="Enter amount to transfer"
          value={form.amount}
          onChange={(v) => update("amount", v)}
        />

        <TransferMoneyInput
          id="reason"
          label="Reason"
          type="text"
          placeholder="Reason for transfer (optional)"
          value={form.reason}
          onChange={(v) => update("reason", v)}
        />

        <MessageInput
          value={form.message}
          onChange={(v) => update("message", v)}
        />

        <TransferButton />
      </form>
    </div>
  );
}
