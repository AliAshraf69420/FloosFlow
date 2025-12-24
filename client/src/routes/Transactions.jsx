import React, { useEffect, useState } from "react";
import TransactionParentCard from "../components/Transactions/TransactionParentCard";
import TransactionSearch from "../components/Transactions/TransactionSearch";
import TransactionCard from "../components/Transactions/TransactionsCard";
import TransactionButton from "../components/Transactions/TransactionButton";
import { useUser } from "../context/UserContext";
import LoadingSpinner from "../components/Notifications/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
  const { user, loading, error, fetchUser } = useUser();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error(error);
      navigate("/Error", { state: { error } });
    }
  }, [error, navigate]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        await fetchUser();
      } catch (err) {
        console.error(err);
      }
    };

    loadUser();
  }, [fetchUser]);

  function formatEGP(amount) {
    const value = Number(amount);
    console.log(value)
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
    }).format(value);
  }

  if (loading) return <div className="flex items-center justify-center h-screen">
    <LoadingSpinner />
  </div>;

  // Map the user transactions
  const transactions = user?.transactions?.map((tx) => ({
    id: tx.id,
    name: tx.transactionName ?? "Unnamed Transaction",
    amount: formatEGP(tx.money),
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
    <main 
      className="flex-grow pt-24 px-2 sm:px-8 min-h-screen text-center overflow-hidden" 
      role="main" 
      aria-labelledby="transaction-heading"
    >
      <h1 id="transaction-heading" className="sr-only">Transaction Management</h1> {/* Heading for screen readers */}

      <TransactionParentCard className="overflow-hidden">
        {/* Search Input with ARIA label */}
        <TransactionSearch
          id="transaction-search"
          placeholder="Search transactions..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="mb-4"
          aria-label="Search for transactions" // Ensure screen reader can identify the search functionality
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-end gap-4 mb-6">
          <TransactionButton 
            to="/AddTransaction" 
            className="flex-1 sm:flex-auto" 
            aria-label="Add a new transaction" // Clear action for screen readers
          >
            + Add Transaction
          </TransactionButton>
          <TransactionButton 
            to="/TransferMoney" 
            className="flex-1 sm:flex-auto" 
            aria-label="Transfer money to another account" // Clear action for screen readers
          >
            $ Transfer Money
          </TransactionButton>
        </div>

        {/* Transaction List with ARIA Live for dynamic updates */}
        <div className="flex flex-col space-y-4 max-h-[65vh] overflow-x-hidden pr-2" role="region" aria-labelledby="transaction-list-heading">
          <h2 id="transaction-list-heading" className="sr-only">Transaction List</h2> {/* Visually hidden heading for screen readers */}
          
          {filteredTransactions.length === 0 ? (
            <div className="ff-card-Transfer p-6 text-center" role="status" aria-live="assertive">
              <p className="text-gray-500 dark:text-white/60">No transactions found.</p>
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <TransactionCard
                key={tx.id}
                {...tx}
                className="break-words"
                aria-labelledby={`transaction-card-${tx.id}`} // Announce each transaction card separately
              />
            ))
          )}
        </div>
      </TransactionParentCard>
    </main>

  );
}
