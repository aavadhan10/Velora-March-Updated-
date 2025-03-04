// pages/index.js
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight, BarChart2, Brain, Database, Users, Shield, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('features');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  
  // Customer reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Managing Partner, Johnson & Associates",
      content: "Velora AI has transformed how we track our firm's performance. We've increased our billable utilization by 22% in just three months by identifying inefficiencies we never knew existed.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Principal, Chen Legal Group",
      content: "The data insights from Velora AI helped us restructure our practice areas to focus on our most profitable work. The ROI has been remarkable - I only wish we'd implemented it sooner.",
      rating: 5
    },
    {
      id: 3,
      name: "Amanda Rodriguez",
      position: "Operations Director, Rodriguez Law",
      content: "Implementing Velora AI was seamless with our Clio setup. The AI-powered insights have helped us make data-driven decisions that have directly improved our bottom line.",
      rating: 4
    }
  ];
  
  // Updated Team data
  const teamMembers = [
    {
      id: 1,
      name: "Rani Patel",
      position: "CEO & Co-Founder",
      bio: "Extensive experience working at multiple law firms with deep expertise in legal operations and practice management.",
      image: "/team/ankita.jpg"
    },
    {
      id: 2,
      name: "Rahul Gupta",
      position: "CPO & Co-Founder",
      bio: "Key engineering expertise with background in developing innovative solutions for the legal industry.",
      image: "/team/jeremy.jpg"
    }
  ];
  
  // Navigation for testimonial carousel
  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className="bg-white">
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes grow-1 {
          0%, 100% { height: 60%; }
          50% { height: 65%; }
        }
        
        @keyframes grow-2 {
          0%, 100% { height: 40%; }
          50% { height: 45%; }
        }
        
        @keyframes grow-3 {
          0%, 100% { height: 80%; }
          50% { height: 85%; }
        }
        
        @keyframes grow-4 {
          0%, 100% { height: 100%; }
          50% { height: 95%; }
        }
        
        @keyframes grow-5 {
          0%, 100% { height: 75%; }
          50% { height: 80%; }
        }
        
        @keyframes progress {
          0% { width: 65%; }
          50% { width: 70%; }
          100% { width: 65%; }
        }
        
        .animate-dash {
          animation: dash 3s ease-in-out forwards infinite;
          animation-delay: 0.5s;
        }
        
        .animate-grow-1 {
          animation: grow-1 2s ease-in-out infinite;
        }
        
        .animate-grow-2 {
          animation: grow-2 2s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        
        .animate-grow-3 {
          animation: grow-3 2s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        
        .animate-grow-4 {
          animation: grow-4 2s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        
        .animate-grow-5 {
          animation: grow-5 2s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        
        .animate-progress {
          width: 65%;
          animation: progress 3s ease-in-out infinite;
        }
      `}</style>

      {/* Main Navigation - Fixed at the top */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-10">
          <div className="flex justify-between items-center h-20">
            <div className="flex flex-col items-center">
              <img src="/logo.svg" alt="Velora AI" className="h-10 mb-0" />
              <span className="text-purple-800 font-semibold text-xs -mt-3">Velora.AI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/waitlist')}
                className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
              >
                Get a Demo
              </button>
              <button
                onClick={() => router.push('/login')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors font-medium text-sm"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Add space at the top to account for fixed header */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-800 opacity-90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Transform Your</span>
                <span className="block text-indigo-200">Law Firm's Data</span>
              </h1>
              <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
                Velora AI turns your practice management data into powerful insights. 
                Make data-driven decisions to optimize efficiency, increase profitability, 
                and enhance client service.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => router.push('/waitlist')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-indigo-800"
                >
                  Get a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => router.push('/login')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-100 bg-indigo-800/50 hover:bg-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-indigo-800"
                >
                  Sign In
                </button>
              </div>
            </div>
            
            <div className="hidden md:block md:w-1/2">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 w-full max-w-md">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center">
                        <BarChart2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="h-2 w-24 bg-indigo-200 rounded-full"></div>
                        <div className="h-2 mt-2 w-32 bg-indigo-200/70 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="h-48 bg-indigo-300/20 rounded-lg flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full p-4">
                        <div className="text-white text-opacity-80 text-center mb-2">
                          <span className="text-sm font-medium">Interactive Dashboard</span>
                        </div>
                        
                        {/* Animated Chart */}
                        <div className="relative h-36 w-full">
                          {/* Chart Header */}
                          <div className="absolute top-0 left-0 right-0 flex justify-between">
                            <div className="text-indigo-100 text-xs">Revenue Growth</div>
                            <div className="text-green-300 text-xs">+24%</div>
                          </div>
                          
                          {/* Line Chart */}
                          <div className="absolute top-6 left-0 right-0 bottom-0">
                            <svg viewBox="0 0 100 50" className="w-full h-full">
                              {/* Grid Lines */}
                              <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                              <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                              <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                              <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                              
                              {/* Animated Line */}
                              <path 
                                d="M0,40 L10,35 L20,38 L30,30 L40,32 L50,25 L60,20 L70,22 L80,18 L90,15 L100,10" 
                                fill="none" 
                                stroke="rgba(129,140,248,0.8)" 
                                strokeWidth="2"
                                strokeDasharray="200"
                                strokeDashoffset="200"
                                className="animate-dash"
                              />
                              
                              {/* Data Points */}
                              <circle cx="10" cy="35" r="1.5" fill="#818cf8" className="animate-pulse" />
                              <circle cx="20" cy="38" r="1.5" fill="#818cf8" className="animate-pulse" />
                              <circle cx="30" cy="30" r="1.5" fill="#818cf8" className="animate-pulse" />
                              <circle cx="40" cy="32" r="1.5" fill="#818cf8" className="animate-pulse" />
                              <circle cx="50" cy="25" r="1.5" fill="#818cf8" className="animate-pulse" />
                              <circle cx="60" cy="20" r="1.5" fill="#818cf8" className="animate-pulse" />
                              <circle cx="70" cy="22" r="1.5" fill="#818cf8" className="animate-pulse" />
                              <circle cx="80" cy="18" r="1.5" fill="#818cf8" className="animate-pulse" />
                              <circle cx="90" cy="15" r="1.5" fill="#818cf8" className="animate-pulse" />
                              <circle cx="100" cy="10" r="1.5" fill="#818cf8" className="animate-pulse" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-16 bg-indigo-300/20 rounded-lg p-2">
                        <div className="text-indigo-100 text-xs mb-1">Billable Hours</div>
                        <div className="flex items-end space-x-1 h-8">
                          <div className="bg-indigo-400 w-1/5 h-3/5 rounded-sm animate-grow-1"></div>
                          <div className="bg-indigo-400 w-1/5 h-2/5 rounded-sm animate-grow-2"></div>
                          <div className="bg-indigo-400 w-1/5 h-4/5 rounded-sm animate-grow-3"></div>
                          <div className="bg-indigo-400 w-1/5 h-full rounded-sm animate-grow-4"></div>
                          <div className="bg-indigo-400 w-1/5 h-3/4 rounded-sm animate-grow-5"></div>
                        </div>
                      </div>
                      <div className="h-16 bg-indigo-300/20 rounded-lg p-2">
                        <div className="text-indigo-100 text-xs mb-1">Active Cases</div>
                        <div className="w-full h-8 rounded-full bg-indigo-900/30 mt-1 overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-400 to-purple-400 h-full rounded-full animate-progress"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex justify-center">
            <button
              onClick={() => setActiveTab('features')}
              className={`${
                activeTab === 'features'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`${
                activeTab === 'reviews'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Customer Reviews
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`${
                activeTab === 'team'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              About Our Team
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`${
                activeTab === 'privacy'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Data Privacy
            </button>
          </nav>
        </div>
      </div>
      
      {/* Features Tab Content */}
      {activeTab === 'features' && (
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                Built for Legal Excellence
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Everything you need to transform your law firm's data into actionable insights.
              </p>
            </div>
            
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-500 text-white">
                    <BarChart2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">Comprehensive Analytics</h3>
                  <p className="mt-3 text-base text-gray-500">
                    Interactive dashboards with key metrics for billable hours, revenue, matter status, and practice areas. Visualize trends and spot opportunities at a glance.
                  </p>
                </div>
                
                {/* Feature 2 */}
                <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-500 text-white">
                    <Brain className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">AI-Powered Insights</h3>
                  <p className="mt-3 text-base text-gray-500">
                    Ask questions in plain English and get instant, data-driven insights about your firm's performance. No technical expertise required.
                  </p>
                </div>
                
                {/* Feature 3 */}
                <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-500 text-white">
                    <Database className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">Seamless Clio Integration</h3>
                  <p className="mt-3 text-base text-gray-500">
                    Connect directly to your Clio account or upload CSV exports to analyze your firm's data with just a few clicks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Customer Reviews Tab Content */}
      {activeTab === 'reviews' && (
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Testimonials</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                What Our Customers Say
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Don't just take our word for it — see what legal professionals are saying about Velora AI.
              </p>
            </div>
            
            <div className="mt-16 relative">
              <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex">
                    {[...Array(reviews[currentReviewIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-8 italic relative">
                  <span className="text-indigo-400 text-5xl absolute -top-4 -left-2">"</span>
                  {reviews[currentReviewIndex].content}
                  <span className="text-indigo-400 text-5xl absolute -bottom-10 right-0">"</span>
                </blockquote>
                <div className="flex items-center mt-12">
                  <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Users className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-semibold text-gray-900">{reviews[currentReviewIndex].name}</div>
                    <div className="text-base text-gray-500">{reviews[currentReviewIndex].position}</div>
                  </div>
                </div>
              </div>
              
              {/* Navigation arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-6">
                <button 
                  onClick={prevReview}
                  className="rounded-full bg-white shadow-lg p-3 focus:outline-none hover:bg-indigo-50 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-indigo-600" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-6">
                <button 
                  onClick={nextReview}
                  className="rounded-full bg-white shadow-lg p-3 focus:outline-none hover:bg-indigo-50 transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-indigo-600" />
                </button>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center mt-8">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    className={`h-3 w-3 mx-2 rounded-full ${
                      currentReviewIndex === index ? 'bg-indigo-600' : 'bg-gray-300'
                    } hover:bg-indigo-400 transition-colors`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Team Tab Content */}
      {activeTab === 'team' && (
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Team</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                Meet the Experts Behind Velora AI
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                We combine deep expertise in legal operations, AI, and data science to build solutions that transform how law firms operate.
              </p>
            </div>
            
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 sm:grid-cols-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                    <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <Users className="h-24 w-24 text-white" />
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-indigo-600 font-medium mb-4">{member.position}</p>
                      <p className="text-base text-gray-500">{member.bio}</p>
                      <div className="mt-6 flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors">
                          <span className="sr-only">LinkedIn</span>
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors">
                          <span className="sr-only">Twitter</span>
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-20 bg-indigo-50 rounded-xl p-10 shadow-inner">
                <h3 className="text-2xl font-semibold text-gray-900 text-center">Our Mission</h3>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto text-center">
                  We believe that data-driven insights should be accessible to law firms of all sizes. Our mission is to democratize analytics and AI for the legal industry, empowering firms to make better decisions and serve their clients more effectively.
                </p>
                
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-indigo-600 font-bold text-2xl mb-2">5+</div>
                    <p className="text-gray-500">Years of Legal Tech Experience</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-indigo-600 font-bold text-2xl mb-2">30+</div>
                    <p className="text-gray-500">Law Firms Served</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-indigo-600 font-bold text-2xl mb-2">98%</div>
                    <p className="text-gray-500">Customer Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Data Privacy Tab Content */}
      {activeTab === 'privacy' && (
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Data Privacy</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                Security You Can Trust
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                We understand the sensitivity of legal data. Your security is our top priority.
              </p>
            </div>
            
            <div className="mt-16">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <div className="px-8 py-12">
                  <div className="flex items-center justify-center h-20 w-20 bg-indigo-100 rounded-full mx-auto mb-8">
                    <Shield className="h-10 w-10 text-indigo-600" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 text-center">Your Data, Protected</h3>
                  <p className="mt-4 text-lg text-gray-500 text-center max-w-2xl mx-auto">
                    Velora AI implements industry-leading security measures to ensure your firm's sensitive information remains protected at every step.
                  </p>
                  
                  <div className="mt-12 grid gap-8 sm:grid-cols-2">
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Data Encryption</h4>
                      <p className="mt-3 text-base text-gray-500">
                        All data is encrypted at rest and in transit using AES-256 encryption. Your information is always protected, whether it's stored on our servers or being transmitted.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">SOC 2 Compliance</h4>
                      <p className="mt-3 text-base text-gray-500">
                        Velora AI is SOC 2 Type II certified, demonstrating our commitment to security, availability, processing integrity, and confidentiality principles.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Data Ownership</h4>
                      <p className="mt-3 text-base text-gray-500">
                        You maintain complete ownership of your data at all times. We never sell or share your information with third parties for any purpose.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Secure Integrations</h4>
                      <p className="mt-3 text-base text-gray-500">
                        Our Clio integration uses OAuth 2.0 for secure authentication and API tokens with limited access scopes to ensure minimal data exposure.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-16 bg-indigo-50 rounded-lg p-8 text-center">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Want to learn more about our security practices?</h4>
                    <a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('privacy');}} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                      Read our full privacy policy
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-200">Try the Velora AI demo today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button 
                onClick={() => router.push('/waitlist')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('features');}} className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault();}} className="text-gray-300 hover:text-white">Pricing (In Progress)</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('reviews');}} className="text-gray-300 hover:text-white">Case Studies</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault();}} className="text-gray-300 hover:text-white">API (In Progress)</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('team');}} className="text-gray-300 hover:text-white">About Our Team</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault();}} className="text-gray-300 hover:text-white">Blog (In Progress)</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault();}} className="text-gray-300 hover:text-white">Careers (In Progress)</a></li>
                <li><a href="/waitlist" className="text-gray-300 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => {e.preventDefault();}} className="text-gray-300 hover:text-white">Documentation (In Progress)</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault();}} className="text-gray-300 hover:text-white">Guides (In Progress)</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault();}} className="text-gray-300 hover:text-white">Webinars (In Progress)</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('reviews');}} className="text-gray-300 hover:text-white">Customer Reviews</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('privacy');}} className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault();}} className="text-gray-300 hover:text-white">Terms of Service (In Progress)</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault();}} className="text-gray-300 hover:text-white">Cookie Policy (In Progress)</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('privacy');}} className="text-gray-300 hover:text-white">Data Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Velora AI" className="h-20 mr-2" />
              <p className="text-gray-300">
                © 2025 Velora AI. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://twitter.com/veloraai" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/veloraai" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
