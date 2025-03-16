import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Medication() {
  // Sample medications data
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      pillsLeft: 14,
      pillsPerDay: 1,
      refillStatus: "normal", // normal, warning, critical
      lastRefill: "2025-03-01",
      doctor: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      pillsLeft: 6,
      pillsPerDay: 1,
      refillStatus: "warning", // normal, warning, critical
      lastRefill: "2025-02-15",
      doctor: "Dr. Michael Chen"
    },
    {
      id: 3,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily with meals",
      pillsLeft: 3,
      pillsPerDay: 2,
      refillStatus: "critical", // normal, warning, critical
      lastRefill: "2025-02-10",
      doctor: "Dr. Sarah Johnson"
    },
    {
      id: 4,
      name: "Vitamin D",
      dosage: "1000 IU",
      frequency: "Once daily",
      pillsLeft: 45,
      pillsPerDay: 1,
      refillStatus: "normal", // normal, warning, critical
      lastRefill: "2025-02-28",
      doctor: "Self-prescribed"
    }
  ]);

  // State for add/edit medication modal
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  
  // State for medication being edited (null for new medication)
  const [editingMedication, setEditingMedication] = useState(null);
  
  // State for medication form data
  const [medicationForm, setMedicationForm] = useState({
    name: "",
    dosage: "",
    frequency: "",
    pillsLeft: "",
    pillsPerDay: "",
    doctor: ""
  });
  
  // State for medication options modal
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  
  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Function to calculate days until medication runs out
  const calculateDaysLeft = (pillsLeft, pillsPerDay) => {
    return Math.floor(pillsLeft / pillsPerDay);
  };

  // Function to get status color based on days left
  const getStatusColor = (daysLeft) => {
    if (daysLeft <= 3) return "text-red-600";
    if (daysLeft <= 7) return "text-amber-500";
    return "text-green-600";
  };

  // Function to get progress bar color based on days left
  const getProgressColor = (daysLeft) => {
    if (daysLeft <= 3) return "bg-red-500";
    if (daysLeft <= 7) return "bg-amber-500";
    return "bg-green-500";
  };

  // Function to calculate progress bar percentage
  const calculateProgressPercentage = (pillsLeft, pillsPerDay) => {
    const daysLeft = calculateDaysLeft(pillsLeft, pillsPerDay);
    // Max display is 30 days
    const percentage = Math.min((daysLeft / 30) * 100, 100);
    return percentage;
  };

  // Function to handle automatic reordering
  const handleReorder = (medicationId) => {
    console.log(`Reordering medication with ID: ${medicationId}`);
    // In a real app, this would call an API to create a new order
    
    // Update the medication status in the UI
    setMedications(medications.map(med => {
      if (med.id === medicationId) {
        return { ...med, refillStatus: "pending" };
      }
      return med;
    }));
  };
  
  // Function to handle opening the add medication modal
  const handleAddMedication = () => {
    setMedicationForm({
      name: "",
      dosage: "",
      frequency: "",
      pillsLeft: "",
      pillsPerDay: "1",
      doctor: ""
    });
    setEditingMedication(null);
    setShowMedicationModal(true);
  };
  
  // Function to handle opening the edit medication modal
  const handleEditMedication = (medication, e) => {
    e.stopPropagation(); // Prevent triggering other click events
    
    setMedicationForm({
      name: medication.name,
      dosage: medication.dosage,
      frequency: medication.frequency,
      pillsLeft: medication.pillsLeft.toString(),
      pillsPerDay: medication.pillsPerDay.toString(),
      doctor: medication.doctor
    });
    setEditingMedication(medication);
    setShowMedicationModal(true);
  };
  
  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Function to handle form submission
  const handleSubmitMedication = (e) => {
    e.preventDefault();
    
    const newMedData = {
      ...medicationForm,
      pillsLeft: parseInt(medicationForm.pillsLeft),
      pillsPerDay: parseInt(medicationForm.pillsPerDay),
      refillStatus: "normal",
      lastRefill: new Date().toISOString().split('T')[0]
    };
    
    if (editingMedication) {
      // Update existing medication
      setMedications(prev => prev.map(med => 
        med.id === editingMedication.id 
          ? { ...med, ...newMedData } 
          : med
      ));
    } else {
      // Add new medication
      const newMedication = {
        ...newMedData,
        id: Date.now() // Simple ID generation
      };
      setMedications(prev => [...prev, newMedication]);
    }
    
    // Close modal
    setShowMedicationModal(false);
  };
  
  // Function to handle opening the options modal
  const handleShowOptions = (medication, e) => {
    e.stopPropagation(); // Prevent triggering other click events
    setSelectedMedication(medication);
    setShowOptionsModal(true);
  };
  
  // Function to handle deleting a medication
  const handleDeleteMedication = () => {
    setShowOptionsModal(false);
    setShowDeleteModal(true);
  };
  
  // Function to confirm deletion
  const confirmDeleteMedication = () => {
    if (selectedMedication) {
      setMedications(prev => prev.filter(med => med.id !== selectedMedication.id));
    }
    setShowDeleteModal(false);
    setSelectedMedication(null);
  };
  

  
  // Function to add pills (refill)
  const handleAddPills = () => {
    const pillsToAdd = prompt("How many pills are you adding?", "30");
    const numPills = parseInt(pillsToAdd);
    
    if (!isNaN(numPills) && numPills > 0) {
      setMedications(prev => prev.map(med => {
        if (med.id === selectedMedication.id) {
          return { 
            ...med, 
            pillsLeft: med.pillsLeft + numPills,
            lastRefill: new Date().toISOString().split('T')[0],
            refillStatus: "normal"
          };
        }
        return med;
      }));
    }
    
    setShowOptionsModal(false);
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
              <span className="text-indigo-600">Medications</span>
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
        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-lg font-medium mb-2">Medication Summary</h2>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Total Medications</p>
              <p className="text-xl font-semibold text-indigo-600">{medications.length}</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Need Refill Soon</p>
              <p className="text-xl font-semibold text-amber-600">
                {medications.filter(med => calculateDaysLeft(med.pillsLeft, med.pillsPerDay) <= 7).length}
              </p>
            </div>
          </div>
          <button 
            className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-2 flex items-center justify-center hover:bg-indigo-700 transition-colors"
            onClick={handleAddMedication}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Medication
          </button>
        </div>
        
        {/* Medications List */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Your Medications</h3>
          </div>
          
          {/* Medications List */}
          <div className="space-y-4">
            {medications.length > 0 ? (
              medications.map(medication => {
                const daysLeft = calculateDaysLeft(medication.pillsLeft, medication.pillsPerDay);
                const statusColor = getStatusColor(daysLeft);
                const progressColor = getProgressColor(daysLeft);
                const progressPercentage = calculateProgressPercentage(medication.pillsLeft, medication.pillsPerDay);
                
                return (
                  <div key={medication.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-lg">{medication.name}</h4>
                        <p className="text-gray-600 text-sm">{medication.dosage} - {medication.frequency}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {medication.pillsLeft} pills left
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1 mt-3">
                      <div 
                        className={`h-2.5 rounded-full ${progressColor}`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className={`font-medium ${statusColor}`}>
                        {daysLeft} days remaining
                      </span>
                      <span className="text-gray-500">
                        Prescribed by {medication.doctor}
                      </span>
                    </div>
                    
                    {/* Automatic Reorder Section */}
                    {daysLeft <= 7 && medication.refillStatus !== "pending" && (
                      <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-amber-800">
                              Running low on this medication. Refill soon.
                            </p>
                            <button 
                              onClick={() => handleReorder(medication.id)}
                              className="mt-2 bg-amber-500 text-white text-sm py-1 px-3 rounded-md hover:bg-amber-600 transition-colors"
                            >
                              Reorder Now
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {medication.refillStatus === "pending" && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm font-medium text-green-800">
                            Refill order placed. Your medication will be ready soon.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex justify-end mt-3 space-x-2">
                      <button 
                        className="p-2 text-gray-500 hover:text-indigo-600"
                        onClick={(e) => handleShowOptions(medication, e)}
                        aria-label="More options"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                      <button 
                        className="p-2 text-gray-500 hover:text-indigo-600"
                        onClick={(e) => handleEditMedication(medication, e)}
                        aria-label="Edit medication"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <p>You haven't added any medications yet</p>
                <button 
                  onClick={handleAddMedication}
                  className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Medication
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Add/Edit Medication Modal */}
      {showMedicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              {editingMedication ? "Edit Medication" : "Add New Medication"}
            </h3>
            
            <form onSubmit={handleSubmitMedication}>
              <div className="space-y-4">
                {/* Medication Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                    Medication Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={medicationForm.name}
                    onChange={handleInputChange}
                    placeholder="Enter medication name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Dosage */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="dosage">
                    Dosage
                  </label>
                  <input
                    id="dosage"
                    type="text"
                    name="dosage"
                    value={medicationForm.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g. 10mg, 500mg, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Frequency */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="frequency">
                    Frequency
                  </label>
                  <input
                    id="frequency"
                    type="text"
                    name="frequency"
                    value={medicationForm.frequency}
                    onChange={handleInputChange}
                    placeholder="e.g. Once daily, Twice daily, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Pills Left */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="pillsLeft">
                    Pills Left
                  </label>
                  <input
                    id="pillsLeft"
                    type="number"
                    name="pillsLeft"
                    min="0"
                    value={medicationForm.pillsLeft}
                    onChange={handleInputChange}
                    placeholder="Number of pills remaining"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Pills Per Day */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="pillsPerDay">
                    Pills Per Day
                  </label>
                  <input
                    id="pillsPerDay"
                    type="number"
                    name="pillsPerDay"
                    min="1"
                    value={medicationForm.pillsPerDay}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Doctor */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="doctor">
                    Prescribed By
                  </label>
                  <input
                    id="doctor"
                    type="text"
                    name="doctor"
                    value={medicationForm.doctor}
                    onChange={handleInputChange}
                    placeholder="Doctor's name or self-prescribed"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowMedicationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingMedication ? "Update" : "Add"} Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Options Modal */}
      {showOptionsModal && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-xs">
            <h3 className="text-lg font-medium mb-4">{selectedMedication.name}</h3>
            
            <div className="space-y-4">
              
              <button
                onClick={handleAddPills}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Pills (Refill)
              </button>
              
              <button
                onClick={handleDeleteMedication}
                className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v10M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-5 0h10" />
                </svg>
                Delete Medication
              </button>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowOptionsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal - Completion */}
      {showDeleteModal && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Delete Medication</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedMedication.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteMedication}
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