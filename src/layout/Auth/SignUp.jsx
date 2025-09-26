import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { register, signIntWithGoogle, updateuser } = useContext(AuthContext);

  // ────────────────────────────────
  // Email / Password Registration
  // ────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const photoFile = form.photo.files[0];

    // Validate password
    const passPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passPattern.test(password)) {
      const msg =
        "Password must have at least 1 uppercase, 1 lowercase, 1 digit, and be at least 6 characters.";
      setError(msg);
      toast.error(msg);
      return;
    }

    // Validate file size (<=100 MB)
    if (!photoFile) {
      toast.error("Please select an image to upload.");
      return;
    }
    if (photoFile.size > 100 * 1024 * 1024) {
      toast.error("Image size must be 100 MB or less.");
      return;
    }

    try {
      setUploading(true);
      // 1️⃣ Create user in Firebase
      await register(email, password);

      // 2️⃣ Update Firebase profile (display name only; photo comes from Cloudinary)
      await updateuser({ displayName: name });

      // 3️⃣ Send form data to backend for Cloudinary upload + DB save
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("photo", photoFile);

      await axios.post("https://apnrghor-server.vercel.app/adduser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Account created successfully! 🎉");
      form.reset();
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  // ────────────────────────────────
  // Google Sign-Up / Sign-In
  // ────────────────────────────────
  const handleGoogleSignUp = async () => {
    try {
      const result = await signIntWithGoogle();
      const user = result.user;

      // Send Google user info (no file) to backend
      await axios.post("https://apnrghor-server.vercel.app/adduser", {
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
          Create an Account
        </h2>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full bg-gray-100"
              placeholder="Your name"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photo (max 100 MB)
            </label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full font-semibold"
          >
            {uploading ? "Registering..." : "Register"}
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

          {error && (
            <p className="text-sm mt-3 text-center text-red-500">{error}</p>
          )}

          <p className="text-sm mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-700 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
