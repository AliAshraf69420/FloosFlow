import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipientSearch from "./RecipientSearch";
import SendInput from "./SendInput";
import SendButton from "./SendButton";
import ConfirmPopup from "./ConfirmPopup";

export default function SendCard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    recipient: "",
    amount: "",
    note: "",
  });

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.recipient || !form.amount) {
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setIsLoading(true);

    try {
      console.log("Sending money:", form);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate("/Home");
    } catch (error) {
      console.error("Failed to send money:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="ff-card-Transfer p-6 lg:p-8 w-full max-w-[1100px] mx-auto mb-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Send Money
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <RecipientSearch
            value={form.recipient}
            onChange={(v) => update("recipient", v)}
          />

          <SendInput
            label="Amount"
            id="send-amount"
            type="number"
            placeholder="Enter amount to send"
            value={form.amount}
            onChange={(v) => update("amount", v)}
            required
          />

          <SendInput
            label="Note (Optional)"
            id="send-note"
            type="text"
            placeholder="Add a note for the recipient"
            value={form.note}
            onChange={(v) => update("note", v)}
          />

          <SendButton onCancel={handleCancel} isLoading={isLoading} />
        </form>
      </div>

      <ConfirmPopup
        isOpen={showConfirm}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        recipient={form.recipient}
        amount={form.amount}
      />
    </>
  );
}
