import { Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AccountSection from './components/Settings/SettingSections/AccountSection'
import Home from './routes/Home';
import SettingsPage from './routes/Settings';
import PersonalInfoSection from './components/Settings/SettingSections/PersonalInfoSection';
import ProfileSection from './components/Settings/SettingSections/ProfileSection';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-ff-bg-dark text-gray-100 font-sans">
      {/* Global Nav + Footer only for MOST pages */}
      <NavBar />

      <main className="flex-grow">
        <Routes>
          <Route path="/home" element={<Home />} />

          {/* SETTINGS PAGE */}
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;