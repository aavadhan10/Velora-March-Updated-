// pages/reports.js (Updated with folder structure)
import { useState } from 'react';
import { FileText, Download, Eye, Folder, ChevronRight, ChevronDown } from 'lucide-react';

export default function ReportsPage() {
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: 'Financial Reports',
      expanded: true,
      reports: [
        {
          id: 1,
          name: 'Monthly Billable Hours Report',
          description: 'Summary of billable hours by attorney and practice area',
          created: 'March 1, 2025',
          format: 'PDF'
        },
        {
          id: 2,
          name: 'Revenue by Practice Area',
          description: 'Breakdown of revenue by practice area',
          created: 'February 28, 2025',
          format: 'Excel'
        }
      ]
    },
    {
      id: 2,
      name: 'Attorney Performance',
      expanded: true,
      reports: [
        {
          id: 3,
          name: 'Attorney Performance Review',
          description: 'Detailed performance metrics for all attorneys',
          created: 'February 28, 2025',
          format: 'Excel'
        },
        {
          id: 4,
          name: 'Utilization Report',
          description: 'Billable utilization by attorney',
          created: 'February 26, 2025',
          format: 'PDF'
        }
      ]
    },
    {
      id: 3,
      name: 'Practice Analysis',
      expanded: false,
      reports: [
        {
          id: 5,
          name: 'Practice Area Profitability Analysis',
          description: 'Profit and revenue analysis by practice area',
          created: 'February 25, 2025',
          format: 'PDF'
        }
      ]
    },
    {
      id: 4,
      name: 'Client Reports',
      expanded: false,
      reports: [
        {
          id: 6,
          name: 'Client Billing Summary',
          description: 'Overview of billing by client and matter',
          created: 'February 20, 2025',
          format: 'PDF'
        }
      ]
    }
  ]);
  
  const toggleFolder = (folderId) => {
    setFolders(folders.map(folder => 
      folder.id === folderId 
        ? { ...folder, expanded: !folder.expanded } 
        : folder
    ));
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create New Report
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium">Report Library</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {folders.map((folder) => (
            <div key={folder.id} className="bg-white">
              {/* Folder header */}
              <div 
                className="px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => toggleFolder(folder.id)}
              >
                <div className="flex items-center">
                  <Folder className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="font-medium text-gray-700">{folder.name}</span>
                  <span className="ml-2 text-xs text-gray-400">({folder.reports.length})</span>
                </div>
                <div>
                  {folder.expanded ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              {/* Reports in folder */}
              {folder.expanded && (
                <div className="bg-gray-50 border-t border-gray-100">
                  {folder.reports.map((report) => (
                    <div key={report.id} className="px-6 py-4 ml-6 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <FileText className="h-5 w-5 text-indigo-400" />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-indigo-600">{report.name}</h3>
                            <p className="text-xs text-gray-500">{report.description}</p>
                            <p className="mt-1 text-xs text-gray-400">Last updated: {report.created} • {report.format}</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center">
                            <Download className="mr-1 h-4 w-4" />
                            Export
                          </button>
                          <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center">
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
