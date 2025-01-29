import React from 'react'
import logo from '../images/Logo.png'




const Header = () => {
  return (
    <div>
    <header className="text-black body-font h-[70px] bg-white fixed top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          className="w-16 h-16 text-white p-2 rounded-full"
        />
  
        {/* Hamburger Menu for Mobile */}
        <div className="block md:hidden">
          <button
            id="menu-button"
            className="text-black focus:outline-none"
            onClick={() =>
              document.getElementById("mobile-menu").classList.toggle("hidden")
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
  
        {/* Navigation Links */}
        <nav
          id="desktop-menu"
          className="hidden md:flex flex-wrap items-center text-xl cursor-pointer space-x-4"
        >
          <a href="/" className="hover:text-gray-900">
            Home
          </a>
          <a href="/AboutUs" className="hover:text-gray-900">
            About
          </a>
          <a href="/RequestBlood" className="hover:text-gray-900">
            Request for Blood
          </a>
          <a href="/Donor" className="hover:text-gray-900">
            Donor
          </a>
          <a href="/" className="hover:text-gray-900">
            FAQs
          </a>
          <a href="/Patient" className='hover:text-gray-900'>
          Thalssemia Patient
          </a>
        </nav>
  
        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <a href="/login">
            <button
              id="btn2"
              className="inline-flex items-center py-2 px-5 text-xl border border-black rounded hover:bg-gray-100"
            >
              Login
            </button>
          </a>
          <a href="/Register">
            <button
              id="btn2"
              className="inline-flex items-center py-2 px-5 text-xl bg-black text-white rounded hover:bg-gray-800"
            >
              Register Now
            </button>
          </a>
        </div>
      </div>
  
      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="md:hidden flex flex-col space-y-4 bg-white shadow-lg absolute w-full top-[70px] left-0 px-4 py-4"
      >
        <a href="/" className="hover:text-gray-900">
          Home
        </a>
        <a href="/AboutUs" className="hover:text-gray-900">
          About
        </a>
        <a href="/RequestBlood" className="hover:text-gray-900">
          Request for Blood
        </a>
        <a href="/Register" className="hover:text-gray-900">
          Donor
        </a>
        <a href="/" className="hover:text-gray-900">
          FAQs
        </a>
        <a href="/login">
          <button
            id="btn2"
            className="block w-full text-left py-2 px-5 text-xl border border-black rounded hover:bg-gray-100"
          >
            Login
          </button>
        </a>
        <a href="/Register">
          <button
            id="btn2"
            className="block w-full text-left py-2 px-5 text-xl bg-black text-white rounded hover:bg-gray-800"
          >
            Register Now
          </button>
        </a>
      </div>
    </header>
  </div>
  
  )
}

export default Header
