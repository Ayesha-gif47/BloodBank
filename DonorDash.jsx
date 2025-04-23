import React, {useState} from 'react'
import Hero from './Hero'

const DonorDash = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [agreedToDonate, setAgreedToDonate] = useState(false);
  const [available, setAvailable] = useState(true);

  const donor = {
    name: "Areeba Khan",
    bloodGroup: "B+",
    lastDonation: "2024-12-15",
    nextDonation: "2025-06-15"
  };

  const handleDonateClick = () => setShowPopup(true);
  const handleAgree = () => {
    setAgreedToDonate(true);
    setShowPopup(false);
  };
  const handleDisagree = () => setShowPopup(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
    <div className="">
    <h1 className="text-4xl font-bold mb-5">Welcome, <span className="text-5xl font-bold text-[#840000]">{donor.name}!</span></h1>
    <p className="text-2xl font-light"><strong>Blood Group:</strong> {donor.bloodGroup}</p>
    <p className="text-2xl font-light"><strong>Last Donation:</strong> {donor.lastDonation}</p>
    <p className="text-2xl font-light"><strong>Next Donation:</strong> {donor.nextDonation}</p>

    <div className="mt-6 space-x-4">
      {!agreedToDonate ? (
        <div className='flex gap-8'>
        <button
          onClick={handleDonateClick}
          className="h-10 w-40 text-white font-bold rounded-md bg-gradient-to-b from-[#840000] to-[#000000]"
        >
          Save the Life
        </button>
              <button
              onClick={() => setAvailable(!available)}
              
              className={`h-10 w-48 text-white font-bold  rounded-md ${available ? "bg-gradient-to-b from-[#840000] to-[#000000]" : "bg-gray-400"}` }
            >
              {available ? "Available for Donation" : "Not Available Now"}
            </button>
            </div>
      ) : (
        <span className="text-[#840000] font-bold text-3xl">Thanks for Donation 😊😊</span>
      )}


    </div>

    {showPopup && (
      <div className="fixed top-1/2 w-1/3 h-40 left-1/2 transform -translate-x-1/3 -translate-y-1/2 bg-white p-6 z-50 text-center rounded-md shadow-md">
        <p className="text-black font-semibold mb-2 text-xl">Do you agree to donate blood?</p>
        <div className="space-x-4">
          <button
            onClick={handleAgree}
            id="btn2"
            className="text-white px-5 py-2 rounded m-3"
          >
            Yes
          </button>
          <button
            onClick={handleDisagree}
            id='btn2'
            className="text-white px-5 py-2 rounded m-3"
          >
            No
          </button>
        </div>
      </div>
    )}
  </div>
  </div>
  )
}

export default DonorDash







//   return (
//     <div className="relative">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transition-transform transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } z-50`}
//       >
//         <div className="flex justify-between items-center px-4 py-4">
//           <h2 className="text-xl font-semibold">Menu</h2>
//           <button onClick={() => setSidebarOpen(false)}>
//             <FaTimes className="text-white text-2xl" />
//           </button>
//         </div>
//         <ul className="mt-4 space-y-4 px-6">
//           <li className="cursor-pointer hover:text-gray-400">Dashboard</li>
//           <li className="cursor-pointer hover:text-gray-400">Update Profile</li>
//           <li className="cursor-pointer hover:text-gray-400">Profile</li>
//           <li className="cursor-pointer hover:text-gray-400">Logout</li>
//         </ul>
//       </div>

//       {/* Hamburger Menu */}
//       <button
//         className="absolute top-4 left-4 text-3xl text-gray-700"
//         onClick={() => setSidebarOpen(true)}
//       >
//         <FaBars />
//       </button>

//       {/* Main Dashboard */}
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//         <h1 className="text-3xl font-bold mb-5">
//           Welcome <span className="text-5xl font-bold text-[#840000]">!</span>
//         </h1>
//         <p className="text-xl font-semibold">
//           Here you can manage your account and update your profile.
//         </p>
//         {!showMessage && (
//           <button
//             id="btn2"
//             className="h-10 w-40 mt-5 text-white font-bold py-2 px-4 bg-red-600 rounded-md"
//             onClick={handleButtonClick}
//           >
//             Save The Life
//           </button>
//         )}
//       </div>

//       {/* Popup */}
//       {showPopup && (
//         <div>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={handleNoClick}
//           ></div>
//           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-50 text-center rounded-md shadow-md">
//             <h2 className="text-xl font-normal">Do you donate blood?</h2>
//             <div className="flex gap-5 mt-5">
//               <button onClick={handleYesClick} className="w-20 bg-green-600 text-white py-2 px-4 rounded-md">
//                 Yes
//               </button>
//               <button onClick={handleNoClick} className="w-20 bg-red-600 text-white py-2 px-4 rounded-md">
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Message Box */}
//       {showMessage && (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 border-2 border-red-600 rounded-md shadow-md">
//           <p className="text-xl font-normal">Thanks For Donating Blood</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DonorDash;
