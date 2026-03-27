import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from 'react-dom/client'
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        //Component: Home,
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/register",
        Component: Register,
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />,
);
