import { createBrowserRouter } from "react-router";
import Root from "../layout/Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../layout/Auth/Login";
import SignUp from "../layout/Auth/SignUp";
import Apartments from "../Pages/Apartments/Apartments";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../layout/Dashboard/Dashboard";
import DashBoardHome from "../Pages/DashBoardHome/DashBoardHome";
import MyProfile from "../Pages/MyProfile/MyProfile";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import AgreementRqst from "../Pages/AgreementRqst/AgreementRqst";
import AllMember from "../Pages/AllMember/AllMember";
import AddAnnouncment from "../Pages/AddAnnouncment/AddAnnouncment";
import ManageCoupons from "../Pages/ManageCoupons/ManageCoupons";
import Announcements from "../Pages/Announcements/Announcements";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/apartments",
                element: <PrivateRouter>
                    <Apartments></Apartments>
                </PrivateRouter>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    },
    {
        path: '/dashboard',
        element: < Dashboard></Dashboard>,
        children: [
            {
                index: true,
                element: <DashBoardHome></DashBoardHome>
            },
            {
                path: '/dashboard/myprofile',
                element: <PrivateRouter>
                    <MyProfile></MyProfile>
                </PrivateRouter>
            },
            {
                path: "/dashboard/adminprofile",
                element: <PrivateRouter>
                    <AdminPrivateRoute>
                        <AdminProfile></AdminProfile>
                    </AdminPrivateRoute>
                </PrivateRouter>
            },
            {
                path: "/dashboard/agreementrequests",
                element: <PrivateRouter>
                    <AdminPrivateRoute>
                        <AgreementRqst></AgreementRqst>
                    </AdminPrivateRoute>
                </PrivateRouter>
            },
            {
                path : "/dashboard/managemembers" , 
                element : <PrivateRouter>
                    <AdminPrivateRoute>
                        <AllMember></AllMember>
                    </AdminPrivateRoute>
                </PrivateRouter>
            },
            {
                path : "/dashboard/makeannouncement" , 
                element : <PrivateRouter>
                    <AdminPrivateRoute>
                        <AddAnnouncment></AddAnnouncment>
                    </AdminPrivateRoute>
                </PrivateRouter>
            }
            ,
            {
                path : "/dashboard/managecoupons" , 
                element : <PrivateRouter>
                    <AdminPrivateRoute>
                        <ManageCoupons></ManageCoupons>
                    </AdminPrivateRoute>
                </PrivateRouter>
            },
            {
                path:"/dashboard/announcements",
                element:<Announcements></Announcements>
            }
        ]
    }
])