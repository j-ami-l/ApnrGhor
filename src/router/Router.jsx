import { createBrowserRouter } from "react-router";
import Root from "../layout/Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../layout/Auth/Login";
import SignUp from "../layout/Auth/SignUp";
import Apartments from "../Pages/Apartments/Apartments";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                element:<Home></Home>
            },
            {
                path: "/apartments",
                element: <Apartments></Apartments>
            }
        ]
    },
    {
        path:'/login',
        element :<Login></Login>
    },
    {
        path: '/signup',
        element:<SignUp></SignUp>
    }
])