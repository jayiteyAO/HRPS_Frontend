import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import ModuleView from './pages/ModuleView';

const routes: Record<string, React.ReactNode> = {
  '/': <Login />,
  '/login': <Login />,
  '/dashboard': <Dashboard />,
  '/modules': <ModuleView />,
};

function App() {
  const path = typeof window !== 'undefined' ? window.location.hash.replace('#', '') || '/' : '/';
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-root">{routes[path] || <Login />}</div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
