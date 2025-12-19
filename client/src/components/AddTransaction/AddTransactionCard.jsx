import React, { useState, useEffect } from "react";
import TransactionInput from "./TransactionInput";
import AddTransactionButton from "./AddTransactionButton";
import StyledDropdown from "./SelectComponent";
import transactionService from "../../services/transactionService";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddTransactionCard() {
  const { user } = useUser();
  const [transactionName, setTransactionName] = useState("");
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("Other");
  const [cardId, setCardId] = useState("");
  const [message, setMessage] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user's cards from context
  useEffect(() => {
    if (user?.cards) {
      setCards(user.cards);
      if (user.cards.length > 0) setCardId(user.cards[0].id);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting transaction...");
    console.log("Transaction Name:", transactionName);
    console.log("Amount:", amount);
    console.log("Merchant:", merchant);
    console.log("Category:", category);
    console.log("Card ID:", cardId);
    console.log("Message:", message);

    // Validation
    if (!transactionName) {
      alert("Please enter transaction name");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (!cardId) {
      alert("Please select a card");
      return;
    }

    setLoading(true);

    try {
      await transactionService.addTransaction({
        transactionName,
        money: parseFloat(amount),
        merchantName: merchant,
        category,
        message,
        cardId: parseInt(cardId),
      });

      alert("Transaction added successfully!");

      // Reset form
      setTransactionName("");
      setAmount("");
      setMerchant("");
      setCategory("Other");
      setMessage("");
      setCardId(cards[0]?.id || "");

      // Navigate to transactions page
      navigate("/Transactions");
    } catch (err) {
      console.error("Transaction error:", err);
      alert((err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Get selected card info
  const selectedCard = cards.find(card => card.id === parseInt(cardId));

  return (
    <div className="flex-grow pt-24 px-4 sm:px-6 md:px-8 text-center">
      <div aria-labelledby="add-transaction-heading">
        <div className="group w-full max-w-[1100px] ff-card-AddTransaction p-6 lg:p-8 text-left mx-auto mb-6">
          <h1
            id="add-transaction-heading"
            className="text-2xl sm:text-3xl font-semibold mb-6 text-center"
          >
            Add Transaction
          </h1>

          <form className="space-y-6" aria-label="Add Transaction Form" onSubmit={handleSubmit}>
            {/* Transaction Name */}
            <TransactionInput
              label="Transaction Name"
              id="transaction-name"
              placeholder="Name of the transaction"
              required
              value={transactionName}
              onChange={(e) => setTransactionName(e.target.value)}
            />

            {/* Amount */}
            <TransactionInput
              label="Amount Spent"
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Enter the amount you spent"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Merchant */}
            <TransactionInput
              label="Merchant Name"
              id="merchant"
              placeholder="Enter where you spent the money"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            />

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm sm:text-base font-medium mb-2 text-white/90"
              >
                Category
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <StyledDropdown value={category} onChange={setCategory} />

                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-[#49EB8C]/80 text-black font-semibold 
                    hover:bg-[#49EB8C] transition-all duration-300 hover:shadow-md"
                >
                  +
                </button>
              </div>

              <p className="text-xs sm:text-sm text-white/60 mt-2">
                Click + to add a new category
              </p>
            </div>

            {/* Card Selection - STYLED */}
            <div>
              <label
                htmlFor="card"
                className="block text-sm sm:text-base font-medium mb-2 text-white/90"
              >
                Select Card
              </label>

              {cards.length > 0 ? (
                <div className="relative">
                  <select
                    id="card"
                    value={cardId}
                    onChange={(e) => setCardId(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white
                      appearance-none cursor-pointer
                      focus:outline-none focus:ring-2 focus:ring-[#49EB8C] focus:border-transparent
                      transition-all duration-200
                      hover:bg-white/10"
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

                  {/* Custom dropdown arrow */}


                  {/* Selected card preview */}
                  {selectedCard && (
                    <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-[#62A6BF]/10 via-[#49EB8C]/10 to-[#65E67F]/10 border border-white/5">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-white/60 text-xs mb-1">Selected Card</p>
                          <p className="text-white font-semibold">{selectedCard.bankName}</p>
                          <p className="text-white/50 text-xs mt-1 font-mono">
                            ****{selectedCard.cardNumber.slice(-4)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-xs mb-1">Available Balance</p>
                          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] font-bold text-lg">
                            EGP {selectedCard.balance}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                  <p className="text-white/60 text-sm mb-3">
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

            {/* Message */}
            <TransactionInput
              label="Message (Optional)"
              id="message"
              placeholder="Add a note about this transaction"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Submit */}
            <div className="pt-4">
              <AddTransactionButton
                type="submit"
                disabled={loading || cards.length === 0}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Add Transaction"
                )}
              </AddTransactionButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}