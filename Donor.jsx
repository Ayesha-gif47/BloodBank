import React, {useState} from 'react'
import SampleDonor from './SampleDonor'

const Donor = () => {
        const [confirmed, setConfirmed] = useState(null);
      
        const handleConfirmation = (response) => {
          setConfirmed(response);
        };
      
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

    {/* Donor Registration Form */}
    {confirmed === null && (
        <div className="w-full max-w-md bg-gradient-to-t from-[#840000] to-[#ffff] shadow-md p-4 rounded-lg">
        <div className="bg-white rounded-[32px] shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-center">Are you sure you want to donate blood?</h2>
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => handleConfirmation(true)}
            className="px-4 py-1 text-xl" id='btn2'
          >
            Yes
          </button>
          <button
            onClick={() => handleConfirmation(false)}
            className="px-4 py-1 text-xl" id='btn2'
          >
            No
          </button>
        </div>
      </div>
    </div>
    )}

    {/* Donor Form */}
    {confirmed === true && (
        <SampleDonor/>
    )}

    {/* Thank You Message */}
    {confirmed === false && (
        <div className="w-full max-w-md bg-gradient-to-t from-[#840000] to-[#ffff] shadow-md p-4 rounded-lg">
      <div className="bg-white rounded-[32px] shadow-lg w-full max-w-md p-6 text-center">
        <h2 className="text-2xl font-bold">Thank You!</h2>
        <p>We appreciate your time. Let us know if you change your mind!</p>
      </div>
      </div>
    )}
  </div>
  )
}

export default Donor
