import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

export default function HealthCare() {
  // Sample emergency facilities data
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: "City General Hospital",
      type: "Hospital",
      distance: "1.2",
      address: "123 Medical Center Blvd",
      phone: "555-123-4567",
      hours: "24/7",
      rating: 4.5,
      lat: 40.712,
      lng: -74.006
    },
    {
      id: 2,
      name: "Urgent Care Clinic",
      type: "Urgent Care",
      distance: "0.8",
      address: "456 Health Street",
      phone: "555-987-6543",
      hours: "8 AM - 10 PM",
      rating: 4.2,
      lat: 40.715,
      lng: -74.009
    },
    {
      id: 3,
      name: "Community Medical Center",
      type: "Hospital",
      distance: "2.5",
      address: "789 Wellness Drive",
      phone: "555-456-7890",
      hours: "24/7",
      rating: 4.7,
      lat: 40.718,
      lng: -74.003
    },
    {
      id: 4,
      name: "Express Care Clinic",
      type: "Urgent Care",
      distance: "1.5",
      address: "321 First Aid Road",
      phone: "555-246-8135",
      hours: "7 AM - 9 PM",
      rating: 3.9,
      lat: 40.710,
      lng: -74.012
    }
  ]);

  // Use the useLoadScript hook to handle Google Maps loading
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC2AgIQWc-DbCrTDDDwhTfrfrPkNtaQvuU",
    libraries: ["places"]
  });

  // Map reference
  const mapRef = useRef(null);
  
  // Filter state
  const [activeFilter, setActiveFilter] = useState("All");
  
  // Filtered facilities
  const [filteredFacilities, setFilteredFacilities] = useState([]);

  // Current location state
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.7128,
    lng: -74.0060
  });

  // Selected facility for more info
  const [selectedFacility, setSelectedFacility] = useState(null);

  // Map Container Style
  const mapContainerStyle = {
    width: '100%',
    height: '200px'
  };

  // Map Options
  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  };

  // Initialize filtered facilities on component mount and when filter changes
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredFacilities(facilities);
    } else {
      setFilteredFacilities(facilities.filter(facility => facility.type === activeFilter));
    }
  }, [activeFilter, facilities]);

  // Function to handle clicking on a facility in the list
  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility.id === selectedFacility?.id ? null : facility);
  };

  // Function to handle getting directions
  const handleGetDirections = (facility, e) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    window.open(`https://maps.google.com?q=${facility.address.replace(/\s+/g, '+')}`, '_blank');
  };

  // Function to handle calling a facility
  const handleCall = (phoneNumber, e) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
  };

  // Function to handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ 
            lat: latitude, 
            lng: longitude 
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Handle map load
  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  // Zoom in function
  const handleZoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom + 1);
    }
  };

  // Zoom out function
  const handleZoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom - 1);
    }
  };

  // Sort facilities by distance
  const sortedFacilities = [...filteredFacilities].sort((a, b) => 
    parseFloat(a.distance) - parseFloat(b.distance)
  );

  // Render loading state
  if (loadError) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold">
            <span className="text-indigo-600">Health Care</span>
          </h1>
        </header>
        <main className="flex-1 p-4 flex items-center justify-center">
          <div className="text-red-500">
            Error loading maps. Please try again later.
          </div>
        </main>
      </div>
    );
  }

  // Render loading state while Google Maps loads
  if (!isLoaded) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold">
            <span className="text-indigo-600">Health Care</span>
          </h1>
        </header>
        <main className="flex-1 p-4 flex items-center justify-center">
          <div className="text-gray-500">
            Loading maps...
          </div>
        </main>
      </div>
    );
  }

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
              <span className="text-indigo-600">Health Care</span>
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
        {/* Map Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-4 relative">
          <h2 className="text-lg font-medium mb-4">Nearby Emergency Care</h2>
          
          {/* Google Maps */}
          <div className="h-48 rounded-lg mb-3 relative overflow-hidden">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={currentLocation}
              zoom={14}
              options={mapOptions}
              onLoad={handleMapLoad}
            >
              {/* User location marker - Simple version */}
              <Marker
                position={currentLocation}
                icon={{
                  // Use a simple circle for the user location
                  path: 0, // 0 corresponds to CIRCLE in Google Maps API
                  fillColor: "#10b981",
                  fillOpacity: 1,
                  strokeWeight: 0,
                  scale: 10
                }}
              />
              
              {/* Facility markers - no custom icon path to avoid errors */}
              {filteredFacilities.map(facility => (
                <Marker
                  key={facility.id}
                  position={{ lat: facility.lat, lng: facility.lng }}
                  onClick={() => handleFacilitySelect(facility)}
                  icon={{
                    // Using a simple circle to avoid SymbolPath issues
                    path: 0, // 0 corresponds to CIRCLE in Google Maps API
                    fillColor: facility.type === "Hospital" ? "#ef4444" : "#3b82f6",
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 8
                  }}
                />
              ))}
            </GoogleMap>
          </div>
          
          {/* Location Services */}
          <div className="flex justify-between items-center">
            <button 
              className="flex items-center text-indigo-600 text-sm font-medium"
              onClick={getCurrentLocation}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Update Location
            </button>
            <div className="flex space-x-2">
              <button 
                className="p-2 rounded-full bg-indigo-100 text-indigo-600"
                onClick={handleZoomOut}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button 
                className="p-2 rounded-full bg-indigo-100 text-indigo-600"
                onClick={handleZoomIn}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Type Filter */}
        <div className="flex space-x-2 mb-4">
          <button 
            className={`flex-1 py-2 rounded-lg text-center font-medium text-sm ${
              activeFilter === "All" 
                ? "bg-indigo-600 text-white" 
                : "bg-white text-gray-700 border border-gray-200"
            }`}
            onClick={() => handleFilterChange("All")}
          >
            All
          </button>
          <button 
            className={`flex-1 py-2 rounded-lg text-center font-medium text-sm ${
              activeFilter === "Hospital" 
                ? "bg-indigo-600 text-white" 
                : "bg-white text-gray-700 border border-gray-200"
            }`}
            onClick={() => handleFilterChange("Hospital")}
          >
            Hospitals
          </button>
          <button 
            className={`flex-1 py-2 rounded-lg text-center font-medium text-sm ${
              activeFilter === "Urgent Care" 
                ? "bg-indigo-600 text-white" 
                : "bg-white text-gray-700 border border-gray-200"
            }`}
            onClick={() => handleFilterChange("Urgent Care")}
          >
            Urgent Care
          </button>
        </div>
        
        {/* Facilities List */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">Nearest Emergency Facilities</h3>
          
          {sortedFacilities.length > 0 ? (
            <div className="space-y-4">
              {sortedFacilities.map(facility => (
                <div 
                  key={facility.id} 
                  className={`border rounded-lg p-4 cursor-pointer hover:border-indigo-200 ${
                    selectedFacility?.id === facility.id ? "border-indigo-400" : "border-gray-200"
                  }`}
                  onClick={() => handleFacilitySelect(facility)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg mr-3 ${facility.type === 'Hospital' ? 'bg-red-100' : 'bg-blue-100'}`}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-6 w-6 ${facility.type === 'Hospital' ? 'text-red-500' : 'text-blue-500'}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          {facility.type === 'Hospital' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          )}
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">{facility.name}</h4>
                        <p className="text-gray-600 text-sm">{facility.type}</p>
                        <div className="flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs text-gray-600 ml-1">{facility.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-indigo-600">{facility.distance} mi</span>
                      <p className="text-xs text-gray-500 mt-1">{facility.hours}</p>
                    </div>
                  </div>
                  
                  {selectedFacility && selectedFacility.id === facility.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Address:</span> {facility.address}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Phone:</span> {facility.phone}
                      </p>
                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => handleGetDirections(facility, e)}
                          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          Directions
                        </button>
                        <button 
                          onClick={(e) => handleCall(facility.phone, e)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Call
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No facilities match your current filter</p>
              <button 
                onClick={() => handleFilterChange("All")}
                className="mt-2 text-indigo-600 font-medium"
              >
                Show all facilities
              </button>
            </div>
          )}
        </div>
      </main>
      
      {/* Space to avoid content being hidden by bottom navigation */}
      <div className="h-16"></div>
    </div>
  );
}