import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};



const Signup = () => {
  const [signupInfo, setSignupInfo] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  const nav = useNavigate();

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name, email and password are required");
    }
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => nav("/login"), 1000);
      } else if (error) {
        handleError(error?.details[0].message);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-4 leading-snug">
            Welcome to Fomo!
          </h2>
          <p className="text-lg">
            Sign up to start exploring a new way of building experiences.
          </p>
        </div>
        <div className="md:w-1/2 bg-gray-900 p-8">
          <h3 className="text-2xl font-semibold mb-6">Create an Account</h3>
          <form autoComplete="off" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                autoComplete="new-name"
                value={signupInfo.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                autoComplete="new-email"
                value={signupInfo.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                value={signupInfo.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-2 rounded-md font-medium"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
