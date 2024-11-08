import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Users, Home, Settings as SettingsIcon, FileText, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import BlogPosts from './components/BlogPosts';
import LoginScreen from './components/LoginScreen';
import { useAuth, AuthProvider } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <nav className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
          </div>
          <ul className="space-y-2 p-4">
            <li>
              <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded">
                <Users size={20} />
                <span>User Management</span>
              </Link>
            </li>
            <li>
              <Link to="/blog-posts" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded">
                <FileText size={20} />
                <span>Blog Posts</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded">
                <SettingsIcon size={20} />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
          <div className="p-4">
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-red-600 hover:bg-red-100 p-2 rounded w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/blog-posts" element={<BlogPosts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;