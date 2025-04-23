import React, { useEffect, useState } from "react";
import SlideBar from "./SlideBar";
import LogoutProfile from "./LogoutProfile";
import UpdateProfile from "./UpdateProfile";
import Header from "./Header";

// Mock patient data
const patientInfo = {
  name: "Zara",
  bloodGroup: "A+",
  category: "2-week", // or "4-week"
};

// Mock donor data
const mockDonors = [
  { name: "Ali", bloodGroup: "A+", city: "Lahore", donationDate: "2025-04-10", contact: "0321-1234567", email: "ali@gmail.com" },
  { name: "Sara", bloodGroup: "A+", city: "Karachi", donationDate: "2025-04-12", contact: "0333-4567890", email: "sara@gmail.com" },
  { name: "Ahmed", bloodGroup: "A+", city: "Islamabad", donationDate: "2025-04-15", contact: "0301-9876543", email: "ahmed@gmail.com" },
  { name: "Ayesha", bloodGroup: "A+", city: "Multan", donationDate: "2025-04-16", contact: "0345-1239874", email: "ayesha@gmail.com" },
  { name: "Hassan", bloodGroup: "A+", city: "Faisalabad", donationDate: "2025-04-18", contact: "0312-8765432", email: "hassan@gmail.com" },
  { name: "Fatima", bloodGroup: "A+", city: "Peshawar", donationDate: "2025-04-19", contact: "0300-5671234", email: "fatima@gmail.com" },
  { name: "Bilal", bloodGroup: "A+", city: "Rawalpindi", donationDate: "2025-04-20", contact: "0322-3456789", email: "bilal@gmail.com" },
  { name: "Nida", bloodGroup: "A+", city: "Hyderabad", donationDate: "2025-04-21", contact: "0304-4561237", email: "nida@gmail.com" }
];

const PatientDash = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [filteredDonors, setFilteredDonors] = useState([]);

  useEffect(() => {
    const matchedDonors = mockDonors.filter(
      (donor) => donor.bloodGroup === patientInfo.bloodGroup
    );

    const limit = patientInfo.category === "2-week" ? 8 : 4;
    const minimum = patientInfo.category === "2-week" ? 6 : 3;
    const selectedDonors = matchedDonors.slice(0, Math.max(minimum, Math.min(limit, matchedDonors.length)));

    setFilteredDonors(selectedDonors);
  }, []);

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  return (
      <div className="min-h-screen bg-white mt-24">
        <div className="">
          <h1 className="text-4xl font-bold mb-5 text-center">Welcome <span className="text-5xl font-bold text-[#840000]">{patientInfo.name}!</span></h1>
          <p className="text-2xl font-light text-center mb-5">Blood Group: <strong>{patientInfo.bloodGroup}</strong> | Category: <strong>{patientInfo.category}</strong></p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor, index) => (
              <div key={index} className="bg-white shadow-xl p-4 rounded-xl border border-pink-100">
                <h3 className="text-xl font-semibold text-red-600">{donor.name}</h3>
                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                <p><strong>City:</strong> {donor.city}</p>
                <p><strong>Donation Date:</strong> {donor.donationDate}</p>
                <p><strong>Contact:</strong> {donor.contact}</p>
                <p><strong>Email:</strong> {donor.email}</p>
              </div>
            ))}
          </div>
        </div>

      {showLogoutPopup && (
        <LogoutProfile
        setShowLogoutPopup={setShowLogoutPopup}
        setIsLoggedIn={() => {}}
        onLogout={() => window.location.href = "/"}
        />
      )}
      </div>
  );
};

export default PatientDash;
