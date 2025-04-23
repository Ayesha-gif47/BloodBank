import React, {useState} from 'react'
import { Country, State, City } from "country-state-city";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Donor = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [dates, setDates] = useState({});
  const [diseases, setDiseases] = useState([]);
  const [surgeries, setSurgeries] = useState([]);
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      dob: "",
      age: "",
      email: "",
      password: "",
      gender: "",
      bloodGroup: "",
    });
  
    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
 
  const countries = Country.getAllCountries();

  const activityWaitTimes = {
    Tattooing: 6,
    EarPercing: 6,
    DentalExtraction: 3,
  };

  const handleCountryChange = (e) => {
    const countryIsoCode = e.target.value;
    setSelectedCountry(countryIsoCode);
    setSelectedState("");
    setSelectedCity("");
    setCities([]);
    setStates(State.getStatesOfCountry(countryIsoCode));
  };

  const handleStateChange = (e) => {
    const stateIsoCode = e.target.value;
    setSelectedState(stateIsoCode);
    setSelectedCity("");
    setCities(City.getCitiesOfState(selectedCountry, stateIsoCode));
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleDiseaseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDiseases((prev) => [...prev, value]);
      toast.error("Sorry, you cannot register as a donor due to medical conditions.");
    } else {
      setDiseases((prev) => prev.filter((d) => d !== value));
    }
  };

  const handleActivityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setActivities((prev) => [...prev, value]);
    } else {
      setActivities((prev) => prev.filter((a) => a !== value));
      const updatedDates = { ...dates };
      delete updatedDates[value];
      setDates(updatedDates);
    }
  };

  const handleDateChange = (e, activity) => {
    const { value } = e.target;
    setDates((prev) => ({ ...prev, [activity]: value }));
  };

  const handleSurgeryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSurgeries((prev) => [...prev, value]);
    } else {
      setSurgeries((prev) => prev.filter((s) => s !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    let isEligible = true;

    for (const activity of activities) {
      const date = dates[activity];
      if (!date) {
        toast.error(`Please provide a date for ${activity}.`);
        return;
      }

      const activityDate = new Date(date);
      const waitMonths = activityWaitTimes[activity];
      const eligibleDate = new Date(activityDate);
      eligibleDate.setMonth(eligibleDate.getMonth() + waitMonths);

      if (today < eligibleDate) {
        isEligible = false;
        toast.error(
          `You had ${activity} on ${activityDate.toLocaleDateString()}. Eligible to donate after ${eligibleDate.toLocaleDateString()}.`
        );
        break;
      }
    }

    if (diseases.length > 0) {
      return; // Already handled on checkbox change
    }

    if (isEligible===true) {
      toast.success("You are eligible to donate blood. Thank you!");
      if (surgeries.length > 0) {
        toast.info("Note: You are registered as a donor but you must wait some time after surgery to donate.");
      }
    } else {
      toast.warn("You are registered as a donor, but currently not eligible to donate blood. Please wait.");
    }

    const {
      firstName,
      lastName,
      phone,
      dob,
      age,
      email,
      password,
      gender,
      bloodGroup,
    } = formData;

    // Check if required fields are empty
    if (!firstName || !lastName || !phone || !age || !email || !password || !gender || !bloodGroup || !dob) {
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
      toast.error("Password must be at least 6 characters long!");
      return;
    }

  };

  return (
    <div>
    <div className="w-full h-full max-w-[65rem] p-6">
    <div id='Donation' className='h-52 flex flex-col items-center justify-center text-white px-14'>
            <h1 className='text-3xl font-bold'>Blood Donation Form</h1>
            <p className='text-xl font-semibold'>Confidential, Please answer the following question correctly.
                This will help to protect you and the patient who receives your blood.
            </p>
        </div>
        <div className="bg-gradient-to-b from-[#840000] to-[#ffff] shadow-md py-3">
            <div className="bg-white rounded-[42px] shadow-lg mx-3 py-5 px-6">
        <form className="space-y-4 text-lg font-semibold" onSubmit={handleSubmit}>
        <p className='text-xl text-left text-gray-400 py-2'>Personal Details</p>
 {/* Full Name & Date of Birth */}
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block">Date Of Birth</label>
          <input
            type="date"
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>

    {/* Phone Number & Email & password */}
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block">Phone Number</label>
          <input
            type="text"
            placeholder="+92 000000000"
            required
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            required
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            type="password"
            placeholder="password"
            required
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
            onChange={handleChange}
          />
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Please enter a valid phone number
      </p>
    </div>
    
     {/* Gender & Age */}
     <div className='flex gap-4'>
        <div className='w-[18.5rem]'>
          <label>Gender</label>
          <div className='flex gap-3'>
            <input type='radio' name='gender' value='Male' required onChange={handleChange}/> Male
            <input type='radio' name='gender' value='Female' required onChange={handleChange}/> Female
          </div>
        </div>
        <div className='w-[18.5rem]'>
          <label>Age</label>
          <input name='Age' placeholder="Age" type="number" required className='w-full px-3 py-2 border border-gray-300 rounded-md' onChange={handleChange}/>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode} className="text-black" required>
              {country.name}
            </option>
          ))}
        </select>
                </div>
                <div>
                <label className="block">Province/State</label>
                <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!states.length}
          className="w-full px-3 py-2 border border-gray-300 rounded-md" 
          required
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode} className="text-black">
              {state.name}
            </option>
          ))}
        </select>
                </div>
                <div>
                <label className="block">City</label>
                <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!cities.length}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name} className="text-black">
              {city.name}
            </option>
          ))}
        </select>
                </div>
    </div>
    </div>
          <p className='text-xl text-left text-gray-400 py-1'>Medical Details</p>
               {/* Blood Type Selection */}
          <label className="block text-lg font-medium text-black">Blood Type</label>
          <select
            name="bloodType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="O Rh+">O Rh+</option>
            <option value="O Rh-">O Rh-</option>
            <option value="A Rh+">A Rh+</option>
            <option value="A Rh-">A Rh-</option>
            <option value="B Rh-">B Rh-</option>
            <option value="AB Rh+">AB Rh+</option>
            <option value="AB Rh-">AB Rh-</option>
          </select>

          {/* Previous Donation */}
          <label className="block text-lg font-medium text-black">Have you donated previously?</label>
          <div className="flex gap-3">
            <input type="radio" name="donatedPreviously" value="yes" /> Yes
            <input type="radio" name="donatedPreviously" value="no" /> No
          </div>

          {/* Last Donation Date */}
          <label className="block text-lg font-medium text-black">Last Donation Date</label>
          <input
            type="date"
            name="lastDonationDate"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          {/* Activities Section */}
          {/* Diseases Checkbox */}
          <label className="block text-lg font-medium text-black">In the last six months have you had any of the following?</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
            <div className="space-y-2">
        {Object.keys(activityWaitTimes).map((activity) => (
          <div key={activity} className="flex items-center gap-3">
            <label>
              <input
                type="checkbox"
                value={activity}
                checked={activities.includes(activity)}
                onChange={handleActivityChange}
                className="cursor-pointer"
              />
              {activity}
            </label>
            {activities.includes(activity) && (
              <input
                type="date"
                value={dates[activity] || ""}
                onChange={(e) => handleDateChange(e, activity)}
                className="border border-gray-300 px-3 py-1 rounded-md"
                required
              />
            )}
          </div>
        ))}
        </div>
        </div>
        </div>
        {/* Diseases Checkbox */}
        <label className="block text-lg font-medium text-black">Do you have any of the following diseases?</label>
        <div className="grid grid-cols-2 gap-2">
        {["Hepatitis B/C", "Heart Disease", "Malaria", "Kidney Disease", "Lung Disease", "Diabetes", "HIV/AIDS"].map((disease) => (
          <div key={disease}  className="flex items-center">
            <label>
              <input
                type="checkbox"
                value={disease}
                onChange={handleDiseaseChange}
              />
              <span className="ml-2">{disease}</span>
            </label>
          </div>
        ))}
        </div>

        {/* Surgery Section */}
        <label className="block text-lg font-medium text-black">History of surgery or blood transfusion?</label>
        <div className="flex gap-3">
            <input type="checkbox" name="surgeries" value="Major" onChange={handleSurgeryChange}/> Major
            <input type="checkbox" name="surgeries" value="Minor" onChange={handleSurgeryChange}/> Minor
            <input type="checkbox" name="surgeries" value="Blood Transfusion" onChange={handleSurgeryChange}/> Blood Transfusion
          </div>
          <button type="submit" className="w-full bg-gradient-to-b from-[#840000] to-[#000000] text-white py-2 rounded-md transition my-5">
            Submit
          </button>
        </form>
            </div>
           </div>
      </div>
      <ToastContainer />
     </div>
  )
}

export default Donor
