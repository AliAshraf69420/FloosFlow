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

      {/* If there's a loading state, make sure it's announced */}
      <div 
        role="status" 
        aria-live="polite" 
        className="flex items-center justify-center mt-4"
      >
        {/* Example for a loading spinner (if needed) */}
        {/* <LoadingSpinner /> */}
      </div>

      {/* TransferMoneyCard for handling the transaction */}
      <TransferMoneyCard aria-describedby="transfer-info" />

      {/* Optionally, if there's important information like transaction success/error */}
      <div role="alert" aria-live="assertive" className="mt-4">
        {/* Example of dynamic error/success message */}
        {/* <TransactionStatusMessage /> */}
      </div>
    </main>

  );
}
