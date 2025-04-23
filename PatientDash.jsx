import React, { useState } from "react";
import { FaBars, FaTimes, FaUserMd, FaCalendarAlt, FaNotesMedical } from "react-icons/fa";

const ThalassemiaDash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#840000] text-white transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-500">
          <h2 className="text-xl font-semibold">Patient Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes className="text-white text-2xl" />
          </button>
        </div>
        <ul className="mt-6 space-y-6 px-6">
          <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
            <FaUserMd /> Dashboard
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
            <FaNotesMedical /> Reports
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
            <FaCalendarAlt /> Treatment Plan
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
            <FaCalendarAlt /> Appointments
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
            Logout
          </li>
        </ul>
      </div>

      {/* Hamburger Menu */}
      <button
        className="absolute top-4 left-4 text-3xl text-[#840000]"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <div className="ml-16 p-6">
        <h1 className="text-3xl font-bold text-[#840000]">Thalassemia Patient Dashboard</h1>

        {/* Patient Details */}
        <div className="mt-6 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700">Patient Details</h2>
          <p className="mt-2"><strong>Name:</strong> John Doe</p>
          <p><strong>Blood Type:</strong> B+</p>
          <p><strong>Diagnosis:</strong> Thalassemia Major</p>
          <p><strong>Schedule:</strong> 4 Weeks</p>
        </div>

        {/* Blood Transfusion Schedule */}
        <div className="mt-6 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700">Blood Transfusion Schedule</h2>
          <ul className="mt-2">
            <li className="text-gray-600">🩸 Next Transfusion: March 10, 2025</li>
            <li className="text-gray-600">🕒 Last Transfusion: February 10, 2025</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThalassemiaDash;
