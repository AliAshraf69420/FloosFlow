import React from "react";
import SendCard from "../components/SendMoney/SendCard";

export default function SendMoneyPage() {
  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="send-money-heading"
      className="flex-grow pt-28 px-4 text-center"
    >
      <h1 id="send-money-heading" className="sr-only">
        Send Money
      </h1>
      <SendCard />
    </main>
  );
}