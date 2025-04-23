import React, { useState } from 'react';

const LogoutProfile = ({ setShowLogoutPopup, setIsLoggedIn, onLogout }) => {
    const [password, setPassword] = useState("");

    const handleConfirm = () => {
      if (password === "12345") { // Dummy password check
        setIsLoggedIn(false);
        setShowLogoutPopup(false);
        if (typeof onLogout === "function") {
          onLogout();
        }
      } else {
        alert("Incorrect password!");
      }
    };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[25rem] h-52">
        <h3 className="text-xl font-bold text-black mb-4">Do you agree to logout?</h3>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
        />
        <div className="flex justify-between">
          <button
            onClick={handleConfirm}
            className="bg-[#840000] text-white px-4 py-2 rounded "
          >
            Confirm
          </button>
          <button
            onClick={() => setShowLogoutPopup(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutProfile;
