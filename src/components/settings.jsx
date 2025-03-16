import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  
  // Sample user data
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    phoneNumber: "+1 555-123-4567",
    profilePicture: null
  });

  // Form state
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    phoneNumber: userData.phoneNumber
  });

  // Edit states
  const [editingName, setEditingName] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  
  // Logout confirm state
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle edit states
  const toggleEditName = () => {
    if (editingName) {
      // Save changes
      setUserData(prev => ({
        ...prev,
        fullName: formData.fullName
      }));
    } else {
      // Reset form data to current value when starting to edit
      setFormData(prev => ({
        ...prev,
        fullName: userData.fullName
      }));
    }
    setEditingName(!editingName);
  };

  const toggleEditPhone = () => {
    if (editingPhone) {
      // Save changes
      setUserData(prev => ({
        ...prev,
        phoneNumber: formData.phoneNumber
      }));
    } else {
      // Reset form data to current value when starting to edit
      setFormData(prev => ({
        ...prev,
        phoneNumber: userData.phoneNumber
      }));
    }
    setEditingPhone(!editingPhone);
  };

  // Handle logout
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  // Confirm logout
  const confirmLogout = () => {
    // In a real app, you would clear auth tokens, etc.
    console.log("Logging out...");
    
    // Navigate to login page
    navigate("/login");
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/home" className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold">
              <span className="text-indigo-600">Settings</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
              {userData.profilePicture ? (
                <img 
                  src={userData.profilePicture} 
                  alt={userData.fullName} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-indigo-600">
                  {userData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userData.fullName}</h2>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow mb-4">
          <h3 className="text-lg font-medium px-4 pt-4 pb-2">Account Settings</h3>
          
          {/* Full Name */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                {editingName ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1">{userData.fullName}</p>
                )}
              </div>
              <button
                onClick={toggleEditName}
                className={`${
                  editingName
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600 border border-indigo-600"
                } px-3 py-1 rounded-md text-sm font-medium`}
              >
                {editingName ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          {/* Phone Number */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                {editingPhone ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1">{userData.phoneNumber}</p>
                )}
              </div>
              <button
                onClick={toggleEditPhone}
                className={`${
                  editingPhone
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600 border border-indigo-600"
                } px-3 py-1 rounded-md text-sm font-medium`}
              >
                {editingPhone ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>

        {/* Support and Logout */}
        <div className="bg-white rounded-lg shadow">
          {/* Help & Support */}
          <div className="p-4">

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Help & Support</span>
              </div>


          </div>
          
          {/* Privacy Policy */}
          <div className="border-t border-gray-200 p-4">

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span>Privacy Policy</span>
              </div>


          </div>
          
          {/* Logout */}
          <div className="border-t border-gray-200 p-4">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center text-red-600"
            >
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>UCare App v1.0.0</p>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Logout Confirmation</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout from your account?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Space to avoid content being hidden by bottom navigation */}
      <div className="h-16"></div>
    </div>
  );
}