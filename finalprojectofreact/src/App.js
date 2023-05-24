import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Aboutus from './components/aboutus';
import Caroussel from './components/caroussel';
import Carmarks from './components/carmarks';
import Homepage from './components/homepage';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Audi from './data/audi';
import Bmw from './data/bmw';
import ShoppingCart from './components/shoppingCart';
import { CartProvider } from 'react-use-cart';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Ford from './data/ford';
import Hyundai from './data/hyundai';
import Mercedes from './data/mercedes';
import Nissan from './data/nissan';
import Peugeot from './data/peugeot';
import Renault from './data/renault';
import Volkswagen from './data/volkswagen';
import Loginpage from './components/login';
import Registerpage from './components/register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in (e.g., using cookies or local storage)
    const storedLoginState = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');

    if (storedLoginState === 'true' && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (loggedIn, name) => {
    setIsLoggedIn(loggedIn);
    setUsername(name);

    localStorage.setItem('isLoggedIn', loggedIn);
    localStorage.setItem('username', name);
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <>
      <CartProvider>
        <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Carmarks" element={<Carmarks />} />
          <Route path="/Audi" element={<Audi />} />
          <Route path="/Bmw" element={<Bmw />} />
          <Route path="/Ford" element={<Ford />} />
          <Route path="/Hyundai" element={<Hyundai />} />
          <Route path="/Mercedes" element={<Mercedes />} />
          <Route path="/Nissan" element={<Nissan />} />
          <Route path="/Peugeot" element={<Peugeot />} />
          <Route path="/Renault" element={<Renault />} />
          <Route path="/Volkswagen" element={<Volkswagen />} />
          <Route path="/Cart" element={<ShoppingCart />} />
          <Route path="/Novelties" element={<Caroussel />} />
          <Route
            element={<Loginpage onLogIn={handleLogin} isLoggedIn={isLoggedIn} />}
            path="/Login"
          />
          <Route path="/Register" element={<Registerpage onLogIn={handleLogin}/>}/>
        </Routes>
        <Aboutus />
      </CartProvider>
    </>
  );
}

export default App;