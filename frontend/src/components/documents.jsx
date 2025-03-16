import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Documents() {
  // Sample documents data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Medical Report - Dr. Johnson",
      type: "PDF",
      date: "2025-02-15",
      size: "1.2 MB",
      category: "Medical Report",
      url: "/sample-documents/medical-report.pdf" // Sample URL for download
    },
    {
      id: 2,
      name: "Blood Test Results",
      type: "PDF",
      date: "2025-03-01",
      size: "856 KB",
      category: "Lab Results",
      url: "/sample-documents/blood-test.pdf"
    },
    {
      id: 3,
      name: "Prescription - Lisinopril",
      type: "JPEG",
      date: "2025-03-10",
      size: "380 KB",
      category: "Prescription",
      url: "/sample-documents/prescription.jpg"
    },
    {
      id: 4,
      name: "Insurance Claims Form",
      type: "PDF",
      date: "2025-02-28",
      size: "1.5 MB",
      category: "Insurance",
      url: "/sample-documents/insurance-claim.pdf"
    }
  ]);

  // State for file upload
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // State for document deletion confirmation
  const [documentToDelete, setDocumentToDelete] = useState(null);

  // Reference to file input
  const fileInputRef = useRef(null);

  // Filter state
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle file selection
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Start upload simulation
    setUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Create object URL for local file (for demo purposes)
          const fileUrl = URL.createObjectURL(selectedFile);
          
          // Add the new document to the list
          const newDocument = {
            id: documents.length + 1,
            name: selectedFile.name,
            type: selectedFile.name.split('.').pop().toUpperCase(),
            date: new Date().toISOString().split('T')[0],
            size: formatFileSize(selectedFile.size),
            category: "Uploaded",
            url: fileUrl // Use the created object URL
          };
          
          setDocuments(prev => [...prev, newDocument]);
          
          // Reset upload state
          setTimeout(() => {
            setUploading(false);
            setUploadProgress(0);
          }, 500);
        }
        return newProgress;
      });
    }, 300);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Handle downloading a document
  const handleDownload = (document, e) => {
    e.stopPropagation(); // Prevent triggering any parent click events
    
    // In a real application, you would use the document.url to initiate a download
    // For this example, we'll create a download simulation

    // Create a notification/feedback for the user
    const notification = document.name + " is downloading...";
    alert(notification);

    // In a real app, you would use the actual URL:
    // window.open(document.url, '_blank');
    
    // Or create a download link:
    if (document.url) {
      const link = document.createElement('a');
      link.href = document.url;
      link.download = document.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle deleting a document
  const handleDeleteDocument = (document, e) => {
    e.stopPropagation(); // Prevent triggering any parent click events
    setDocumentToDelete(document);
  };

  // Confirm document deletion
  const confirmDeleteDocument = () => {
    if (documentToDelete) {
      // If the document was uploaded and has an object URL, revoke it
      if (documentToDelete.url && documentToDelete.url.startsWith('blob:')) {
        URL.revokeObjectURL(documentToDelete.url);
      }
      
      setDocuments(prev => prev.filter(doc => doc.id !== documentToDelete.id));
      setDocumentToDelete(null);
    }
  };

  // Cancel document deletion
  const cancelDeleteDocument = () => {
    setDocumentToDelete(null);
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Get the icon for document type
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'PDF':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
            <path d="M8 7a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z" />
            <path d="M12 7a1 1 0 10-2 0v3a1 1 0 102 0V7z" />
          </svg>
        );
      case 'JPEG':
      case 'JPG':
      case 'PNG':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Filter documents based on active filter and search term
  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = activeFilter === "All" || doc.category === activeFilter;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort documents by date (newest first)
  const sortedDocuments = [...filteredDocuments].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get unique categories for filter
  const categories = ["All", ...new Set(documents.map(doc => doc.category))];

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
              <span className="text-indigo-600">Documents</span>
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
        {/* Search and Upload Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              onClick={handleFileSelect}
              className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="overflow-x-auto mb-4">
          <div className="flex space-x-2 pb-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium ${
                  activeFilter === category
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
                onClick={() => handleFilterChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow">
          {sortedDocuments.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {sortedDocuments.map(document => (
                <div key={document.id} className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      {getDocumentIcon(document.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{document.name}</h3>
                      <div className="flex flex-wrap mt-1 text-sm text-gray-500">
                        <span className="mr-3">{document.type}</span>
                        <span className="mr-3">{document.size}</span>
                        <span>{new Date(document.date).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {document.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button 
                        className="p-2 text-gray-400 hover:text-indigo-600"
                        onClick={(e) => handleDownload(document, e)}
                        aria-label={`Download ${document.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-600"
                        onClick={(e) => handleDeleteDocument(document, e)}
                        aria-label={`Delete ${document.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v10M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-5 0h10" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No documents found</p>
              <button 
                onClick={handleFileSelect}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200"
              >
                Upload a document
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {documentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Delete Document</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{documentToDelete.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDeleteDocument}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteDocument}
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