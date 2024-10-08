import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function ViewOrder() {
  const { shoppingCart, setShoppingCart } = useOutletContext();
  const [orderConfirmation, setOrderConfirmation] = useState(null); 
  const cart = Object.values(shoppingCart);

  // Function to handle the POST request
  const placeOrder = async () => {
    const salads = cart.map((salad) => Object.keys(salad.ingredients)); 
    const orderDetails = JSON.stringify(salads);

    try {
      const response = await fetch("http://localhost:8080/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: orderDetails, 
      });

      if (!response.ok) {
        throw new Error(`Failed to place order. Status: ${response.status}`);
      }

      const confirmation = await response.json();
      setOrderConfirmation({ ...confirmation, saladCount: salads.length }); 
      setShoppingCart([]); 

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order, please try again.");
    }
  };

  return (
    <div className="container col-12">
      <div className="h-200 p-5 bg-light border rounded-3">
        <h2>Varukorg</h2>

        {cart.length > 0 ? (
          cart.map((salad, index) => (
            <div className="list-unstyled" key={index}>
              <div className="mb-1 p-3 bg-white border rounded">
                {Object.keys(salad.ingredients).reduce(
                  (prev, curr) => prev + curr + ", ", ""
                )}
                {" pris: " + salad.getPrice() + " kr"}
              </div>
            </div>
          ))
        ) : (
          <p>Varukorgen är tom.</p>
        )}

        
        {cart.length > 0 && (
          <button className="btn btn-primary mt-3" onClick={placeOrder}>
            Lägg beställning
          </button>
        )}

        
        {orderConfirmation && (
          <div className="mt-3 p-3 bg-success text-white rounded">
            <h4>Orderbekräftelse</h4>
            <p>Din beställning har mottagits!</p>
            <p>Ordernummer: {orderConfirmation.uuid}</p>
            <p>Beställningstid: {new Date(orderConfirmation.timestamp).toLocaleString()}</p>
            <p>Antal sallader: {orderConfirmation.saladCount}</p> 
            <p>Pris: {orderConfirmation.price} kr</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewOrder;