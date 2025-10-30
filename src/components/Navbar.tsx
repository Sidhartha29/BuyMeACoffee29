import React, { useState } from 'react';
import { Coffee, Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Coffee className="w-8 h-8 text-amber-500" />
            <span className="text-2xl font-bold text-gray-900">BuyMeACoffee</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`${
                currentPage === 'home' ? 'text-amber-600' : 'text-gray-600'
              } hover:text-amber-600 transition-colors`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className={`${
                currentPage === 'explore' ? 'text-amber-600' : 'text-gray-600'
              } hover:text-amber-600 transition-colors`}
            >
              Explore
            </button>

            {user ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`${
                    currentPage === 'dashboard' ? 'text-amber-600' : 'text-gray-600'
                  } hover:text-amber-600 transition-colors flex items-center space-x-1`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => onNavigate(`profile/${user.id}`)}
                  className={`${
                    currentPage.startsWith('profile') ? 'text-amber-600' : 'text-gray-600'
                  } hover:text-amber-600 transition-colors flex items-center space-x-1`}
                >
                  <User className="w-4 h-4" />
                  <span>{profile?.name || 'Profile'}</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-amber-600 transition-colors flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-gray-600 hover:text-amber-600 py-2"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('explore');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-gray-600 hover:text-amber-600 py-2"
            >
              Explore
            </button>

            {user ? (
              <>
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-amber-600 py-2 flex items-center space-x-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate(`profile/${user.id}`);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-amber-600 py-2 flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>{profile?.name || 'Profile'}</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left text-gray-600 hover:text-amber-600 py-2 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-amber-600 py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onNavigate('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 text-center"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
