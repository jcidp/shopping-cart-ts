import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";


const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <ErrorPage />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default Router;