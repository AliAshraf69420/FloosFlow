import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import { NotificationsProvider } from "./context/NotificationsContext";
import { ThemeProvider } from "./context/ThemeContext";
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
import SettingsPage from "./routes/Settings";
import ErrorPage from "./routes/ErrorPage";
import LoadingPage from "./routes/LoadingPage";
import ManageCardsPage from "./routes/ManageCards";
import NotificationsPage from "./routes/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";
import AuthCallback from "./routes/AuthCallback";

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationsProvider>
          <div className="flex flex-col min-h-screen bg-ff-bg-light dark:bg-ff-bg-dark text-gray-900 dark:text-gray-100 font-sans">
            <NavBar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/loading" element={<LoadingPage />} />

                {/* Protected routes individually wrapped */}
                <Route
                  path="/AddTransaction"
                  element={
                    <ProtectedRoute>
                      <AddTransactionPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Help"
                  element={
                    <ProtectedRoute>
                      <HelpPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                <Route path="/auth/callback" element={
                  <ProtectedRoute>
                    <AuthCallback />
                  </ProtectedRoute>
                } />
                <Route
                  path="/TransactionDetails/:id"
                  element={
                    <ProtectedRoute>
                      <TransactionDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Transactions"
                  element={
                    <ProtectedRoute>
                      <Transactions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/TransferMoney"
                  element={
                    <ProtectedRoute>
                      <TransferMoney />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ManageCards"
                  element={
                    <ProtectedRoute>
                      <ManageCardsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Notifications"
                  element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route */}
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </NotificationsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;