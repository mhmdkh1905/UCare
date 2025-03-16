import React, { useState, useEffect, useRef } from "react";
import UCareLogo from '../assets/UCareLogo.png';
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    phoneNumber: '',
  });

  // State to control if date picker is visible
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Ref for the date picker container
  const datePickerRef = useRef(null);
  // Ref for the input field
  const dateInputRef = useRef(null);
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      // In a real app, you would handle signup logic here
      // and redirect to the next page
    }, 1500);
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    // Format the date as YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    setFormData(prevState => ({
      ...prevState,
      dateOfBirth: formattedDate
    }));
    setShowDatePicker(false);
  };
  
  // Toggle date picker visibility
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Close datepicker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target) &&
          dateInputRef.current && !dateInputRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  // Position the date picker when it becomes visible
  useEffect(() => {
    if (showDatePicker && datePickerRef.current && dateInputRef.current) {
      positionDatePicker();
    }
  }, [showDatePicker]);

  // Function to position the date picker
  const positionDatePicker = () => {
    if (!datePickerRef.current || !dateInputRef.current) return;
    
    const inputRect = dateInputRef.current.getBoundingClientRect();
    const pickerHeight = datePickerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    // Check if there's enough space below the input
    const spaceBelow = viewportHeight - inputRect.bottom;
    
    // Position above if not enough space below
    if (spaceBelow < pickerHeight && inputRect.top > pickerHeight) {
      datePickerRef.current.style.top = 'auto';
      datePickerRef.current.style.bottom = '100%';
      datePickerRef.current.style.maxHeight = `${inputRect.top - 10}px`;
    } else {
      datePickerRef.current.style.top = '100%';
      datePickerRef.current.style.bottom = 'auto';
      datePickerRef.current.style.maxHeight = `${spaceBelow - 10}px`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-indigo-600">Sign Up</span>
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

            {/* Signup Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* User ID */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="userId">
                    User ID
                  </label>
                  <input
                    id="userId"
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="Enter your user ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Phone Number */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              
                {/* Date of Birth */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="dateOfBirth">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      ref={dateInputRef}
                      id="dateOfBirth"
                      type="text"
                      name="dateOfBirth"
                      value={formData.dateOfBirth || ""}
                      placeholder="Select date of birth"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      readOnly
                      onClick={toggleDatePicker}
                    />
                    <div 
                      className="absolute right-3 top-2 text-gray-400 cursor-pointer"
                      onClick={toggleDatePicker}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    
                    {/* Date Picker Calendar */}
                    {showDatePicker && (
                      <div 
                        ref={datePickerRef}
                        className="absolute z-10 mt-1 bg-white shadow-lg rounded-lg border border-gray-200 p-2 w-full overflow-auto"
                        style={{ maxHeight: '300px' }}
                      >
                        <DatePickerCalendar onDateSelect={handleDateSelect} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Sign Up Button */}
              <div className="mt-8">
                <button 
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
                  disabled={isSubmitting}
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
                    "Sign Up"
                  )}
                </button>
              </div>
              
              {/* Already have an account link */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have an account? 
                  <Link to="/login" className="ml-1 text-indigo-600 font-medium hover:text-indigo-500">
                    Login
                  </Link>
                </p>
              </div>
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

// Simple Date Picker Calendar Component
const DatePickerCalendar = ({ onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const currentDate = new Date();
  
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get the day of week the month starts on (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  // Format month name
  const formatMonth = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };
  
  // Generate calendar days
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isCurrentDate = 
        date.getDate() === currentDate.getDate() && 
        date.getMonth() === currentDate.getMonth() && 
        date.getFullYear() === currentDate.getFullYear();
      
      days.push(
        <div 
          key={`day-${day}`} 
          onClick={() => onDateSelect(date)}
          className={`flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-indigo-100 
            ${isCurrentDate ? 'bg-indigo-600 text-white hover:bg-indigo-500' : ''}`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="p-2">
      {/* Calendar header */}
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={prevMonth} 
          className="text-gray-600 hover:text-indigo-600 px-2 py-1"
          type="button"
        >
          &lt;
        </button>
        <div className="font-medium">{formatMonth(currentMonth)}</div>
        <button 
          onClick={nextMonth} 
          className="text-gray-600 hover:text-indigo-600 px-2 py-1"
          type="button"
        >
          &gt;
        </button>
      </div>
      
      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {generateCalendar()}
      </div>
    </div>
  );
};