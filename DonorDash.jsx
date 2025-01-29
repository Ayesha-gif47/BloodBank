import React, { useState } from 'react'

const DonorDash = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleButtonClick = ()=>{
       console.log("save the life click")
        setShowPopup(true);
    };
    const handleYesClick = ()=>{
        console.log("show sms is clicked")
        setShowPopup(false);
        setShowMessage(true);
    };
    const handleNoClick = ()=>{
        setShowPopup(false);
        setShowMessage(false);
    }
  return (

    <div>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4'>
        <h1 className='text-3xl font-bold mb-5'>Welcome <span className='text-5xl font-bold text-[#840000]'>!</span></h1>
        <p className='text-xl font-semibold'>Here you can manage your account update your profile.</p>
        {!showMessage && <button id='btn2' className='h-10 w-40 mt-5 text-white font-bold py-2 px-4' onClick={handleButtonClick}>Save The Life</button>}
      </div>
      {/* Popup Structure */}
      {showPopup && (
          <div>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
                }} onClick={handleNoClick}>
                
            </div>
            <div style={{
                position: 'fixed',
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "50px 80px",
                zIndex: 1000,
                textAlign: "center",
            }}>
                <h2 className='text-xl font-normal'>Do you donate blood?</h2>
                <div className='flex gap-5 mt-5'>
                <button onClick={handleYesClick} id='btn1' className='w-20'>Yes</button>
                <button onClick={handleNoClick} id='btn1' className='w-20'>Oops No</button>
                </div>
                
            </div>
          </div>
      )}
        {/* show SMS Box if yes is clicked  */}
        {showMessage && (
            <div style={{
                position: 'fixed',
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                marginTop: "90px",
                padding: "10px",
                border: "3px solid #840000",
                display: "inline-block",
            }}>
                <p className='text-xl font-normal'>Thanks For Donating Blood</p>
            </div>    
        )}
    </div>
  );
}

export default DonorDash
