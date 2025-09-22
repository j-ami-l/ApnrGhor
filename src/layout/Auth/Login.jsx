import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { login, signIntWithGoogle } = useContext(AuthContext);

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(() => {
                setError(null);
                toast.success("Logged in successfully 🎉");
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
                toast.error(err.message);
            });
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signIntWithGoogle();
            const user = result.user;

            // Send Google user info (no file) to backend
            await axios.post("http://localhost:5000/adduser", {
                name: user.displayName,
                email: user.email,
                googlePhotoURL: user.photoURL,
            });

            toast.success("Signed in with Google ✅");
            navigate("/");
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    return (
        <div className="lg:min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="w-full max-w-md p-8 shadow-lg bg-white rounded-2xl border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
                    Sign in to Your Account
                </h2>

                {/* Inline error message */}
                {error && (
                    <div className="text-red-500 text-sm mb-4 text-center border border-red-300 p-2 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            className="input input-bordered w-full bg-gray-100"
                            placeholder="example@mail.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="input input-bordered w-full bg-gray-100"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <Link
                            to="/resetPass"
                            className="text-emerald-600 hover:underline text-xs md:text-sm"
                        >
                            Forgot password?
                        </Link>
                        <span className="text-xs md:text-sm">
                            Don’t have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-emerald-700 font-medium hover:underline"
                            >
                                Register
                            </Link>
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full font-semibold"
                    >
                        Login
                    </button>

                    <div className="divider text-sm text-gray-400">OR</div>

                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        className="btn w-full flex items-center gap-3 border bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google logo"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
