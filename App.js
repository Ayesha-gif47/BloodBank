import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'
import AboutUs from './components/AboutUs';
import Login from './components/Login'
import Hero from './components/Hero'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/Register';
import RequestBlood from './components/RequestBlood'
import DonorDash from './components/DonorDash'
import Donor from './components/Donor'
import Patient from './components/Patient';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path='/AboutUs' element={<AboutUs/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/RequestBlood' element={<RequestBlood/>} />
        <Route path='/DonorDash' element={<DonorDash/>} />
        <Route path='/Donor' element={<Donor/>}/>
        <Route path='/Patient' element={<Patient/>}/>
      </Routes>
    </BrowserRouter>  
    <Header/>
    <Footer/>

    </>
  );
}

export default App;