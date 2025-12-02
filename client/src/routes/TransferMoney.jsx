import React from "react";
import TransferMoneyCard from "../components/Transfer/TransferMoneyCard";

export default function TransferMoneyPage() {
  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="transfer-heading"
      className="flex-grow pt-28 px-4 text-center"
    >
      <h1 id="transfer-heading" className="sr-only">
        Transfer Money
      </h1>
      <TransferMoneyCard />
    </main>
  );
}
