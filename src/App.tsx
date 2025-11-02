import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Explore } from './pages/Explore';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const navigate = (page: string) => {
    if (page.startsWith('profile/')) {
      const creatorId = page.split('/')[1];
      setCurrentPage('profile');
      setPageParams({ creatorId });
    } else {
      setCurrentPage(page);
      setPageParams({});
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'login':
        return <Login onNavigate={navigate} />;
      case 'signup':
        return <Signup onNavigate={navigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'profile':
        return <Profile creatorId={pageParams.creatorId} onNavigate={navigate} />;
      case 'explore':
        return <Explore onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        {currentPage !== 'login' && currentPage !== 'signup' && (
          <Navbar onNavigate={navigate} currentPage={currentPage} />
        )}
        {renderPage()}
      </div>
    </AuthProvider>
  );
}

export default App;
