import React, {useState} from 'react'

const UpdateProfile = () => {
    const [form, setForm] = useState({
        name: "Areeba Khan",
        email: "areeba@example.com",
        phone: "03001234567",
        bloodGroup: "B+",
        city: "Lahore"
      });
    
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile updated successfully!");
      };
    
  return (
    <div className="max-w-xl mx-auto p-6 bg-white border border-grey-300 rounded-2xl shadow-md mt-20">
    <h2 className="text-2xl font-bold text-[#840000] mb-4 text-center">Update Profile</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.keys(form).map((key) => (
        <div key={key}>
          <label className="block mb-1 font-medium capitalize">{key}</label>
          <input
            type="text"
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>
      ))}
      <div className='flex justify-center'>
      <button type="submit" className="bg-gradient-to-b from-[#840000] to-[#000000] text-white px-4 py-2 rounded">Save Changes</button>
      </div>
    </form>
  </div>
  )
}

export default UpdateProfile
