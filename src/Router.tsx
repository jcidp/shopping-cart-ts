import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Shop from "./components/Shop";
import CartRoute from "./components/CartRoute";
import ThankYou from "./components/ThankYou";


const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            errorElement: (
              <App>
                <ErrorPage />
              </App>
            ),
            children: [
              {index: true, element: <Home />},
              {path: "shop", element: <Shop />},
              {path: "cart", element: <CartRoute />},
              {path: "thank-you", element: <ThankYou />}
          ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default Router;
