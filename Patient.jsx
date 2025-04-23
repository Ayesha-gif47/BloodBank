import React, {useState} from 'react'
import { Country, State, City } from "country-state-city";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Patient = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); // Store selected city
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [transfusionInterval, setTransfusionInterval] = useState('');
  const [donationDates, setDonationDates] = useState([]);
  const [registrationType, setRegistrationType] = useState('');
  const [guardianDetails, setGuardianDetails] = useState({ name: '', relation: '' })
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    age: 0,
    email: "",
    password: "",
    country: "",
    state: "",
    city: "",
    gender: null ,
    bloodGroup: null ,
    registrationType: null ,
    guardianName: "",
    relation: "",
    transfusionInterval: null,
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
      firstName,
      lastName,
      phone,
      age,
      email,
      password,
      country,
      state,
      city,
      gender,
      bloodGroup,
      registrationType ,
      guardianName,
      relation,
      transfusionInterval,
    } = formData;

    // Check if required fields are empty
    if (!firstName || !lastName || !phone || !age || !email || !password ) {
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

    // Validate password length
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    // If registering as a guardian, check guardian fields
    if (registrationType === "guardian" && (!guardianName || !relation)) {
      toast.error("Guardian name and relation are required!");
      return;
    }

    // Show success notification
    toast.success("You have successfully registered as a Thalassemia patient!");

    // You can add API submission logic here
  };

  const handleIntervalChange = (event) => {
    const interval = event.target.value;
    setTransfusionInterval(interval);
    
    const today = new Date();
    let dates = [];
    if (interval === '2 Weeks') {
      dates = [
        new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0],
        new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0]
      ];
    } else if (interval === '4 Weeks') {
      dates = [
        new Date(today.setDate(today.getDate() + 28)).toISOString().split('T')[0]
      ];
    }
    setDonationDates(dates);
  };

  const handleDatesChange = (index, event) => {
    const newDates = [...donationDates]; // Copy the existing dates array
    newDates[index] = event.target.value; // Update the specific date
    setDonationDates(newDates); // Update the state
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
      <div className='w-full h-full max-w-[50rem] mt-20'>
          <div className='bg-gradient-to-t from-[#840000] to-[#ffff] shadow-md py-3'>
              <div className='bg-white rounded-[42px] shadow-lg m-5 py-4 px-8'>
                <h1 className='text-4xl font-medium text-center p-3'>Thalassemia Patient</h1>
                <form className='space-y-4 text-lg flex flex-col' onSubmit={handleSubmit}>
                  <div className='flex gap-4'>
                    <div className='w-1/2'>
                      <label>First Name</label>
                      <input type='text' name='firstName' onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' required />
                    </div>
                    <div className='w-1/2'>
                      <label>Last Name</label>
                      <input type='text' name='lastName' onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' required />
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='w-1/2'>
                      <label>Phone Number</label>
                      <input type='text' name='phone' placeholder='+92 000000000' onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' required />
                    </div>
                    <div className='w-1/2'>
                      <label>Age</label>
                      <input type='number' name='age' onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' required />
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='w-1/2'>
                      <label>Email</label>
                      <input type='email' name='email' placeholder='abc@example.com' onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' required />
                    </div>
                    <div className='w-1/2'>
                      <label>Password</label>
                      <input type='password' name='password' onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' required />
                    </div>
                  </div>
                {/* Country, State, City */}
                <div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block">Country</label>
                      <select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select Country</option>
                        {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode} className="text-black">
                        {country.name}
                      </option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block">Province/State</label>
                      <select
                        value={selectedState}
                        onChange={handleStateChange}
                        disabled={!states.length}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select State</option>
                        {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode} className="text-black">
                        {state.name}
                      </option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block">City</label>
                      <select
                        value={selectedCity}
                        onChange={handleCityChange}
                        disabled={!cities.length}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select City</option>
                        {cities.map((city) => (
                      <option key={city.name} value={city.name} className="text-black">
                        {city.name}
                      </option>))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='w-1/2'>
                    <label>Gender</label>
                    <div className='flex gap-3'>
                      <input type='radio' name='gender' value='Male' required onChange={handleChange}/> Male
                      <input type='radio' name='gender' value='Female' required onChange={handleChange}/> Female
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <label>Select Blood Group</label>
                    <select name='bloodGroup' onChange={handleChange} className='w-full px-3 py-2 border border-gray-300 rounded-md' required>
                      <option value=''>Select</option>
                      <option value='O Rh+'>O Rh+</option>
                      <option value='O Rh-'>O Rh-</option>
                      <option value='A Rh+'>A Rh+</option>
                      <option value='A Rh-'>A Rh-</option>
                      <option value='B Rh+'>B Rh+</option>
                      <option value='B Rh-'>B Rh-</option>
                      <option value='AB Rh+'>AB Rh+</option>
                      <option value='AB Rh-'>AB Rh-</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label>Registering as:</label>
                  <div className='flex gap-3'>
                    <input type='radio' name='registerType' value='self' checked={registrationType === 'self'} onChange={() => setRegistrationType('self')} required/> Self
                    <input type='radio' name='registerType' value='guardian' checked={registrationType === 'guardian'} onChange={() => setRegistrationType('guardian')} required/> Guardian
                  </div>
                </div>
              {registrationType === 'guardian' && (
                <div className='flex gap-4'>
                  <div className='w-1/2'>
                    <label>Guardian Name</label>
                    <input type='text' name='guardianName' onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' required />
                  </div>
                  <div className='w-1/2'>
                    <label>Relation to Patient</label>
                    <input type='text' name='relation' onChange={handleChange} className='w-full px-3 py-1 border border-gray-300 rounded-md' required />
                  </div>
                </div>)}
                <div>
                  <label>Select your blood transfusion interval:</label>
                <div className='flex gap-4'>
                  <label>
                    <input type='radio' name='transfusionInterval' value='2 Weeks' onChange={handleIntervalChange} /> 2 Weeks
                  </label>
                  <label>
                    <input type='radio' name='transfusionInterval' value='4 Weeks' onChange={handleIntervalChange} /> 4 Weeks
                  </label>
                </div>
                </div>
              {donationDates.length > 0 && (
                <div>
                  <label>Suggested Donation Dates:</label>
                    <ul>
                      {donationDates.map((date, index) => (
                    <input 
                      key={index} 
                      type='date' 
                      value={date} 
                      onChange={(event) => handleDatesChange(index, event)} // Allow user to modify 
                      className='block w-full px-3 py-2 border border-gray-300 rounded-md mb-3' />))}
                    </ul>
                </div>
              )}
              <div className='flex justify-center'>
                <button type="submit" className="w-1/2 bg-gradient-to-b from-[#840000] to-[#000000] text-white py-2 rounded-md transition my-5">
                  Submit
                </button>
              </div>
                </form>
                  <ToastContainer />
              </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default Patient
