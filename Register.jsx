import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import Donor from './SampleDonor'
import Patient from './Patient'

const RegisterForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [registrationType, setRegistrationType] = useState(""); // Donor or Patient
      const [activities, setActivities] = useState([]);
      const [dates, setDates] = useState({});
      const [errorMessage, setErrorMessage] = useState("");
  
       // Define the required wait time for each activity in months
    const activityWaitTimes = {
      Tattooing: 6,
      EarPercing: 6,
      DentalExtraction: 3,
    };
  
    // Handle checkbox selection
    const handleActivityChange = (e) => {
      const { value, checked } = e.target;
  
      if (checked) {
        setActivities((prev) => [...prev, value]);
        setDates((prev) => ({ ...prev, [value]: "" })); // Add empty date for the activity
      } else {
        setActivities((prev) => prev.filter((activity) => activity !== value));
        setDates((prev) => {
          const updatedDates = { ...prev };
          delete updatedDates[value]; // Remove the date for the unchecked activity
          return updatedDates;
        });
      }
    };
  
    // Handle date input for each activity
    const handleDateChange = (e, activity) => {
      const { value } = e.target;
      setDates((prev) => ({ ...prev, [activity]: value }));
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      const today = new Date();
      let maxWaitTimePassed = true;
  
      for (const activity of activities) {
        const date = dates[activity];
        if (!date) {
          setErrorMessage(`Please provide a date for ${activity}.`);
          return;
        }
  
        const activityDate = new Date(date);
        const waitMonths = activityWaitTimes[activity];
        const eligibleDate = new Date(activityDate);
        eligibleDate.setMonth(eligibleDate.getMonth() + waitMonths);
  
        if (today < eligibleDate) {
          maxWaitTimePassed = false;
          setErrorMessage(
            `You cannot donate blood because you had ${activity} on ${activityDate.toLocaleDateString()}. You can donate after ${eligibleDate.toLocaleDateString()}.`
          );
          return;
        }
      }
  
      if (maxWaitTimePassed) {
        setErrorMessage(""); // Clear the error message
        alert("You are eligible to donate blood. Thank you!");
      }
    };

  const countries = Country.getAllCountries();

  const handleCountryChange = (e) => {
    const countryIsoCode = e.target.value;
    setSelectedCountry(countryIsoCode);
    setSelectedState(""); // Reset state when country changes
    setCities([]); // Reset city when country changes

    const fetchedStates = State.getStatesOfCountry(countryIsoCode);
    setStates(fetchedStates);
  };

  const handleStateChange = (e) => {
    const stateIsoCode = e.target.value;
    setSelectedState(stateIsoCode);

    const fetchedCities = City.getCitiesOfState(selectedCountry, stateIsoCode);
    setCities(fetchedCities);
  };

  const handleRegistrationTypeChange = (e) => {
    setRegistrationType(e.target.value);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 mt-14">
      <div className="w-full h-full max-w-[37rem] p-6">
        <div className="bg-gradient-to-b from-[#840000] to-[#ffff] shadow-md py-3">
          <div className="bg-white rounded-[42px] shadow-lg mx-3 py-5 px-6">
            <h1 className="text-2xl sm:text-3xl font-medium text-center text-black py-5">
              Register Now
            </h1>
            <form className="space-y-4 text-lg">
             {/* Full Name */}
            <div>
              <div className="flex gap-32">
                <label>First Name</label>
                <label>Last Name</label>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  id="input"
                  className="w-full px-3 py-2 border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  id="input"
                  className="w-full px-3 py-2 border border-gray-300"
                />
              </div>
            </div>

            {/* Date of Birth & Occupation */}
            <div>
              <div className="flex gap-28">
                <label>Date of Birth</label>
                <label>Occupation</label>
              </div>
              <div className="flex gap-4">
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  id="input"
                  className="w-full px-3 py-2 border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Occupation"
                  id="input"
                  className="w-full px-3 py-2 border border-gray-300"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex gap-4">
              <label>Gender</label>
              <div className="flex items-center gap-2">
                <label>
                  <input type="radio" id="gender" name="gender" value="Male" />
                  Male
                </label>
                <label>
                  <input type="radio" id="gender" name="gender" value="Female" />
                  Female
                </label>
              </div>
            </div>

            {/* Phone Number & Email */}
            <div>
              <div className="flex gap-24">
                <label>Phone Number</label>
                <label>Email</label>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="+92 000000000"
                  required
                  id="input"
                  className="w-full px-3 py-2 border border-gray-300 "
                />
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  required
                  id="input"
                  className="w-full px-3 py-2 border border-gray-300  "
                />
              </div>
              <p className="text-sm text-gray-600">Please enter a valid phone number</p>
            </div>
              {/* Country */}
              <div>
                <label>Country</label>
                <select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="btn1"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option
                      key={country.isoCode}
                      value={country.isoCode}
                      className="text-black"
                    >
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label>Province/State</label>
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  disabled={!states.length}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="btn1"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option
                      key={state.isoCode}
                      value={state.isoCode}
                      className="text-black"
                    >
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label>City</label>
                <select
                  value=""
                  onChange={(e) => {}}
                  disabled={!cities.length}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="btn1"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option
                      key={city.name}
                      value={city.name}
                      className="text-black"
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
              </div> 

              {/* As a Register  */}
              <div>
                <label>Register As</label>
                <div className="flex gap-4 items-center mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="donor"
                      name="registrationType"
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
                       <form className='space-y-1 text-lg' onSubmit={handleSubmit}>
                   <label for="blood-type">What is your blood type?</label>
                           <div>
                               <input type="radio" id="o-positive" name="blood-type" value="O RH+" className='border-4 border-black'/>
                               <label for="o-positive">O RH+</label>
                           </div>
                           <div>
                               <input type="radio" id="o-negative" name="blood-type" value="O RH-"/>
                               <label for="o-negative">O RH-</label>
                           </div>
                           <div>
                               <input type="radio" id="a-positive" name="blood-type" value="A RH+"/>
                               <label for="a-positive">A RH+</label>
                           </div>
                           <div>
                               <input type="radio" id="a-negative" name="blood-type" value="A RH-"/>
                               <label for="a-negative">A RH-</label>
                           </div>
                           <div>
                               <input type="radio" id="b-positive" name="blood-type" value="B RH+"/>
                               <label for="b-positive">B RH+</label>
                           </div>
                           <div>
                               <input type="radio" id="b-negative" name="blood-type" value="B RH-"/>
                               <label for="b-negative">B RH-</label>
                           </div>
                           <div>
                               <input type="radio" id="ab-positive" name="blood-type" value="AB RH+"/>
                               <label for="ab-positive">AB RH+</label>
                           </div>
                           <div>
                               <input type="radio" id="ab-negative" name="blood-type" value="AB RH-"/>
                               <label for="ab-negative">AB RH-</label>
                           </div>
                           <label>Have you donated previously?</label>
                       <div className='flex gap-3'>
                           <input type="radio" name="donated" value="yes" required id='btn1'/>Yes
                           <input type="radio" name="donated" value="no" required/>No
                       </div>
                       <div>
                           <label>What was the last time you donated blood?</label>
                           <input type="date" placeholder="dd/mm/yyyy" id='input' className="px-4 py-1 w-full"/>
                       </div>
                       <label>In the last six months have you had any of the following?</label>
                       <div className=' gap-3'>
                           <div>
                           <div className="space-y-2">
                       {Object.keys(activityWaitTimes).map((activity) => (
                         <div key={activity} className="flex items-center gap-3">
                           <input
                             type="checkbox"
                             name="sixmonths"
                             value={activity}
                             onChange={handleActivityChange}
                             className="cursor-pointer"
                           />
                           <label>{activity}</label>
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
                       <label>Do you suffer from or have suffered from any of the following diseases?</label>
                       <div className='flex gap-2 flex-col'>
                           <span className='gap-3 flex'>
                           <input type="checkbox" name="disease" value="Hepatitis B/C" />Hepatitis B/C
                           <input type="checkbox" name="disease" value="Heart Disease" />Heart Disease
                           <input type="checkbox" name="disease" value="Malaria (six months)" />Malaria (six months)
                           </span>
                           <span className='gap-2 flex'>
                       
                           <input type="checkbox" name="disease" value="Kidney Disease "/>Kidney Disease
                           <input type="checkbox" name="disease" value="Lung Disease" />Lungs Disease
                           <input type="checkbox" name="disease" value="Allergic Disease" />Allergic Disease               
                           </span>
                           <span className='flex gap-1'>
                           <input type="checkbox" name="disease" value="Cancer/Malignant Disease  "/>Cancer/Malignant Disease  
                           <input type="checkbox" name="disease" value="Abnormal Bleeding Disease "/>Abnormal Bleeding Disease
                           </span>
                           <span className='gap-2 flex'>
                           <input type="checkbox" name="disease" value="Sexually Transmitted Disease " />Sexually Transmitted Disease
                           <input type="checkbox" name="disease" value="HIV/AIDS" />HIV/AIDS
                           </span>
                           <span className='gap-3 flex'>
                           <input type="checkbox" name="disease" value="Typhoid (one year) (Antay joro)" />Typhoid (one year) (Antay joro)
                           <input type="checkbox" name="disease" value="Diabetes" />Diabetes
                           <input type="checkbox" name="disease" value="Other" />Other 
                           </span>
                       </div>
                       <label>Is there any history of surgery or blood transfusion in the past six months?</label>
                       <div className='flex gap-3'>
                           <input type="checkbox" name="disease" value="Major" />Major
                           <input type="checkbox" name="disease" value="Minor " />Minor 
                           <input type="checkbox" name="disease" value="Blood Transfusion " />Blood Transfusion
                       </div>        
           
                         {/* Error Message */}
                     {errorMessage && <p className="text-[#840000]">{errorMessage}</p>}
                     <div className="flex justify-center">
                     </div>
                   </form>
                       </div>
              )}
              {registrationType === "patient" && (
                    <div>
                          <form className='space-y-1 text-lg flex flex-col'>
                              <label>Select Blood Group </label>
                              <div >
                                  <select name="Select" id="btn1" className='w-full px-3 py-2 border border-gray-300 rounded-md'>
                                      <option value="O Rh+">O Rh+</option>
                                      <option value="O Rh-">O Rh-</option>
                                      <option value="A Rh+">A Rh+</option>
                                      <option value="A Rh-">A Rh-</option>
                                      <option value="B Rh-">B Rh-</option>
                                      <option value="AB Rh+">AB Rh+</option>
                                      <option value="AB Rh-">AB Rh-</option>
                                  </select>
                              </div> 
                            <label>Select your blood transfusion interval:</label>
                            <div className='flex gap-4'>
                            <label>
                            <input type="radio" name="transfusionInterval" value="2 Weeks"/> 2 Weeks
                            </label>
                            <label>
                              <input type="radio" name="transfusionInterval" value="4 Weeks"/> 4 Weeks
                            </label>
                            </div>
                          </form>
                      </div>
              )}
            </form>
            <div className="flex justify-center">
            <button type="submit" className="px-4 py-2" id='btn2'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
