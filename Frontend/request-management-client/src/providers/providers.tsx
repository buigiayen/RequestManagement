'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';

// Pages that don't require authentication
const publicPages = ['/login', '/register'];

export default function AppProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check if we're on a public page
    const isPublicPage = publicPages.includes(pathname);
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    
    if (!token && !isPublicPage) {
      // Redirect to login if not logged in and not on a public page
      router.push('/login');
    } else if (token && isPublicPage) {
      // Redirect to dashboard if logged in and on a public page
      router.push('/dashboard');
    }
    
    setLoading(false);
  }, [pathname]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
