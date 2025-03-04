// pages/ai-insights.js
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import mockData from '../utils/mockData';  // Corrected import path

export default function AiInsightsPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [insightResult, setInsightResult] = useState(null);
  const [data, setData] = useState(mockData);
  
  // Try to get real data from localStorage with added debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dataSourceType = localStorage.getItem('velora_data_source');
      console.log("Data source type:", dataSourceType);
      
      if (dataSourceType === 'file') {
        try {
          const storedData = JSON.parse(localStorage.getItem('velora_data'));
          console.log("Data from localStorage:", storedData);
          if (storedData) {
            setData(storedData);
          }
        } catch (error) {
          console.error('Error parsing stored data:', error);
        }
      }
    }
  }, []);
  
  const suggestedPrompts = [
    "Which practice area is most profitable?",
    "Show me billable hour trends by attorney",
    "What is our utilization rate compared to industry average?",
    "Identify bottlenecks in our matter workflow"
  ];
  
  const generateInsight = async (promptText) => {
    setIsLoading(true);
    
    try {
      // Get the data to analyze
      const dataToAnalyze = {
        rawData: data.rawData || [],
        billableHoursData: data.billableHoursData || [],
        practiceAreaData: data.practiceAreaData || [],
        attorneyPerformanceData: data.attorneyPerformanceData || [],
        matterStatusData: data.matterStatusData || []
      };
      
      console.log("Sending data to Claude:", dataToAnalyze);
      
      // Call our API endpoint that will proxy to Claude
      const response = await axios.post('/api/generate-insight', {
        prompt: promptText,
        data: dataToAnalyze
      });
      
      console.log("Response from Claude:", response.data);
      
      // Set the result
      setInsightResult(response.data);
    } catch (error) {
      console.error('Error generating insights:', error);
      console.error('Error details:', error.response?.data || error.message);
      setInsightResult({
        text: "I encountered an error analyzing your data. This could be due to unexpected data formats or missing fields.",
        chartType: null,
        recommendation: "Try uploading a standard Clio export CSV or reformatting your data to include fields like 'Billable hours', 'Practice area', and 'User full name'."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">AI Insights</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Ask Velora AI</h2>
        <div className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateInsight(query)}
              placeholder="Ask a question about your firm data..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() => generateInsight(query)}
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Generate Insight'
            )}
          </button>
        </div>
        
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(prompt);
                generateInsight(prompt);
              }}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md transition"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      
      {/* Result Section */}
      {insightResult && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-lg font-medium">AI Analysis Results</h3>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              <p>{insightResult.text}</p>
              
              <div className="mt-6 p-4 bg-indigo-50 rounded-md border border-indigo-100">
                <h4 className="text-sm font-medium text-indigo-800">AI Recommendation</h4>
                <p className="text-sm text-indigo-700 mt-1">{insightResult.recommendation}</p>
              </div>
            </div>
            
            <div className="mt-6 h-64 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center">
              <p className="text-gray-500">
                {insightResult.chartType === 'bar' && "[Bar Chart Visualization]"}
                {insightResult.chartType === 'line' && "[Line Chart Visualization]"}
                {insightResult.chartType === 'gauge' && "[Gauge Chart Visualization]"}
                {insightResult.chartType === 'pie' && "[Pie Chart Visualization]"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
