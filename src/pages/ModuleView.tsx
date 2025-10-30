import React from 'react';
import TopNav from '../components/TopNav';
import { useAuth } from '../contexts/AuthContext';
import { getModulesForRole } from '../utils/rbac';

const ModuleView: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const moduleName = params.get('name') || '';
  const modules = user ? getModulesForRole(user.role as string) : [];
  const moduleSpec = modules.find((m) => m.name === moduleName) || modules.find((m) => m.name.toLowerCase().includes(moduleName.toLowerCase())) || null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <TopNav />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Module Explorer</h1>
        {!user && <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">Please sign in to view modules.</div>}

        {user && (
          <div>
            {moduleSpec ? (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{moduleSpec.name.replace(/^[0-9]+\.\s*/, '')}</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Allowed actions for your role: {moduleSpec.actions.join(', ')}</p>
                <div className="mt-4 flex gap-3">
                  {moduleSpec.actions.includes('view') && hasAccess(moduleSpec.name, 'view') && (
                    <button className="px-3 py-2 rounded bg-microsoft-blue text-white">View</button>
                  )}
                  {moduleSpec.actions.includes('create') && hasAccess(moduleSpec.name, 'create') && (
                    <button className="px-3 py-2 rounded bg-green-600 text-white">Create</button>
                  )}
                  {moduleSpec.actions.includes('update') && hasAccess(moduleSpec.name, 'update') && (
                    <button className="px-3 py-2 rounded bg-yellow-600 text-white">Update</button>
                  )}
                  {moduleSpec.actions.includes('approve') && hasAccess(moduleSpec.name, 'approve') && (
                    <button className="px-3 py-2 rounded bg-indigo-600 text-white">Approve</button>
                  )}
                  {moduleSpec.actions.includes('manage') && hasAccess(moduleSpec.name, 'manage') && (
                    <button className="px-3 py-2 rounded bg-gray-700 text-white">Manage</button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(modules.length ? modules : [{ name: 'No modules available', actions: [] }]).map((m) => (
                  <div key={m.name} className="rounded-lg bg-white dark:bg-gray-800 shadow p-4">
                    <h3 className="font-semibold">{m.name.replace(/^[0-9]+\.\s*/, '')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Actions: {m.actions.join(', ')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ModuleView;
