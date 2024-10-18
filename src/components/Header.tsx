import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Home className="mr-2" /> RealEstate Comp
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/search" className="flex items-center hover:text-blue-200">
            <Search className="mr-1" /> Search
          </Link>
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={logout} className="hover:text-blue-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center hover:text-blue-200">
                <LogIn className="mr-1" /> Login
              </Link>
              <Link to="/register" className="flex items-center hover:text-blue-200">
                <UserPlus className="mr-1" /> Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;