import React, { useState } from "react";
import BillsHeader from "../components/Bills/BillsHeader";
import BillItem from "../components/Bills/BillItem";
import EmptyBills from "../components/Bills/EmptyBills";

const initialBills = [
  {
    id: 1,
    name: "Netflix",
    amount: 15.99,
    dueDate: "Mar 25",
    paid: false,
    type: "subscription",
  },
  {
    id: 2,
    name: "Electricity Bill",
    amount: 72.5,
    dueDate: "Mar 28",
    paid: false,
    type: "utility",
  },
  {
    id: 3,
    name: "Spotify",
    amount: 9.99,
    dueDate: "Mar 10",
    paid: true,
    type: "subscription",
  },
];

export default function BillsPage() {
  const [bills, setBills] = useState(initialBills);

  const togglePaid = (id) => {
    setBills((prev) =>
      prev.map((bill) => (bill.id === id ? { ...bill, paid: true } : bill))
    );
  };

  const totalDue = bills
    .filter((bill) => !bill.paid)
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <main className="min-h-screen bg-[#121212] px-4 sm:px-6 lg:px-10 py-24 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <BillsHeader totalDue={totalDue} />

        {bills.length > 0 ? (
          <div className="space-y-3">
            {bills.map((bill) => (
              <BillItem key={bill.id} bill={bill} onTogglePaid={togglePaid} />
            ))}
          </div>
        ) : (
          <EmptyBills />
        )}
      </div>
    </main>
  );
}
