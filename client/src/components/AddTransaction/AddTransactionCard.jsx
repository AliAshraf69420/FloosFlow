import React, { useState, useEffect } from "react";
import TransactionInput from "./TransactionInput";
import AddTransactionButton from "./AddTransactionButton";
import StyledDropdown from "./SelectComponent";
import transactionService from "../../services/transactionService";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddTransactionCard() {
  const { user } = useUser(); // Get logged-in user
  const [transactionName, setTransactionName] = useState("");
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("Other");
  const [cardId, setCardId] = useState("");
  const [message, setMessage] = useState("");
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  // Fetch user's cards from context or API
  useEffect(() => {
    if (user?.cards) {
      setCards(user.cards);
      if (user.cards.length > 0) setCardId(user.cards[0].id);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    console.log("I'm submitting the form");
    e.preventDefault();
    console.log("Transaction Name", transactionName);
    console.log("Amount", amount);
    console.log("Merchant", merchant);
    console.log("Category", category);
    console.log("Card ID", cardId);
    console.log("Message", message);


    try {
      const newTransaction = await transactionService.addTransaction({
        transactionName,
        money: parseFloat(amount),
        merchantName: merchant,
        category,
        message,
        cardId: parseInt(cardId),
      });
      navigate("/Transactions");

      alert("Transaction added successfully!");
      setTransactionName("");
      setAmount("");
      setMerchant("");
      setCategory("Other");
      setMessage("");
      setCardId(cards[0]?.id || "");
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="flex-grow pt-24 px-4 sm:px-6 md:px-8 text-center">
      <div aria-labelledby="add-transaction-heading">
        <div className="group w-full max-w-[1100px] ff-card-AddTransaction p-6 lg:p-8 text-left mx-auto mb-6 group-">
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

            {/* Card Selection */}
            <div>
              <label
                htmlFor="card"
                className="block text-sm sm:text-base font-medium mb-2 text-white/90"
              >
                Select Card
              </label>
              <select
                id="card"
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
                className="w-full sm:w-auto p-2 rounded-lg text-black"
              >
                {cards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.bankName} - ****{card.cardNumber.slice(-4)}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <TransactionInput
              label="Message"
              id="message"
              placeholder="Optional message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Submit */}
            <div className="pt-4">
              <AddTransactionButton type="submit">
                Add Transaction
              </AddTransactionButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
