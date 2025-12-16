import React from "react";
import { useParams } from "react-router-dom";
import TransactionDetailsCard from "../components/TransactionDetails/TransactionDetailsCard";
import { useUser } from "../context/UserContext";

export default function TransactionDetailsPage() {
  const { id } = useParams();
  const { user } = useUser();

  const transaction = user?.transactions.find(tx => tx.id === parseInt(id));

  if (!transaction) {
    return (
      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 text-center">
        <p>Transaction not found</p>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 text-center">
      <TransactionDetailsCard transaction={transaction} />
    </main>
  );
}
