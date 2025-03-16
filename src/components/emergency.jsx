import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Emergency() {
  // Emergency contacts state
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "555-123-4567",
      relationship: "Family"
    }
  ]);
  
  // State for the add contact modal
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  
  // State for the new contact form
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: ""
  });
  
  // Handle emergency call function
  const handleEmergencyCall = (number) => {
    // In a real app, this would use native capabilities to make a call
    console.log(`Calling emergency number: ${number}`);
    window.location.href = `tel:${number}`;
  };
  
  // Handle opening the add contact modal
  const handleOpenAddContact = () => {
    setShowAddContactModal(true);
  };
  
  // Handle closing the add contact modal
  const handleCloseAddContact = () => {
    setShowAddContactModal(false);
    // Reset form
    setNewContact({
      name: "",
      phone: "",
      relationship: ""
    });
  };
  
  // Handle input changes for the new contact form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle adding a new contact
  const handleAddContact = (e) => {
    e.preventDefault();
    
    // Add the new contact to the list
    const newContactWithId = {
      ...newContact,
      id: Date.now() // use timestamp as a simple id
    };
    
    setEmergencyContacts(prev => [...prev, newContactWithId]);
    
    // Close the modal
    handleCloseAddContact();
  };
  
  // Handle deleting a contact
  const handleDeleteContact = (id) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header - matched with Home page style */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/home" className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold">
              <span className="text-indigo-600">SOS</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Emergency Contacts */}
      <main className="flex-1 p-4 flex flex-col justify-start space-y-4">
        {/* Title Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-2">
          <h2 className="text-lg font-medium mb-2">Emergency Services</h2>
          <p className="text-gray-600 text-sm">Contact emergency services for immediate assistance.</p>
        </div>
        
        {/* Police */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h2 className="font-medium text-gray-800">Police</h2>
                <p className="text-sm text-gray-600">Emergency: 100</p>
              </div>
            </div>
            <button 
              onClick={() => handleEmergencyCall('100')} 
              className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center"
              aria-label="Call Police"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Fire Department */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <div>
                <h2 className="font-medium text-gray-800">Fire Department</h2>
                <p className="text-sm text-gray-600">Emergency: 102</p>
              </div>
            </div>
            <button 
              onClick={() => handleEmergencyCall('102')} 
              className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center"
              aria-label="Call Fire Department"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Ambulance */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="font-medium text-gray-800">Ambulance</h2>
                <p className="text-sm text-gray-600">Emergency: 101</p>
              </div>
            </div>
            <button 
              onClick={() => handleEmergencyCall('101')} 
              className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center"
              aria-label="Call Ambulance"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Personal Emergency Contacts Section Header */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Personal Emergency Contacts</h2>
            <button 
              onClick={handleOpenAddContact}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
              aria-label="Add Emergency Contact"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-1">Add your personal emergency contacts here.</p>
        </div>
        
        {/* Personal Emergency Contacts List */}
        {emergencyContacts.map(contact => (
          <div key={contact.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center">
                    <h2 className="font-medium text-gray-800">{contact.name}</h2>
                    {contact.relationship && (
                      <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {contact.relationship}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-2 text-gray-400 hover:text-red-600 mr-2"
                  aria-label={`Delete ${contact.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v10M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-5 0h10" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleEmergencyCall(contact.phone.replace(/\D/g, ''))} 
                  className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center"
                  aria-label={`Call ${contact.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {emergencyContacts.length === 0 && (
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500">You haven't added any emergency contacts yet.</p>
            <button 
              onClick={handleOpenAddContact}
              className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Contact
            </button>
          </div>
        )}
      </main>
      
      {/* Add Contact Modal */}
      {showAddContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Add Emergency Contact</h3>
            
            <form onSubmit={handleAddContact}>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={newContact.name}
                    onChange={handleInputChange}
                    placeholder="Enter contact name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Phone */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={newContact.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Relationship */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="relationship">
                    Relationship
                  </label>
                  <select
                    id="relationship"
                    name="relationship"
                    value={newContact.relationship}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select relationship</option>
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Caregiver">Caregiver</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseAddContact}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      

      
      {/* Space to avoid content being hidden by bottom navigation */}
      <div className="h-16"></div>
    </div>
  );
}