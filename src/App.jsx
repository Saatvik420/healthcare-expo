import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationModal from './components/NotificationModal';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Pages
import HomePage from './pages/HomePage';
import VisitorPassPage from './pages/VisitorPassPage';
import BookStallPage from './pages/BookStallPage';
import SchedulePage from './pages/SchedulePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RegistrationPage from './pages/RegistrationPage';

import './App.css';

function App() {
  const [notification, setNotification] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  const handleNotify = (title, message) => {
    setNotification({
      isOpen: true,
      title,
      message,
    });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <ScrollToTop />
          <TopBar />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage onNotify={handleNotify} />} />
              <Route path="/registration" element={<RegistrationPage onNotify={handleNotify} />} />
              <Route path="/register" element={<RegistrationPage onNotify={handleNotify} />} />
              <Route path="/register-visitor" element={<VisitorPassPage onNotify={handleNotify} />} />
              <Route path="/book-stall" element={<BookStallPage onNotify={handleNotify} />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/contact" element={<ContactPage onNotify={handleNotify} />} />
              <Route path="/login" element={<LoginPage onNotify={handleNotify} />} />
              <Route path="/signup" element={<SignupPage onNotify={handleNotify} />} />
              <Route path="/dashboard" element={<UserDashboardPage onNotify={handleNotify} />} />
              <Route path="/admin" element={<AdminDashboardPage onNotify={handleNotify} />} />
              <Route path="*" element={<HomePage onNotify={handleNotify} />} />
            </Routes>
          </main>
          <Footer />
          <NotificationModal
            isOpen={notification.isOpen}
            title={notification.title}
            message={notification.message}
            onClose={handleCloseNotification}
          />
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
