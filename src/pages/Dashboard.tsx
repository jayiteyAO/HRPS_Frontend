import React from 'react';
import TopNav from '../components/TopNav';
import { useAuth } from '../contexts/AuthContext';
import { getModulesForRole } from '../utils/rbac';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const modules = user ? getModulesForRole(user.role as string) : [];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <TopNav />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to HRPMS</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(modules.length ? modules : [{ name: 'No modules available', actions: [] }]).slice(0, 9).map((m) => (
            <a key={m.name} href={`#/modules?name=${encodeURIComponent(m.name)}`} className="block p-6 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold">{m.name.replace(/^[0-9]+\.\s*/, '')}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Actions: {m.actions.join(', ')}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
