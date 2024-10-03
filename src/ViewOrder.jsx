import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ViewOrder() {
  const { inventory, shoppingCart } = useOutletContext();
  const cart = Object.values(shoppingCart);
  const { orderId } = useParams(); // Get the orderId from the URL

  return (
    <div className="container col-12">
      <div className="h-200 p-5 bg-light border rounded-3">
        <h2>Varukorg</h2>

        {cart.length > 0 ? (
          cart.map((salad) => (
            <div className="list-unstyled" key={salad.uuid}>
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


        {/* Order confirmation message */}
        {orderId && (
          <div className="mt-3 p-3 bg-success text-white rounded">
            <h4>Orderbekräftelse</h4>
            <p>Din beställning har mottagits!</p>
            <p>Ordernummer: {orderId}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewOrder;
