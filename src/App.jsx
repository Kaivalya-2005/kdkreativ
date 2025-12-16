import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Drawings from './pages/Drawings';
import './App.css';

function App() {
  useEffect(() => {
    // Scroll to top on page refresh
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Gallery" element={<Drawings />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
