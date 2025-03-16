import React, { useState } from "react";
import UCareLogo from '../assets/UCareLogo.png';
import { Link } from "react-router-dom";

export default function Login() {
  // Add the missing state variable and handler
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, you would handle login logic here
      // before navigating to the home page
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-indigo-600">Login</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow p-6">
            {/* UCare Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32">
                <img
                  src={UCareLogo}
                  alt="UCare Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-center text-sm mb-6">
              Your personal healthcare companion. UCare helps you manage appointments, track medications, and connect with healthcare providers all in one place.
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10 py-3 pr-3 block w-full rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We'll send a verification code to this number
                </p>
              </div>

              {/* Sign Up Link */}
              <div className="flex items-center justify-center mb-6">
                <span className="text-sm text-gray-600">Don't have an account?</span>
                <Link to="/signup" className="ml-1 text-sm text-indigo-600 font-medium hover:text-indigo-500">
                  Sign Up
                </Link>
              </div>

              {/* Continue Button */}
              <Link 
                to="/home"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition duration-150 ease-in-out"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Continue"
                )}
              </Link>
            </form>
          </div>
        </div>
      </main>

      {/* Footer with app version */}
      <footer className="bg-white py-4 text-center text-gray-500 text-sm">
        <p>UCare App v1.0.0</p>
      </footer>
    </div>
  );
}