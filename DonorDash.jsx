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
