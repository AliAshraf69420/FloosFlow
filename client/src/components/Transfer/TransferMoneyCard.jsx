import React, { useState, useEffect } from "react";
import SearchUser from "./SearchUser";
import TransferMoneyInput from "./TransferMoneyInput";
import MessageInput from "./MessageInput";
import TransferButton from "./TransferButton";
import transactionService from "../../services/transactionService";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function TransferMoneyCard() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [senderCardId, setSenderCardId] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cards from user context
  useEffect(() => {
    if (user?.cards) {
      setCards(user.cards);
      if (user.cards.length > 0) {
        setSenderCardId(user.cards[0].id);
      }
    }
  }, [user]);
  const requestMoney = async () => {
    console.log("Requesting money...");
    try {
      await transactionService.requestMoney({
        recipientEmail,
        amount: parseFloat(amount),
        reason: reason || undefined,
        message: message || undefined,
      });
      alert("Request sent!");
    }
    catch (err) {
      console.error("Request error:", err);
      const errorMessage = err.response?.data?.error || err.message || "Request failed";
      alert(`${errorMessage}`);
    }
    //make try catch please

  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting transfer...");
    console.log("Recipient Email:", recipientEmail);
    console.log("Amount:", amount);
    console.log("Sender Card ID:", senderCardId);
    console.log("Reason:", reason);
    console.log("Message:", message);

    // Validation
    if (!recipientEmail) {
      alert("Please enter recipient email");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (!senderCardId) {
      alert("Please select a card");
      return;
    }

    setLoading(true);

    try {
      await transactionService.transferMoney({
        recipientEmail,
        amount: parseFloat(amount),
        senderCardId: parseInt(senderCardId),
        reason: reason || undefined,
        message: message || undefined,
      });

      alert("Transfer successful!");

      // Reset form
      setRecipientEmail("");
      setAmount("");
      setReason("");
      setMessage("");
      setSenderCardId(cards[0]?.id || "");

      // Navigate to transactions page
      navigate("/Transactions");
    } catch (err) {
      console.error("Transfer error:", err);
      const errorMessage = err.response?.data?.error || err.message || "Transfer failed";
      alert(`${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ff-card-Transfer p-6 lg:p-8 w-full max-w-[1100px] mx-auto mb-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-white">
        Transfer Money
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" aria-label="Transfer Money Form">
        {/* Recipient Email */}
        <SearchUser
          value={recipientEmail}
          onChange={setRecipientEmail}
        />

        {/* Amount */}
        <TransferMoneyInput
          id="transfer-amount"
          label="Amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Enter amount to transfer"
          required
          value={amount}
          onChange={setAmount}
        />

        {/* Reason */}
        <TransferMoneyInput
          id="reason"
          label="Reason"
          type="text"
          placeholder="Reason for transfer (optional)"
          value={reason}
          onChange={setReason}
        />

        {/* Message */}
        <MessageInput
          value={message}
          onChange={setMessage}
        />

        {/* Sender Card Selection */}
        <div>
          <label
            htmlFor="senderCard"
            className="block text-sm sm:text-base font-medium mb-2 text-white/90"
          >
            Select Card
          </label>

          {cards.length > 0 ? (
            <select
              id="senderCard"
              value={senderCardId}
              onChange={(e) => setSenderCardId(e.target.value)}
              className="w-full sm:w-auto p-3 rounded-lg text-black bg-white"
              required
            >
              {cards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.bankName} - ****{card.cardNumber.slice(-4)} (Balance: ${card.balance})
                </option>
              ))}
            </select>
          ) : (
            <p className="text-white/60 text-sm">
              No cards available. Please add a card first.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <TransferButton
              type="submit"
              disabled={loading || cards.length === 0}
            >
              {loading ? "Processing..." : "Transfer Money"}
            </TransferButton>
            <button
              type="button"
              onClick={() => { requestMoney() }}
              className="ff-btn w-full sm:w-auto px-4 py-2 bg-zinc-800 text-white text-lg font-bold"
            >
              Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}