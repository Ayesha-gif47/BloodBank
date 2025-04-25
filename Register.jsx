import React,{useState} from "react";
import { Country, State, City } from "country-state-city";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const RegisterForm = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState(""); // Store selected city
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [transfusionInterval, setTransfusionInterval] = useState('');
    const [donationDates, setDonationDates] = useState([]);
    const [registrationType, setRegistrationType] = useState('');
    const [guardianDetails, setGuardianDetails] = useState({ name: '', relation: '' })
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
     
      const countries = Country.getAllCountries();
    
      const activityWaitTimes = {
        Tattooing: 6,
        EarPercing: 6,
        DentalExtraction: 3,
      };
      const handleRegistrationTypeChange = (e) => {
        setRegistrationType(e.target.value);
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
          registrationType ,
          guardianName,
          relation,
          transfusionInterval,
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
        

  return (
<div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4 mt-14">
        <div className="w-full h-full max-w-4xl p-6 bg-white rounded-md">
        <h1 className="text-2xl sm:text-3xl font-medium text-left text-black py-2">
              Register Now
        </h1>
        <p className='text-xl text-left text-gray-400 py-2'>Personal Details</p>
        <form className="space-y-4 text-lg font-semibold" onSubmit={handleSubmit}>
 {/* Full Name & Date of Birth */}
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md" 
          />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md" 
          />
        </div>
        <div>
          <label className="block">Date Of Birth</label>
          <input
            type="date"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md" 
          />
        </div>
      </div>
    </div>

    {/* Phone Number & Email & Password */}
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block">Phone Number</label>
          <input
            type="text"
            placeholder="+92 000000000"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md" 
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
          />
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Please enter a valid phone number
      </p>
    </div>

    {/* Gender & Age */}
    <div className='flex gap-4'>
        <div className='w-[17rem]'>
          <label>Gender</label>
          <div className='flex gap-3'>
            <input type='radio' name='gender' value='Male' required onChange={handleChange}/> Male
            <input type='radio' name='gender' value='Female' required onChange={handleChange}/> Female
          </div>
        </div>
        <div className='w-[17rem]'>
          <label>Age</label>
          <input name='Age' placeholder="Age" type="number" required onChange={handleChange} className='w-full px-3 py-2 border border-gray-300 rounded-md' />
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
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode} className="text-black">
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
          required
          disabled={!states.length}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
          required
          disabled={!cities.length}
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
                  {/* As a Register  */}
                  <div>
                <label className='text-xl text-left text-gray-400 py-2'>Register As</label>
                <div className="flex gap-4 items-center mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="donor"
                      name="registrationType"
                      required
                      onChange={handleRegistrationTypeChange}
                      checked={registrationType === "donor"}
                      className="cursor-pointer"
                    />
                    As a Donor
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="patient"
                      name="registrationType"
                      required
                      onChange={handleRegistrationTypeChange}
                      checked={registrationType === "patient"}
                      className="cursor-pointer"
                    />
                    As a Patient
                  </label>
                </div>
              </div>
 {/* Conditional Forms */}
 {registrationType === "donor" && (
  <div>
     <form className="space-y-3" onSubmit={handleSubmit}>
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

          <p className='text-xl text-left text-gray-400 py-1'>Medical Details</p>
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
          {/* Surgery History */}
          <label className="block text-lg font-medium text-black">History of surgery or blood transfusion?</label>
          <div className="flex gap-3">
          <input type="checkbox" name="surgeries" value="Major" onChange={handleSurgeryChange}/> Major
            <input type="checkbox" name="surgeries" value="Minor" onChange={handleSurgeryChange}/> Minor
            <input type="checkbox" name="surgeries" value="Blood Transfusion" onChange={handleSurgeryChange}/> Blood Transfusion
          </div>

    
        </form>
  </div>
 )}
 {registrationType === "patient" && (
                    <div>
                      <form className='space-y-1 text-lg'>
                              <label className="block text-lg font-medium text-black">Select Blood Group </label>
                              <div >
                                  <select name="Select" className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={handleChange}>
                                      <option value="">Select</option>
                                      <option value="O Rh+">O Rh+</option>
                                      <option value="O Rh-">O Rh-</option>
                                      <option value="A Rh+">A Rh+</option>
                                      <option value="A Rh-">A Rh-</option>
                                      <option value="B Rh-">B Rh-</option>
                                      <option value="AB Rh+">AB Rh+</option>
                                      <option value="AB Rh-">AB Rh-</option>
                                  </select>
                              </div> 
                              <label className='block text-lg font-medium text-black '>Select your blood transfusion interval:</label>
      <div className='flex gap-4'>
      <label>
        <input type='radio' name='transfusionInterval' value='2 Weeks' onChange={handleIntervalChange} /> 2 Weeks
      </label>
      <label>
        <input type='radio' name='transfusionInterval' value='4 Weeks' onChange={handleIntervalChange} /> 4 Weeks
      </label>
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
  </form>
    </div>
)}
    <button type="submit"
    className="w-full bg-[#E46A6A] text-white py-2 rounded-md hover:bg-[#e45d5d] transition my-5">Submit</button>
</form>
</div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default RegisterForm;
