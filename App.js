import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import RequestBlood from './components/RequestBlood';
import DonorDash from './components/DonorDash';
import SlideBar from './components/SlideBar';
import UpdateProfile from './components/UpdateProfile';
import LogoutProfile from './components/LogoutProfile';
import Donor from './components/Donor';
import Patient from './components/Patient';
import PatientDash from './components/PatientDash';
import FAQs from './components/FAQs';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userType, setUserType] = useState(null);  // 'donor' or 'patient'


  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
    setShowLogoutPopup(false);
    setShowSidebar(false);
    setCurrentView("dashboard");
    navigate("/"); // Redirect to home page after logout
  };

  const handleLoginSuccess = (type) => {
    setIsLoggedIn(true);
    setUserType(type); // Store whether it's a donor or patient
    setShowLoginModal(false);
    setShowSidebar(true);
    setCurrentView("dashboard");
    navigate(type === "donor" ? "/DonorDash" : "/PatientDash");
  };
  

  const handleRealLogout = () => {
    setIsLoggedIn(false);
    setShowSidebar(false);
    setCurrentView("dashboard");
    navigate("/"); 
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/RequestBlood' element={<RequestBlood />} />
        <Route path='/Donor' element={<Donor />} />
        <Route path='/Patient' element={<Patient />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/LogoutProfile" element={<LogoutProfile onLogout={handleLogoutSuccess} />} />
      </Routes>
 <Header isLoggedIn={isLoggedIn} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {showSidebar && (
          <SlideBar
            setCurrentView={setCurrentView}
            handleLogout={handleLogout}
          />
        )}

        <div className="flex-1 p-4">
          {currentView === "dashboard" && isLoggedIn && (userType === "donor" ? <DonorDash /> : <PatientDash />)}
          {currentView === "update" && <UpdateProfile userType={userType} />}
        </div>
      </div>
      {showLogoutPopup && (
        <LogoutProfile
          setShowLogoutPopup={setShowLogoutPopup}
          setIsLoggedIn={setIsLoggedIn}
          onLogout={handleLogoutSuccess}
        />
      )}

      {showLoginModal && (
        <Login onLoginSuccess={handleLoginSuccess} onClose={() => setShowLoginModal(false)} />
      )}

      <Footer />
    </>
  );
}

export default App;
