// pages/dashboard.js (Updated to use data from localStorage)
import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import mockData from '../utils/mockData';

export default function DashboardPage() {
  const [userRole, setUserRole] = useState('Partner');
  const [dashboardData, setDashboardData] = useState(mockData);
  
  // Get role and data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('velora_user_role');
      if (role) {
        setUserRole(role);
      }
      
      // Try to get real data from localStorage
      const dataSourceType = localStorage.getItem('velora_data_source');
      if (dataSourceType === 'file') {
        try {
          const storedData = JSON.parse(localStorage.getItem('velora_data'));
          if (storedData) {
            setDashboardData(storedData);
          }
        } catch (error) {
          console.error('Error parsing stored data:', error);
        }
      }
    }
  }, []);
  
  return (
    <div>
      <Dashboard userRole={userRole} data={dashboardData} />
    </div>
  );
}
