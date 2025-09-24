import { useContext, useState, useRef, useEffect } from "react";
import { FiMenu, FiLogOut, FiLogIn } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { UserInfoContext } from "../../Provider/UserInfoProvider/UserInfoProvider";
import logo from "../../assets/logo.png"
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const { userInfo } = useContext(UserInfoContext);
    const navigate = useNavigate();
    const sidebarRef = useRef(null);


    // Handle logout
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    // Close sidebar on outside click (mobile)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Sidebar links
    const links = (
        <>
            {/* Common links */}

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
            {/* Admin-only links */}
            {userInfo?.role === "ADMIN" && (
                <>
                    <NavLink
                        to="/dashboard/adminprofile"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        Admin Profile
                    </NavLink>

                    <NavLink
                        to="/dashboard/managemembers"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        Manage Members
                    </NavLink>

                    <NavLink
                        to="/dashboard/makeannouncement"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        Make Announcement
                    </NavLink>

                    <NavLink
                        to="/dashboard/agreementrequests"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        Agreement Requests
                    </NavLink>

                    <NavLink
                        to="/dashboard/managecoupons"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        Manage Coupons
                    </NavLink>
                </>

            )}
            {userInfo?.role === "member" &&
                <>


                    <NavLink
                        to="/dashboard/myprofile"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        My Profile
                    </NavLink>

                    <NavLink
                        to="/dashboard/makepayment"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        Make Payment
                    </NavLink>
                    <NavLink
                        to="/dashboard/paymenthistory"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        Payment History
                    </NavLink>

                    <NavLink
                        to="/dashboard/announcements"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        Announcements
                    </NavLink>
                </>

            }
            {userInfo?.role === "user" && <>
                    <NavLink
                        to="/dashboard/myprofile"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        My Profile
                    </NavLink>

                    <NavLink
                        to="/dashboard/announcements"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                                : "px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                        }
                    >
                        Announcements
                    </NavLink>
                </>}
            {/* Auth buttons */}
            {user ? (
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 transition"
                >
                    <FiLogOut /> Logout
                </button>
            ) : (
                <>
                    <NavLink
                        to="/login"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400 text-white font-semibold hover:bg-emerald-700 transition"
                    >
                        <FiLogIn /> Login
                    </NavLink>
                    <NavLink
                        to="/signup"
                        className="px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                    >
                        Signup
                    </NavLink>
                </>
            )}
        </>
    );

    return (
        <div className="flex lg:fixed">
            {/* Sidebar (desktop + mobile) */}
            <div
                ref={sidebarRef}
                className={`fixed z-[1000] left-0 h-full lg:min-h-screen w-64 bg-white shadow-lg transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static`}
            >
                <div className="p-4 border-b border-gray-300 flex justify-between items-center">
                    <img className="w-40" src={logo} alt="" />
                    <button
                        className="lg:hidden text-2xl text-gray-600"
                        onClick={() => setIsOpen(false)}
                    >
                        <IoMdClose />
                    </button>
                </div>
                <ul className="p-4 flex flex-col gap-2">{links}</ul>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-5 py-4 z-50">
                <h2 className="text-xl font-bold text-emerald-700">ApnrGhor</h2>
                {!isOpen && (
                    <button
                        className="text-2xl text-gray-600"
                        onClick={() => setIsOpen(true)}
                    >
                        <FiMenu />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
