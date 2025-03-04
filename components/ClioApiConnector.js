// components/ClioApiConnector.js
import React, { useState } from 'react';
import { Database, CheckCircle, AlertTriangle, Lock, Key } from 'lucide-react';

const ClioApiConnector = ({ onConnected }) => {
  const [connectionState, setConnectionState] = useState('disconnected'); // disconnected, connecting, connected, error
  const [connectionError, setConnectionError] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  
  // Initialize OAuth flow with Clio
  const initiateOAuthFlow = () => {
    if (!clientId.trim()) {
      setConnectionError('Client ID is required');
      return;
    }
    
    // Simulate OAuth flow
    setConnectionState('connecting');
    
    // Simulate OAuth flow delay
    setTimeout(() => {
      // For demo purposes, simulate successful authentication
      setConnectionState('connected');
      
      // If we have a callback function, call it with the connection details
      if (onConnected) {
        onConnected({
          connected: true,
          lastSync: new Date().toISOString()
        });
      }
    }, 2000);
  };
  
  // Handle disconnect
  const handleDisconnect = () => {
    setConnectionState('disconnected');
    setClientId('');
    setClientSecret('');
  };
  
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Connect to Clio API</h3>
          
          {connectionState === 'connected' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <CheckCircle className="mr-1 h-3 w-3" />
              Connected
            </span>
          )}
        </div>
      </div>
      
      <div className="px-6 py-5">
        {connectionState === 'disconnected' && (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Connect your Clio account to automatically sync your legal practice data with Velora AI.
              This integration requires a Clio API Client ID and Secret.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="client-id" className="block text-sm font-medium text-gray-700">
                  Clio API Client ID
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="client-id"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your Clio Client ID"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Find this in your Clio Developer Portal under "Applications"
                </p>
              </div>
              
              <div>
                <label htmlFor="client-secret" className="block text-sm font-medium text-gray-700">
                  Clio API Client Secret
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="client-secret"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your Clio Client Secret"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  This is stored securely and used only for API authentication
                </p>
              </div>
              
              {connectionError && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Connection Error
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{connectionError}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={initiateOAuthFlow}
                >
                  <Database className="mr-1.5 h-4 w-4" />
                  Connect to Clio
                </button>
              </div>
            </div>
          </>
        )}
        
        {connectionState === 'connecting' && (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">Connecting to Clio API</h3>
            <p className="mt-2 text-sm text-gray-500">
              Please wait while we establish a secure connection...
            </p>
          </div>
        )}
        
        {connectionState === 'connected' && (
          <div className="py-4">
            <div className="rounded-md bg-green-50 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Clio API Connected Successfully
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Your Clio account is now connected to Velora AI.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Connection Details</h4>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Connection Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Active
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Last Synced</dt>
                  <dd className="mt-1 text-sm text-gray-900">Just now</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Sync Frequency</dt>
                  <dd className="mt-1 text-sm text-gray-900">Daily</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Next Sync</dt>
                  <dd className="mt-1 text-sm text-gray-900">Tomorrow</dd>
                </div>
              </dl>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
              
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sync Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClioApiConnector;
