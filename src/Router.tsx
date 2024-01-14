import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Shop from "./components/Shop";


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
          ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default Router;