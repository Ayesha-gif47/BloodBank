import React from 'react'

const Login = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 mt-8">
    <div className="w-full max-w-md bg-gradient-to-t from-[#840000] to-[#ffff] shadow-md p-6 rounded-lg">
      <div className="bg-white rounded-[42px] shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-medium text-center text-black py-5">Log In</h1>
        <form className="mt-4 space-y-6">
          {/* Username Field */}
          <div className="px-6">
            <label className="block text-lg sm:text-xl font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="User Name"
              id="btn1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-400"
            />
          </div>
          {/* Password Field */}
          <div className="px-6">
            <label className="block text-lg sm:text-xl font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="btn1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-400"
            />
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              id="btn2"
              className="w-40 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
            >
              <a href="/DonorDash">Log In</a>
            </button>
          </div>
          {/* Forget Password Link */}
          <div className="text-center">
            <a href="#" className="text-sm text-red-400 hover:underline">
              Forgot Password?
            </a>
          </div>
          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <a href="/Register" className="text-red-400 hover:underline">
                Register Now
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>  
  )
}

export default Login
