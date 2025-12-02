import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import AddTransactionPage from "./routes/AddTransactionsPage";
import Dashboard from "./routes/Dashboard";
import HelpPage from "./routes/HelpPage";
import Home from "./routes/Home";
import LandingPage from "./routes/LandingPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import TransactionDetails from "./routes/TransactionDetails";
import Transactions from "./routes/Transactions";
import TransferMoney from "./routes/TransferMoney";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-ff-bg-dark text-gray-100 font-sans">
      <div className="flex flex-col min-h-screen bg-ff-bg-dark text-gray-100 font-sans">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/AddTransaction" element={<AddTransactionPage />} />
            <Route path="/Help" element={<HelpPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route
              path="/TransactionDetails"
              element={<TransactionDetails />}
            />
            <Route path="/Transactions" element={<Transactions />} />
            <Route path="/TransferMoney" element={<TransferMoney />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
