import React from "react";
import { Link, NavLink } from "react-router"; // ✅ use react-router-dom
import { FiLogIn } from "react-icons/fi";

const Navbar = () => {
    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                            : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/apartments"
                    className={({ isActive }) =>
                        isActive
                            ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                            : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                    }
                >
                    Apartments
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                            : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                    }
                >
                    Dashboard
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar sticky top-0 z-50 bg-white shadow-md">
            {/* Left Section */}
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h12M4 18h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-52 rounded-lg bg-white text-gray-700 shadow-lg z-[1]"
                    >
                        {links}
                    </ul>
                </div>
                {/* Brand Name */}
                <NavLink
                    to="/"
                    className="btn btn-ghost text-2xl font-bold tracking-wide text-emerald-700"
                >
                    ApnrGhor
                </NavLink>
            </div>

            {/* Right Section */}
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
                <Link to={'/login'}>
                    <button className="ml-4 flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-400 text-white font-semibold hover:bg-emerald-700 transition shadow-md">
                        <FiLogIn className="text-lg" />
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
