import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigation, NavLink, Outlet } from 'react-router-dom';
import Salad from './Salad.mjs';

function App() {
  const navigation = useNavigation();

  // Initialize shoppingCart from localStorage
  const [shoppingCart, setShoppingCart] = useState(() => {
    const storedCart = window.localStorage.getItem('shoppingCart');

    return storedCart ? Salad.parse(storedCart) : [];
   

  });

  // Whenever the shopping cart changes, update the localStorage
  useEffect(() => {
  
    window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
      <Navigation />
      {navigation.state === 'loading' ? (
        <BootstrapSpinner />
      ) : (
        <Outlet context={{ shoppingCart, setShoppingCart }} />
      )}
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

function Navigation() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Hem</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/compose-salad">Komponera en sallad</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/view-order">Visa beställning</NavLink>
      </li>
    </ul>
  );
}

function BootstrapSpinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default App;