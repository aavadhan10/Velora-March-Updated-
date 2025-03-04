// pages/_app.js
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthLayout from '../components/layout/AuthLayout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Add some quick simulation for direct access to protected pages
  useEffect(() => {
    // Get the current path
    const path = router.pathname;
    
    // Skip home, login, and waitlist pages
    if (path === '/' || path === '/login' || path === '/waitlist') return;
    
    // Check if the user has a token
    const token = typeof window !== 'undefined' ? localStorage.getItem('velora_demo_token') : null;
    
    // If no token and trying to access a protected page, redirect to login
    if (!token) {
      router.push('/login');
    }
  }, [router.pathname]);
  
  // Check if the page has a custom layout
  const getLayout = Component.getLayout || ((page) => (
    <>
      <Head>
        <title>Velora AI - Legal Business Intelligence</title>
        <meta name="description" content="AI-powered business intelligence for law firms" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <AuthLayout>
        {page}
      </AuthLayout>
    </>
  ));
  
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;