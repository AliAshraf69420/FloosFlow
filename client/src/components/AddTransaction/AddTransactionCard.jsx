// components/AddTransaction/AddTransactionCard.jsx
import React from "react";
import TransactionInput from "./TransactionInput";
import AddTransactionButton from "./AddTransactionButton";
import StyledDropdown from "./SelectComponent";
export default function AddTransactionCard() {
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

          <form className="space-y-6" aria-label="Add Transaction Form">
            {/* Transaction Name */}
            <TransactionInput
              label="Transaction Name"
              id="transaction-name"
              placeholder="Name of the transaction"
              required
            />

            {/* Amount */}
            <TransactionInput
              label="Amount Spent"
              id="amount"
              type="number"
              placeholder="Enter the amount you spent"
              required
            />

            {/* Merchant */}
            <TransactionInput
              label="Merchant Name"
              id="merchant"
              placeholder="Enter where you spent the money"
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
                <StyledDropdown />

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
