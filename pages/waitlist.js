// pages/waitlist.js - Truly standalone with getLayout pattern
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowLeft, Check } from 'lucide-react';

// This is a completely standalone page with no shared layout components
export default function WaitlistPage() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    role: '',
    firmSize: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend or API
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
  };
  
  return (
    <>
      <Head>
        <title>Join the Velora AI Waitlist</title>
        <meta name="description" content="Join the waitlist for Velora AI's legal analytics platform" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Simple standalone header */}
        <header className="bg-indigo-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/">
                  <a>
                    <img src="/logo.png" alt="Velora AI" className="h-8 cursor-pointer" />
                  </a>
                </Link>
                <span className="ml-3 text-white font-medium"> Velora AI</span>
              </div>
              
              <Link href="/">
                <a className="text-white hover:text-indigo-100 font-medium text-sm flex items-center">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Home
                </a>
              </Link>
            </div>
          </div>
        </header>
        
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {formSubmitted ? (
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="py-16 px-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Thank You!</h2>
                <p className="mt-4 text-lg text-gray-500">
                  You've been added to our waitlist. We'll be in touch soon with more information about Velora AI.
                </p>
                <div className="mt-8">
                  <Link href="/">
                    <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Return to Home
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Join the Velora AI Waitlist</h1>
                <p className="mt-2 text-gray-600">
                  Be among the first to experience AI-powered legal analytics for your firm.
                </p>
              </div>
              
              <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-indigo-600 py-6 px-8">
                  <h2 className="text-xl font-bold text-white">Request Access</h2>
                  <p className="mt-1 text-indigo-200">
                    Please fill out the form below to join our waitlist.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                        Law Firm / Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Your Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select...</option>
                        <option value="Partner">Partner</option>
                        <option value="Associate">Associate</option>
                        <option value="Office Manager">Office Manager</option>
                        <option value="Operations Director">Operations Director</option>
                        <option value="IT Manager">IT Manager</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="firmSize" className="block text-sm font-medium text-gray-700">
                        Firm Size <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="firmSize"
                        name="firmSize"
                        required
                        value={formData.firmSize}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select...</option>
                        <option value="1-5">1-5 attorneys</option>
                        <option value="6-20">6-20 attorneys</option>
                        <option value="21-50">21-50 attorneys</option>
                        <option value="51-100">51-100 attorneys</option>
                        <option value="100+">100+ attorneys</option>
                      </select>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        What are you most interested in using Velora AI for?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Join Waitlist
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// This tells Next.js to bypass the layout in _app.js
WaitlistPage.getLayout = function getLayout(page) {
  return page;
}