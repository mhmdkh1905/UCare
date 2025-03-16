import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Appointments() {
  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "General Physician",
      date: "2025-03-18",
      time: "10:00 AM",
      location: "UCare Medical Center",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "2025-03-22",
      time: "2:30 PM",
      location: "Heart Institute",
    },
    {
      id: 3,
      doctor: "Dr. Lisa Wong",
      specialty: "Dermatologist",
      date: "2025-03-28",
      time: "11:15 AM",
      location: "UCare Medical Center",
    }
  ]);

  // Current date state
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // State for add/edit appointment modal
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  
  // State for appointment being edited (null for new appointment)
  const [editingAppointment, setEditingAppointment] = useState(null);
  
  // State for appointment form data
  const [appointmentForm, setAppointmentForm] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
    location: ""
  });
  
  // State for delete confirmation
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  // Get appointments for the current month
  const currentMonthAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.getMonth() === currentDate.getMonth() &&
      appointmentDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Get appointments dates for highlighting in calendar
  const appointmentDates = appointments.map(appointment => appointment.date);

  // Function to navigate to the previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Function to navigate to the next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Format month and year
  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the day of week the month starts on (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isToday = 
        date.getDate() === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear();
      
      const hasAppointment = appointmentDates.includes(dateString);
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`flex items-center justify-center h-10 w-10 rounded-full cursor-pointer
            ${isToday ? 'bg-indigo-600 text-white hover:bg-indigo-500' : ''}
            ${hasAppointment && !isToday ? 'bg-purple-200 text-purple-800 hover:bg-purple-300' : 'hover:bg-gray-100'}`}
          onClick={() => handleDateClick(dateString)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  // Handle clicking on a date in the calendar
  const handleDateClick = (dateString) => {
    // Open the add appointment modal with the selected date
    setAppointmentForm({
      ...appointmentForm,
      date: dateString
    });
    setEditingAppointment(null);
    setShowAppointmentModal(true);
  };

  // Format appointment date
  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Handle opening the add appointment modal
  const handleAddAppointment = () => {
    // Reset form data
    setAppointmentForm({
      doctor: "",
      specialty: "",
      date: new Date().toISOString().split('T')[0], // Default to today's date
      time: "",
      location: ""
    });
    setEditingAppointment(null);
    setShowAppointmentModal(true);
  };

  // Handle opening the edit appointment modal
  const handleEditAppointment = (appointment, e) => {
    e.stopPropagation(); // Prevent bubbling
    
    // Set form data to the selected appointment
    setAppointmentForm({
      doctor: appointment.doctor,
      specialty: appointment.specialty,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location
    });
    setEditingAppointment(appointment);
    setShowAppointmentModal(true);
  };

  // Handle deleting an appointment
  const handleDeleteClick = (appointment, e) => {
    e.stopPropagation(); // Prevent bubbling
    setAppointmentToDelete(appointment);
  };

  // Confirm appointment deletion
  const confirmDeleteAppointment = () => {
    if (appointmentToDelete) {
      setAppointments(prev => prev.filter(app => app.id !== appointmentToDelete.id));
      setAppointmentToDelete(null);
    }
  };

  // Cancel appointment deletion
  const cancelDeleteAppointment = () => {
    setAppointmentToDelete(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    
    if (editingAppointment) {
      // Update existing appointment
      setAppointments(prev => prev.map(app => 
        app.id === editingAppointment.id 
          ? { ...app, ...appointmentForm } 
          : app
      ));
    } else {
      // Add new appointment
      const newAppointment = {
        ...appointmentForm,
        id: Date.now() // Simple ID generation
      };
      setAppointments(prev => [...prev, newAppointment]);
    }
    
    // Close modal
    setShowAppointmentModal(false);
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
              <span className="text-indigo-600">Appointments</span>
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

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Calendar Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={prevMonth} 
              className="p-2 text-gray-600 hover:text-indigo-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg font-medium">{formatMonthYear(currentDate)}</h2>
            <button 
              onClick={nextMonth} 
              className="p-2 text-gray-600 hover:text-indigo-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {generateCalendar()}
          </div>
          
          {/* Legend */}
          <div className="flex items-center text-sm mt-4 justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-indigo-600 mr-2"></div>
              <span className="text-gray-600">Today</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-purple-200 mr-2"></div>
              <span className="text-gray-600">Appointment</span>
            </div>
          </div>
        </div>
        
        {/* Appointments List Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">This Month's Appointments</h3>
            <button 
              onClick={handleAddAppointment}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
              aria-label="Add appointment"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {/* Appointments List */}
          <div className="space-y-3">
            {currentMonthAppointments.length > 0 ? (
              currentMonthAppointments.map(appointment => (
                <div key={appointment.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 rounded-lg p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{appointment.doctor}</h4>
                      <p className="text-gray-600 text-sm">{appointment.specialty}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatAppointmentDate(appointment.date)} at {appointment.time}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {appointment.location}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 text-gray-500 hover:text-indigo-600"
                        onClick={(e) => handleEditAppointment(appointment, e)}
                        aria-label="Edit appointment"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button 
                        className="p-2 text-gray-500 hover:text-red-600"
                        onClick={(e) => handleDeleteClick(appointment, e)}
                        aria-label="Delete appointment"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v10M9 7v10m10-10v10M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>No appointments scheduled this month</p>
                <p className="text-sm mt-2">Click the + button to add a new appointment</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Add/Edit Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              {editingAppointment ? "Edit Appointment" : "Add New Appointment"}
            </h3>
            
            <form onSubmit={handleSubmitAppointment}>
              <div className="space-y-4">
                {/* Doctor */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="doctor">
                    Doctor Name
                  </label>
                  <input
                    id="doctor"
                    type="text"
                    name="doctor"
                    value={appointmentForm.doctor}
                    onChange={handleInputChange}
                    placeholder="Enter doctor's name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Specialty */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="specialty">
                    Specialty
                  </label>
                  <input
                    id="specialty"
                    type="text"
                    name="specialty"
                    value={appointmentForm.specialty}
                    onChange={handleInputChange}
                    placeholder="Enter doctor's specialty"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Date */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="date">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={appointmentForm.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Time */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="time">
                    Time
                  </label>
                  <input
                    id="time"
                    type="time"
                    name="time"
                    value={appointmentForm.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Location */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={appointmentForm.location}
                    onChange={handleInputChange}
                    placeholder="Enter appointment location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAppointmentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingAppointment ? "Update" : "Add"} Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {appointmentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Delete Appointment</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your appointment with {appointmentToDelete.doctor} on {formatAppointmentDate(appointmentToDelete.date)}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDeleteAppointment}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAppointment}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
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