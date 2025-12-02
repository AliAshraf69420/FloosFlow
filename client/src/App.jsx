import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import HelpPage from './routes/HelpPage';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-ff-bg-dark text-gray-100 font-sans">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/Help" element={<HelpPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
