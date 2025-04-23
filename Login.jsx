import React, {useState} from "react";
import Donation  from "../images/donation.jpg";
import { ToastContainer, toast } from 'react-toastify';

const Login = ({ onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    // If validation passes
    toast.success("Login successful!");
    if (email === "donor@gmail.com" && password === "123456") {
      onLoginSuccess(); // This must be a function from props
    } else {
      alert("Invalid credentials!");
    }  
    // Proceed with authentication (e.g., API call)
    console.log("LoginForm props:", { onLoginSuccess, onClose })
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 mt-20">
        {/* Header Section */}
        <div className="mb-4 text-center">
          <img src={Donation} alt="Log In" className="rounded-md mx-auto mb-4"/>
          <h2 className="text-xl font-bold text-gray-800">Log In</h2>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin}>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-b-[2px] border-gray-300 focus:outline-none focus:border-[#E46A6A] mb-4"
            required
          />

          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border-b-[2px] border-gray-300 focus:outline-none focus:border-[#E46A6A] mb-4"
            required
          />

          <div className="text-left mb-4">
            <a href="#" className="text-sm text-red-400 hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="flex gap-3">
          <button
            type="submit"
            className="w-full bg-[#E46A6A] text-white py-2 rounded-md hover:bg-[#e45d5d] transition"
          >
            Log In
          </button>
          <button 
            type="button"
            onClick={onClose} 
            className="w-full bg-[#E46A6A] text-white py-2 rounded-md hover:bg-[#e45d5d] transition"
          >
            Cancel
          </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm mt-4">
            Don't have an account?{" "}
            <a href="/Register" className="text-red-400 hover:underline">
              Register Now
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
