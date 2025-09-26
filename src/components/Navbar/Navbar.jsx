import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { UserInfoContext } from "../../Provider/UserInfoProvider/UserInfoProvider";
import logo from '../../assets/logo.png'
const Navbar = () => {
    const { logout, user } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const {userInfo} = useContext(UserInfoContext)
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    // Links common to all users
    const navLinks = (
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
        </>
    );

    return (
        <div className="navbar sticky top-0 z-[1000] bg-white shadow-md px-4">
            {/* Left Section */}
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-52 rounded-lg bg-white text-gray-700 shadow-lg z-[1]"
                    >
                        {navLinks}
                    </ul>
                </div>

                {/* Brand Name */}
                <NavLink to="/" className="btn ml-5 md:ml-0 btn-ghost text-2xl font-bold tracking-wide text-emerald-700">
                    <img className="w-40" src={logo} alt="" />
                </NavLink>
            </div>

            {/* Right Section */}
            <div className="navbar-end flex items-center gap-2">
                {/* Desktop Links */}
                <ul className="menu menu-horizontal px-1 gap-1 hidden lg:flex">
                    {navLinks}
                </ul>

                {/* Avatar / Login */}
                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        {/* Avatar Button */}
                        <button
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-600"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <img
                                src={userInfo?.photoURL || "https://i.ibb.co/2FsfXqM/default-avatar.png"}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className="block px-4 py-2 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 transition"
                                    >
                                        <FiLogOut /> Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400 text-white font-semibold hover:bg-emerald-700 transition">
                            <FiLogIn />
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
