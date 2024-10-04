import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

function ViewOrder() {
  const { shoppingCart, setShoppingCart } = useOutletContext();
  const [orderConfirmation, setOrderConfirmation] = useState(null); // Store order confirmation
  const cart = Object.values(shoppingCart);
  //const { orderId } = useParams(); // Get the orderId from the URL

  // Function to handle the POST request
  const placeOrder = async () => {
    const salads = cart.map((salad) => Object.keys(salad.ingridients)); // Get the list of ingredients
    const orderDetails = JSON.stringify(salads);

    try {
      const response = await fetch("http://localhost:8080/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: orderDetails, // Send the salad details in the request body
      });

      if (!response.ok) {
        throw new Error(`Failed to place order. Status: ${response.status}`);
      }

      const confirmation = await response.json();
      setOrderConfirmation(confirmation); // Store the order confirmation
      setShoppingCart([]); // Clear the shopping cart after successful order

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
                {/* Display salad ingredients */}
                {Object.keys(salad.ingridients).reduce(
                  (prev, curr) => prev + curr + ", ", ""
                )}
                {" pris: " + salad.getPrice() + " kr"}
              </div>
            </div>
          ))
        ) : (
          <p>Varukorgen är tom.</p>
        )}

        {/* Display the order button if there are items in the cart */}
        {cart.length > 0 && (
          <button className="btn btn-primary mt-3" onClick={placeOrder}>
            Lägg beställning
          </button>
        )}

        {/* Order confirmation message */}
        {orderConfirmation && (
          <div className="mt-3 p-3 bg-success text-white rounded">
            <h4>Orderbekräftelse</h4>
            <p>Din beställning har mottagits!</p>
            <p>Ordernummer: {orderConfirmation.uuid}</p>
            <p>Beställningstid: {new Date(orderConfirmation.timestamp).toLocaleString()}</p>
            <p>Pris: {orderConfirmation.price} kr</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewOrder;