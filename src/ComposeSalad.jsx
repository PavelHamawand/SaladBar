import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom'; 
import Salad from './Salad.mjs';
import { v4 as uuidv4 } from 'uuid'; 

function ComposeSalad() {
  const { inventory, setShoppingCart } = useOutletContext();
  const navigate = useNavigate();

  // State for each form field
  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extras, setExtra] = useState({});

  // Single touched state
  const [touched, setTouched] = useState(false);
  
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
    setExtra(prevExtras => ({ ...prevExtras, [id]: checked }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const selectedExtras = Object.keys(extras).filter(c => extras[c]);

    // Form validation logic
    if (!event.target.checkValidity()) {
      setTouched(true); // Mark form as touched when trying to submit
      return;
    }

    let s = new Salad();
    s
      .add(foundation, inventory[foundation].foundation)
      .add(protein, inventory[protein].protein)
      .add(dressing, inventory[dressing].dressing);

    selectedExtras.forEach(c => s.add(c, inventory[c].extra));
    const orderId = uuidv4();
    setShoppingCart((shoppingCart) => [...shoppingCart, s]);

    navigate(`/view-order/confirm/${orderId}`);
    
    // Reset form
    setFoundation("");
    setProtein("");
    setDressing("");
    setExtra({});
    setTouched(false);
  }

  const Select = ({ id, labelText, value, onChange, options, touched, errorMessage }) => {
    return (
      <>
        <label htmlFor={id} className="form-label">{labelText}</label>
        <select 
          value={value} 
          onChange={onChange} 
          className={`form-select ${touched && !value ? 'is-invalid' : ''}`} 
          id={id} 
          required
        >
          <option value="">Gör ditt val</option>  
          {options.map(name => (
            <option key={name} value={name}>
              {name} ({inventory[name].price} kr)
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errorMessage}</div>
      </>
    );
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>

        <form className={touched ? "was-validated" : ""} onSubmit={handleSubmit} noValidate>
          <fieldset className="col-md-12">
            <Select 
              id="foundation"
              labelText="Välj bas"
              value={foundation}
              onChange={handleFoundationChange}
              options={foundationList}
              touched={touched}
              errorMessage="Du måste välja en bas."
            />

            <Select 
              id="protein"
              labelText="Välj protein"
              value={protein}
              onChange={handleProteinChange}
              options={proteinList}
              touched={touched}
              errorMessage="Du måste välja ett protein."
            />

            <label htmlFor="extra" className="form-label">Välj tillbehör</label>
            <div className="row h-200 p-5 bg-light border rounded-3">
              {extraList.map(name => (
                <div key={name} className="col-4">
                  <input 
                    type="checkbox"
                    className={`form-check-input ${touched && Object.keys(extras).filter(c => extras[c]).length === 0 ? 'is-invalid' : ''}`}
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
            {touched && Object.keys(extras).filter(c => extras[c]).length === 0 && (
              <div className="invalid-feedback d-block">Du måste välja minst ett tillbehör.</div>
            )}

            <Select 
              id="dressing"
              labelText="Välj dressing"
              value={dressing}
              onChange={handleDressingChange}
              options={dressList}
              touched={touched}
              errorMessage="Du måste välja en dressing."
            />
          </fieldset>

          <button type="submit" className="btn btn-primary mt-3">Beställ</button>
        </form>
      </div>
    </div>
  );
}

export default ComposeSalad;