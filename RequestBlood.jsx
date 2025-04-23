import React, {useState} from 'react'
import { Country, State, City } from "country-state-city";
import requestblood from '../images/requestblood.jpg'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RequestBlood = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); // Store selected city
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
      patientName: "",
      phone: "",
      email: "",
    });
  
    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    // Form submission with validation
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const {
        patientName,
        phone,
        email,
      } = formData;
  
      // Check if required fields are empty
      if (!patientName || !phone || !email  ) {
        toast.error("All fields are required!");
        return;
      }
  
      // Validate phone number format
      if (!/^\+?\d{10,15}$/.test(phone)) {
        toast.error("Invalid phone number!");
        return;
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          toast.error("Invalid email format!");
          return;
        }
       // Show success notification
          toast.success("You request has been submitted successfully!");
      
          // You can add API submission logic here
    };
 
   const countries = Country.getAllCountries();
 
   const handleCountryChange = (e) => {
     const countryIsoCode = e.target.value;
     setSelectedCountry(countryIsoCode);
     setSelectedState(""); // Reset state when country changes
     setSelectedCity(""); // Reset city when country changes
     setCities([]); // Reset cities list
 
     const fetchedStates = State.getStatesOfCountry(countryIsoCode);
     setStates(fetchedStates);
   };
 
   const handleStateChange = (e) => {
     const stateIsoCode = e.target.value;
     setSelectedState(stateIsoCode);
     setSelectedCity(""); // Reset city when state changes
 
     const fetchedCities = City.getCitiesOfState(selectedCountry, stateIsoCode);
     setCities(fetchedCities);
   };
 
   const handleCityChange = (e) => {
     setSelectedCity(e.target.value); // Store selected city instead of modifying cities list
   };
 
  return (
    <div>
      <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
        <div className='w-full h-full max-w-[40rem] mt-10'>
            <div className='h-24 flex items-center justify-center text-black mt-12 bg-white'>
                <img src={requestblood} alt="bloodpic" className='h-20 w-24'/>
                <h1 className='text-4xl font-medium text-center p-3'><span className='text-[#840000]'>Emergency</span> Request</h1>
            </div>
            <div className='bg-gradient-to-t from-[#840000] to-[#ffff] shadow-md py-3'>
                <div className='bg-white rounded-[42px] shadow-lg m-5 py-4 px-8'>
                <form className='space-y-4 text-lg flex flex-col' onSubmit={handleSubmit}>
                  {/* Row 1: Patient Name and Gender */}
                  <div className='flex gap-4'>
                    <div className='w-1/2'>
                      <label>Patient Name</label>
                      <input type="text" name="name" placeholder="Patient Name" onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' required/>
                    </div>
                    <div className='w-1/2'>
                      <label>Gender</label>
                      <div className='flex gap-3 py-1'>
                        <input type="radio" name="gender" value="Male" required />Male
                        <input type="radio" name="gender" value="Female" required />Female
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email and Phone */}
                  <div className='flex gap-4'>
                    <div className='w-1/2'>
                      <label>E-mail</label>
                      <input type="email" name="E-mail" placeholder="abc@example.com" required onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' />
                    </div>
                    <div className='w-1/2'>
                      <label>Phone Number</label>
                      <input type="number" name="phone" placeholder="+92 000000000" required onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' />
                    </div>
                  </div>

                  {/* Row 3: Blood Group and Date */}
                  <div className='flex gap-4'>
                    <div className='w-1/2'>
                      <label>Select Blood Group</label>
                      <select name="Select" className='w-full px-3 py-1 border border-gray-300 rounded-md' required>
                      <option value="bloodType">Select Blood Group</option>
                      <option value="O Rh+">O Rh+</option>
                      <option value="O Rh-">O Rh-</option>
                      <option value="A Rh+">A Rh+</option>
                      <option value="A Rh-">A Rh-</option>
                      <option value="B Rh-">B Rh-</option>
                      <option value="AB Rh+">AB Rh+</option>
                      <option value="AB Rh-">AB Rh-</option>
                      </select>
                    </div>
                    <div className='w-1/2'>
                      <label>Till Required Date</label>
                      <input type="date" name="date" placeholder="dd/mm/yyyy" required className='w-full px-3 py-1 border border-gray-300 rounded-md' />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label>Country</label>
                    <select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      required
                      className='w-full px-3 py-1 border border-gray-300 rounded-md'>
                    <option value="">Select Country</option>
                      {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode} className="text-black">
                      {country.name}
                    </option>))}
                    </select>
                  </div>

                  {/* Province/State */}
                  <div>
                    <label>Province/State</label>
                    <select
                      value={selectedState}
                      onChange={handleStateChange}
                      disabled={!states.length}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select State</option>
                      {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode} className="text-black">
                      {state.name}
                    </option>))}
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label>City</label>
                    <select
                      value={selectedCity}
                      onChange={handleCityChange}
                      disabled={!cities.length}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select City</option>
                      {cities.map((city) => (
                    <option key={city.name} value={city.name} className="text-black">
                      {city.name}
                    </option>))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className='flex justify-center'>
                    <input type="submit" value="Submit" className="w-1/2 bg-gradient-to-b from-[#840000] to-[#000000] text-white py-2 rounded-md transition my-5" />
                  </div>
                </form>
                </div>
                <ToastContainer />
            </div>
        </div>
      </div>
    </div>
  )
}

export default RequestBlood
