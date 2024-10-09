import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import inventoryLoader from "./inventoryApi";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "compose-salad", 
        loader: inventoryLoader, 
        Component: ComposeSalad  },
      { path: "view-order", 
        Component: ViewOrder  },
      { path: "view-order/confirm/:orderId", 
        Component: ViewOrder }, // Route for order confirmation
      { index: true, 
        element: <p>Welcome to my own salad bar</p> },
      { path: "*", 
        element: <p>Page not found</p> }, // Wildcard for 404
    ],
  },
]);



export default router;