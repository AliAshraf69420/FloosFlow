import React, { useState } from "react";
import TransactionParentCard from "../components/Transactions/TransactionParentCard";
import TransactionSearch from "../components/Transactions/TransactionSearch";
import TransactionCard from "../components/Transactions/TransactionsCard";
import TransactionButton from "../components/Transactions/TransactionButton";
import { useUser } from "../context/UserContext";

export default function TransactionsPage() {
  const { user, loading, error } = useUser();
  const [searchText, setSearchText] = useState("");

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions: {error}</p>;

  // Map the user transactions
  const transactions = user?.transactions?.map((tx) => ({
    id: tx.id,
    name: tx.transactionName ?? "Unnamed Transaction",
    amount: `EGP ${tx.money.toFixed(2)}`,
    to: `/TransactionDetails/${tx.id}`,
    date: tx.date,
    category: tx.category,
    message: tx.message,
    merchantName: tx.merchantName,
    transactionName: tx.transactionName,
    cardNumber: tx.card?.cardNumber,
  })) || [];

  const filteredTransactions = transactions.filter((tx) =>
    tx.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <main className="flex-grow pt-24 px-2 sm:px-8 min-h-screen text-center overflow-hidden">
      <TransactionParentCard className="overflow-hidden">
        {/* Search */}
        <TransactionSearch
          placeholder="Search transactions..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="mb-4"
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-end gap-4 mb-6">
          <TransactionButton to="/AddTransaction" className="flex-1 sm:flex-auto">
            + Add Transaction
          </TransactionButton>
          <TransactionButton to="/TransferMoney" className="flex-1 sm:flex-auto">
            $ Transfer Money
          </TransactionButton>
        </div>

        {/* Transaction List */}
        <div className="flex flex-col space-y-4 max-h-[65vh]  overflow-x-hidden pr-2">
          {filteredTransactions.length === 0 ? (
            <div className="ff-card-Transfer p-6 text-center">
              <p className="text-gray-500 dark:text-white/60">No transactions found.</p>
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <TransactionCard
                key={tx.id}
                {...tx}
                className="break-words" // ensures text wraps inside cards
              />
            ))
          )}
        </div>
      </TransactionParentCard>
    </main>
  );
}
