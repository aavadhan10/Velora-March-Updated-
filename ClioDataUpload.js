// components/ClioDataUpload.js
import React, { useState } from 'react';
import { Upload, CheckCircle, AlertTriangle, X } from 'lucide-react';
import Papa from 'papaparse';
import { useRouter } from 'next/router';

const ClioDataUpload = ({ onDataProcessed }) => {
  const router = useRouter();
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [fileDetails, setFileDetails] = useState(null);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setUploadStatus('error');
      setUploadMessage('Please upload a CSV file exported from Clio');
      return;
    }
    
    // Set upload in progress
    setUploadStatus('uploading');
    setUploadMessage('Processing your Clio data...');
    setFileDetails({
      name: file.name,
      size: formatFileSize(file.size),
      lastModified: new Date(file.lastModified).toLocaleDateString()
    });
    
    // Parse CSV with PapaParse
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('CSV parsing complete:', results);
        
        if (results.errors && results.errors.length > 0) {
          console.error('CSV parsing errors:', results.errors);
          setUploadStatus('error');
          setUploadMessage(`Error parsing CSV: ${results.errors[0].message}`);
          return;
        }
        
        if (!results.data || results.data.length === 0) {
          setUploadStatus('error');
          setUploadMessage('No data found in CSV file');
          return;
        }
        
        // Process the data
        const processedData = processCSVData(results.data);
        console.log('Processed data:', processedData);
        
        // Store in localStorage
        localStorage.setItem('velora_data_source', 'file');
        localStorage.setItem('velora_data', JSON.stringify(processedData));
        
        // Update status
        setUploadStatus('success');
        setUploadMessage(`Successfully processed ${results.data.length} records`);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        setUploadStatus('error');
        setUploadMessage(`Error parsing CSV: ${error.message}`);
      }
    });
  };
  
  // Process CSV data into the format needed for visualization and AI insights
  const processCSVData = (rawData) => {
    console.log('Processing CSV data...');
    
    // Initialize processed data
    const processedData = {
      rawData: rawData,
      billableHoursData: [],
      practiceAreaData: [],
      attorneyPerformanceData: [],
      matterStatusData: []
    };
    
    try {
      // Group by month for billable hours
      const billableByMonth = {};
      const nonBillableByMonth = {};
      
      // Group by practice area
      const practiceAreas = {};
      
      // Group by attorney
      const attorneys = {};
      
      // Group by matter status
      const matterStatuses = {};
      
      // Process each row
      rawData.forEach(row => {
        // Process month data
        const month = row['Activity month'] ? String(row['Activity month']) : '';
        if (month) {
          // Initialize if needed
          if (!billableByMonth[month]) {
            billableByMonth[month] = 0;
            nonBillableByMonth[month] = 0;
          }
          
          // Add hours
          billableByMonth[month] += Number(row['Billable hours'] || 0);
          nonBillableByMonth[month] += Number(row['Non-billable hours'] || 0);
        }
        
        // Process practice area data
        const practiceArea = row['Practice area'];
        if (practiceArea) {
          if (!practiceAreas[practiceArea]) {
            practiceAreas[practiceArea] = 0;
          }
          practiceAreas[practiceArea] += Number(row['Billable hours amount'] || 0);
        }
        
        // Process attorney data
        const attorney = row['User full name (first, last)'] || row['Originating attorney'];
        if (attorney) {
          if (!attorneys[attorney]) {
            attorneys[attorney] = { billable: 0, revenue: 0 };
          }
          attorneys[attorney].billable += Number(row['Billable hours'] || 0);
          attorneys[attorney].revenue += Number(row['Billable hours amount'] || 0);
        }
        
        // Process matter status data
        const status = row['Matter status'];
        if (status) {
          if (!matterStatuses[status]) {
            matterStatuses[status] = 0;
          }
          matterStatuses[status]++;
        }
      });
      
      // Convert to array format for charts
      
      // For billable hours by month
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      processedData.billableHoursData = Object.keys(billableByMonth).map(monthNum => {
        const monthIndex = parseInt(monthNum) - 1;
        const monthName = months[monthIndex] || `Month ${monthNum}`;
        
        return {
          month: monthName,
          billable: billableByMonth[monthNum],
          nonBillable: nonBillableByMonth[monthNum]
        };
      }).sort((a, b) => {
        return months.indexOf(a.month) - months.indexOf(b.month);
      });
      
      // For practice areas
      processedData.practiceAreaData = Object.keys(practiceAreas).map(area => ({
        name: area,
        value: practiceAreas[area]
      }));
      
      // For attorneys
      processedData.attorneyPerformanceData = Object.keys(attorneys).map(name => ({
        name: name,
        billable: attorneys[name].billable,
        revenue: attorneys[name].revenue
      }));
      
      // For matter statuses
      processedData.matterStatusData = Object.keys(matterStatuses).map(status => ({
        status: status,
        count: matterStatuses[status]
      }));
      
      console.log('Processed data structure:', processedData);
      
      return processedData;
    } catch (error) {
      console.error('Error processing CSV data:', error);
      return { rawData: rawData };
    }
  };
  
  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // View dashboard with analyzed data
  const viewDashboard = () => {
    router.push('/dashboard');
  };
  
  // Go to AI insights
  const viewInsights = () => {
    router.push('/ai-insights');
  };
  
  // Reset the upload
  const handleReset = () => {
    setUploadStatus('idle');
    setUploadMessage('');
    setFileDetails(null);
  };
  
  return (
    <div className="w-full">
      {/* Upload Area */}
      {uploadStatus === 'idle' && (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
              const event = { target: { files: files } };
              handleFileUpload(event);
            }
          }}
        >
          <div className="mx-auto flex justify-center">
            <Upload className="h-12 w-12 text-gray-400" />
          </div>
          <p className="mt-4 text-lg font-medium text-gray-900">
            Drag and drop your Clio CSV export
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Or click the button below to select a file from your computer
          </p>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            Select CSV File
          </label>
          <p className="mt-4 text-xs text-gray-500">
            Supported format: CSV exported from Clio
          </p>
        </div>
      )}
      
      {/* Uploading State */}
      {uploadStatus === 'uploading' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="mr-4 flex-shrink-0">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Processing your data</h3>
              <p className="text-sm text-gray-500">{uploadMessage}</p>
            </div>
          </div>
          
          {fileDetails && (
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-700">File: {fileDetails.name}</p>
              <p className="text-sm text-gray-500">Size: {fileDetails.size}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Success State */}
      {uploadStatus === 'success' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Data uploaded successfully</h3>
                <p className="text-sm text-gray-500">{uploadMessage}</p>
              </div>
            </div>
            
            <button 
              onClick={handleReset}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Different File
            </button>
            
            <div className="flex space-x-4">
              <button
                onClick={viewInsights}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Generate AI Insights
              </button>
              
              <button
                onClick={viewDashboard}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {uploadStatus === 'error' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Upload failed</h3>
                <p className="text-sm text-gray-500">{uploadMessage}</p>
              </div>
            </div>
            
            <button 
              onClick={handleReset}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClioDataUpload;
