import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import ModuleView from './pages/ModuleView';

const routesMap: Record<string, React.ReactNode> = {
  '/': <Login />,
  '/login': <Login />,
  '/dashboard': <Dashboard />,
  '/modules': <ModuleView />,
};

const RoutesRenderer: React.FC = () => {
  const { user } = useAuth();
  const path = typeof window !== 'undefined' ? window.location.hash.replace('#', '') || '/' : '/';

  // Simple guard: dashboard and modules require authentication
  const protectedPaths = ['/dashboard', '/modules'];
  if (protectedPaths.includes(path) && !user) {
    // redirect to login
    if (typeof window !== 'undefined') window.location.hash = '/login';
    return null;
  }

  return <>{routesMap[path] || <Login />}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-root">
          <RoutesRenderer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
