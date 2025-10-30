import React from 'react';
import TopNav from '../components/TopNav';

const ModuleView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <TopNav />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Module Explorer</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg bg-white dark:bg-gray-800 shadow p-4">Module A</div>
          <div className="rounded-lg bg-white dark:bg-gray-800 shadow p-4">Module B</div>
          <div className="rounded-lg bg-white dark:bg-gray-800 shadow p-4">Module C</div>
        </div>
      </main>
    </div>
  );
};

export default ModuleView;

