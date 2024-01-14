import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";


const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorPage />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default Router;