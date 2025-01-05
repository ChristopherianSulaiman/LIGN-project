import React from "react";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Hide modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Login / Sign Up</h2>

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md mb-3"
        />
        
        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md mb-3"
        />

        {/* Login Button */}
        <button className="w-full bg-[#6BB1A6] text-white py-2 rounded-lg hover:bg-[#5a9d92] transition">
          Login
        </button>

        <p className="text-sm text-center mt-2">
          Don't have an account? <span className="text-blue-600 cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
