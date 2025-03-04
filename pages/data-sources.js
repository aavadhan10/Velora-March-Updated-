// pages/data-sources.js (Updated to pass data to dashboard)
import { useState } from 'react';
import { useRouter } from 'next/router';
import ClioDataUpload from '../components/ClioDataUpload';
import ClioApiConnector from '../components/ClioApiConnector';

export default function DataSourcesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('upload');
  const [dataSource, setDataSource] = useState('sample');
  
  const handleDataUploaded = (processedData) => {
    // Store the processed data in localStorage
    localStorage.setItem('velora_data_source', 'file');
    localStorage.setItem('velora_data', JSON.stringify(processedData));
    
    // Redirect to dashboard to see the visualizations
    router.push('/dashboard');
  };
  
  const handleApiConnected = (connectionDetails) => {
    setDataSource('api');
    localStorage.setItem('velora_data_source', 'api');
    
    // Redirect to dashboard
    router.push('/dashboard');
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Data Sources</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'upload'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upload CSV
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'api'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Connect API
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'upload' ? (
            <ClioDataUpload onDataProcessed={handleDataUploaded} />
          ) : (
            <ClioApiConnector onConnected={handleApiConnected} />
          )}
        </div>
      </div>
    </div>
  );
}
