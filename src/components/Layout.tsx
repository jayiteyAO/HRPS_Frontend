import React, { useState } from 'react';
import TopBar from './TopBar';
import HorizontalNav from './HorizontalNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <TopBar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <HorizontalNav />
      
      <main className="flex-1 p-6 w-full mx-auto">
        {children}
      </main>
      
      <footer className="bg-[#0078D4] text-white py-4 w-full">
        <div className="px-6 text-center text-sm">
          © {new Date().getFullYear()} mPayroll - HR & Payroll Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
