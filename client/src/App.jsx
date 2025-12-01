import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import DashboardPage from "./routes/Dashboard";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-ff-bg-dark text-gray-100 font-sans">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/Dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
