import { useState } from 'react';
import { useOutletContext, useLoaderData, useNavigate } from 'react-router-dom';
import Salad from './Salad.mjs';
import { v4 as uuidv4 } from 'uuid';

function ComposeSalad() {
  const inventory = useLoaderData(); // Load inventory from the loader
  const { setShoppingCart } = useOutletContext();
  const navigate = useNavigate();

  // State for the salad ingredients
  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extras, setExtras] = useState({});

  // State for touched fields to validate the form
  const [touched, setTouched] = useState(false);

  // Filter the inventory for different types of ingredients
  const foundationList = Object.keys(inventory).filter(name => inventory[name].foundation);
  const proteinList = Object.keys(inventory).filter(name => inventory[name].protein);
  const dressList = Object.keys(inventory).filter(name => inventory[name].dressing);
  const extraList = Object.keys(inventory).filter(name => inventory[name].extra);

  function handleFoundationChange(event) {
    setFoundation(event.target.value);
  }

  function handleProteinChange(event) {
    setProtein(event.target.value);
  }

  function handleDressingChange(event) {
    setDressing(event.target.value);
  }

  function handleExtraChange(event) {
    const { id, checked } = event.target;
    setExtras(prevExtras => ({ ...prevExtras, [id]: checked }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const selectedExtras = Object.keys(extras).filter(c => extras[c]);

    if (!event.target.checkValidity()) {
      setTouched(true);
      return;
    }

    // Create a new salad
    let s = new Salad();
    s
      .add(foundation, inventory[foundation].foundation)
      .add(protein, inventory[protein].protein)
      .add(dressing, inventory[dressing].dressing);

    selectedExtras.forEach(c => s.add(c, inventory[c].extra));
    s.uuid = uuidv4(); // Ensure a unique ID for each salad

    setShoppingCart((shoppingCart) => [...shoppingCart, s]);
    navigate(`/view-order/confirm/${s.uuid}`);

    // Reset form
    setFoundation("");
    setProtein("");
    setDressing("");
    setExtras({});
    setTouched(false);
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>

        <form className={touched ? "was-validated" : ""} onSubmit={handleSubmit} noValidate>
          <fieldset className="col-md-12">
            {/* Foundation select */}
            <label htmlFor="foundation" className="form-label">Välj bas</label>
            <select 
              value={foundation} 
              onChange={handleFoundationChange} 
              className="form-select" 
              id="foundation" 
              required
            >
              <option value="">Gör ditt val</option>  
              {foundationList.map(name => (
                <option key={name} value={name}>
                  {name} ({inventory[name].price} kr)
                </option>
              ))}
            </select>
            <div className="invalid-feedback">Du måste välja en bas.</div>

            {/* Protein select */}
            <label htmlFor="protein" className="form-label">Välj protein</label>
            <select 
              value={protein} 
              onChange={handleProteinChange} 
              className="form-select" 
              id="protein" 
              required
            >
              <option value="">Gör ditt val</option>  
              {proteinList.map(name => (
                <option key={name} value={name}>
                  {name} ({inventory[name].price} kr)
                </option>
              ))}
            </select>
            <div className="invalid-feedback">Du måste välja ett protein.</div>

            {/* Extras */}
            <label htmlFor="extra" className="form-label">Välj tillbehör</label>
            <div className="row h-200 p-5 bg-light border rounded-3">
              {extraList.map(name => (
                <div key={name} className="col-4">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    id={name}
                    name={name}
                    checked={extras[name] || false}
                    onChange={handleExtraChange}
                  />
                  <label htmlFor={name} className="form-check-label">
                    {name} ({inventory[name].price} kr)
                  </label>
                </div>
              ))}
            </div>

            {/* Dressing select */}
            <label htmlFor="dressing" className="form-label">Välj dressing</label>
            <select 
              value={dressing} 
              onChange={handleDressingChange} 
              className="form-select" 
              id="dressing" 
              required
            >
              <option value="">Gör ditt val</option>  
              {dressList.map(name => (
                <option key={name} value={name}>
                  {name} ({inventory[name].price} kr)
                </option>
              ))}
            </select>
            <div className="invalid-feedback">Du måste välja en dressing.</div>
          </fieldset>

          <button type="submit" className="btn btn-primary mt-3">Beställ</button>
        </form>
      </div>
    </div>
  );
}

export default ComposeSalad;