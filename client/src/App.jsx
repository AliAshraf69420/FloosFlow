import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
// import Transactions from "./routes/Transactions";
import AddTransactionPage from "./routes/AddTransactionsPage";
import HelpPage from "./routes/HelpPage";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-ff-bg-dark text-gray-100 font-sans">
      <div className="flex flex-col min-h-screen bg-ff-bg-dark text-gray-100 font-sans">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/AddTransaction" element={<AddTransactionPage />} />
            <Route path="Help" element={HelpPage} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
