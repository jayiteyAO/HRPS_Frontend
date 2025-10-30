import React from 'react';
import TopNav from '../components/TopNav';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <TopNav />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to HRPMS</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold">People & Organization</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Manage employees, profiles, and structure.</p>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold">Leave & Attendance</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Track time, approve leaves, and reconcile attendance.</p>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold">Payroll & Loans</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Process payroll, loans, and deductions.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

