import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, signIntWithGoogle, updateuser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name, photo } = Object.fromEntries(formData.entries());

    const passPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passPattern.test(password)) {
      const msg =
        "Password must have at least 1 uppercase, 1 lowercase, 1 digit, and be at least 6 characters.";
      setError(msg);
      toast.error(msg);
      return;
    }

    register(email, password)
      .then(() => {
        setError(null);
        updateuser({ displayName: name, photoURL: photo })
          .then(() => {
            toast.success("Account created successfully! 🎉");
            navigate("/");
          })
          .catch((err) => {
            setError(err.message);
            toast.error(err.message);
          });
        form.reset();
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleSignUp = () => {
    signIntWithGoogle()
      .then(() => {
        toast.success("Signed in with Google ✅");
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="lg:min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 shadow-lg bg-white rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full bg-gray-100"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input input-bordered w-full bg-gray-100"
              placeholder="Photo URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full bg-gray-100"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full bg-gray-100"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full font-semibold"
          >
            Register
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

          <p className="text-sm mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-700 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
