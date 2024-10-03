import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import inventory from './inventory.mjs';
import { NavLink, Outlet } from 'react-router-dom';


function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
      <Navigation />
      <Outlet context={{  shoppingCart, setShoppingCart}} />      
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
        <NavLink className="nav-link" to="/">
          Hem
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/compose-salad">
          Komponera en sallad
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/view-order">
          Visa beställning
        </NavLink>
      </li>
     
    </ul>
  );
}

export default App;