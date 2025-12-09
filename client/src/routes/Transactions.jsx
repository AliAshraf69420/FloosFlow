import React from "react";
import TransactionParentCard from "../components/Transactions/TransactionParentCard";
import TransactionSearch from "../components/Transactions/TransactionSearch";
import TransactionCard from "../components/Transactions/TransactionsCard";
import TransactionButton from "../components/Transactions/TransactionButton";

const transactions = [
  { name: "Grocery Shopping", amount: "$150.00", to: "/TransactionDetails" },
  { name: "Netflix Subscription", amount: "$15.99", to: null },
  { name: "Gas Station", amount: "$45.60", to: null },
  { name: "Transfer to John", amount: "$200.00", to: null },
];

export default function TransactionsPage() {
  return (
    <main className="flex-grow pt-24 px-4 sm:px-8 text-center min-h-screen overflow-y-auto pb-12 scroll-smooth">
      <TransactionParentCard>
        {/* Search */}
        <TransactionSearch placeholder="Search transactions..." />

        {/* Action Buttons */}
        <div className="flex justify-end mb-6 space-x-4">
          <TransactionButton to="/AddTransaction">
            + Add Transaction
          </TransactionButton>

          <TransactionButton to="/TransferMoney">
            $ Transfer Money
          </TransactionButton>
        </div>

        {/* Transaction Cards */}
        <div className="flex flex-col space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {transactions.map((tx, idx) => (
            <TransactionCard key={idx} {...tx} />
          ))}
        </div>
      </TransactionParentCard>
    </main>
  );
}
