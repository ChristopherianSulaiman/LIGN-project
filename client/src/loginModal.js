import React, { useState } from "react";
import axios from "axios";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error message

  if (!isOpen) return null;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      // Try to log in first
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      alert(response.data);  // Success message
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const confirmRegister = window.confirm(
          "No account found. Would you like to create a new account?"
        );
  
        if (confirmRegister) {
          try {
            const registerResponse = await axios.post(
              "http://localhost:4000/api/auth/register",
              { email, password }
            );
            alert(registerResponse.data);  // Success registration message
            onClose();
          } catch (registerError) {
            setError(
              registerError.response?.data || "Registration failed. Try again."
            );
          }
        }
      } else {
        // If another error occurs, display it
        setError(error.response?.data || "Something went wrong");
      }
    }
  };
  



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Login / Sign Up</h2>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-center mb-3">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#6BB1A6] text-white py-2 rounded-lg hover:bg-[#5a9d92] transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-2">
          Don't have an account? <span className="text-blue-600 cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
