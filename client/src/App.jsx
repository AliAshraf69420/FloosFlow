import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
import SettingsPage from "./routes/Settings";
import ErrorPage from "./routes/ErrorPage";
import LoadingPage from "./routes/LoadingPage";
import ManageCardsPage from "./routes/ManageCards";
import NotificationsPage from "./routes/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUser } from "./context/UserContext";
import AuthCallback from "./routes/AuthCallback";
import PageNotFound from "./routes/PageNotFound";
import Admin from "./routes/Admin";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const isAdminPath = location.pathname.toLowerCase() === "/admin";
  const isAuthPath = ["/login", "/register", "/"].includes(location.pathname.toLowerCase());

  // Hide NavBar/Footer for admin paths or if user is an admin
  const shouldHideSiteNav = isAdminPath || user?.role === "ADMIN";

  useEffect(() => {
    // Redirect admin users to /Admin if not on admin or auth path
    if (!loading && user?.role === "ADMIN" && !isAdminPath && !isAuthPath) {
      navigate("/Admin");
    }
  }, [user, loading, isAdminPath, isAuthPath, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-ff-bg-light dark:bg-ff-bg-dark text-gray-900 dark:text-gray-100 font-sans">
      {!shouldHideSiteNav && <NavBar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Loading" element={<LoadingPage />} />
            <Route path="/Error" element={<ErrorPage />} />

            {/* Protected routes */}
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
            <Route
              path="/auth/callback"
              element={

                <AuthCallback />
              }
            />
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
            <Route
              path="/Admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!shouldHideSiteNav && <Footer />}
    </div>
  );
}

export default App;
