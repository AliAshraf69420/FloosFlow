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

    // Validation
    if (!recipientEmail) {
      alert("Please enter recipient email");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      await transactionService.requestMoney({
        recipientEmail,
        amount: parseFloat(amount),
        message: message || undefined,
      });

      alert("Request sent successfully!");

      // Reset form
      setRecipientEmail("");
      setAmount("");
      setMessage("");
    } catch (err) {
      console.error("Request error:", err);
      const errorMessage = err.response?.data?.error || err.message || "Request failed";
      alert(`${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting transfer...");
    console.log("Recipient Email:", recipientEmail);
    console.log("Amount:", amount);
    console.log("Sender Card ID:", senderCardId);
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
        message: message || undefined,
      });

      alert("Transfer successful!");

      // Reset form
      setRecipientEmail("");
      setAmount("");
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

  // Get selected card info for display
  const selectedCard = cards.find(card => card.id === parseInt(senderCardId));

  return (
    <div className="ff-card-Transfer p-6 lg:p-8 w-full max-w-[1100px] mx-auto mb-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
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

        {/* Message */}
        <MessageInput
          value={message}
          onChange={setMessage}
        />

        {/* Sender Card Selection - STYLED */}
        <div>
          <label
            htmlFor="senderCard"
            className="block text-sm sm:text-base font-medium mb-2 text-gray-700 dark:text-white/90"
          >
            Select Card
          </label>

          {cards.length > 0 ? (
            <div className="relative">
              <select
                id="senderCard"
                value={senderCardId}
                onChange={(e) => setSenderCardId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white
                  appearance-none cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-[#49EB8C] focus:border-transparent
                  transition-all duration-200
                  hover:bg-gray-200 dark:hover:bg-white/10"
                required
              >
                {cards.map((card) => (
                  <option
                    key={card.id}
                    value={card.id}
                    className="bg-zinc-900 text-white py-2"
                  >
                    {card.cardType} - ****{card.cardNumber.slice(-4)} (Balance: EGP {card.balance})
                  </option>
                ))}
              </select>



              {/* Selected card preview */}
              {selectedCard && (
                <div className="mt-2 p-3 rounded-lg bg-gradient-to-r from-[#62A6BF]/10 via-[#49EB8C]/10 to-[#65E67F]/10 border border-gray-200 dark:border-white/5">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-white/60 text-xs mb-1">Selected Card</p>
                      <p className="text-gray-900 dark:text-white font-semibold">{selectedCard.bankName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 dark:text-white/60 text-xs mb-1">Available Balance</p>
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] font-bold">
                        EGP{selectedCard.balance}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center">
              <p className="text-gray-500 dark:text-white/60 text-sm mb-3">
                No cards available. Please add a card first.
              </p>
              <button
                type="button"
                onClick={() => navigate("/ManageCards")}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#62A6BF] to-[#49EB8C] text-white text-sm font-semibold hover:scale-105 transition-transform duration-200"
              >
                Add Card
              </button>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TransferButton
            type="submit"
            disabled={loading || cards.length === 0}
          >
            {loading ? "Processing..." : "Transfer Money"}
          </TransferButton>

          <button
            type="button"
            onClick={requestMoney}
            disabled={loading}
            className="py-3 px-6 rounded-xl bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-semibold
              hover:bg-gray-300 dark:hover:bg-white/20 hover:border-gray-400 dark:hover:border-white/30 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200 dark:disabled:hover:bg-white/10
              flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Request Money</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}