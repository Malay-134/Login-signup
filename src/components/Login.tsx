import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const nav = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      // console.log(result);
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("LoggedInUser", name);
        setTimeout(() => nav("/home"), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || "Login failed.");
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
            Welcome Back!
          </h2>
          <p className="text-lg">
            Log in and continue your journey with Fomo. Let’s build something
            amazing.
          </p>
        </div>

        <div className="md:w-1/2 bg-gray-900 p-8">
          <h3 className="text-2xl font-semibold mb-6">
            Log In to Your Account
          </h3>
          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                autoComplete="new-email"
                value={loginInfo.email}
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
                value={loginInfo.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-2 rounded-md font-medium"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
