/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_CREDENTIALS, DEMO_VISITOR, DEMO_EXHIBITOR } from './authConstants';

export { ADMIN_CREDENTIALS, DEMO_VISITOR, DEMO_EXHIBITOR };

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('ghe_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ghe_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ghe_auth_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // Check Admin
    if (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() && password === ADMIN_CREDENTIALS.password) {
      const adminUser = {
        name: ADMIN_CREDENTIALS.name,
        email: ADMIN_CREDENTIALS.email,
        role: 'admin',
      };
      setCurrentUser(adminUser);
      return { success: true, user: adminUser };
    }

    // Check Demo Visitor
    if (cleanEmail === DEMO_VISITOR.email.toLowerCase() && password === DEMO_VISITOR.password) {
      setCurrentUser(DEMO_VISITOR);
      return { success: true, user: DEMO_VISITOR };
    }

    // Check Demo Exhibitor
    if (cleanEmail === DEMO_EXHIBITOR.email.toLowerCase() && password === DEMO_EXHIBITOR.password) {
      setCurrentUser(DEMO_EXHIBITOR);
      return { success: true, user: DEMO_EXHIBITOR };
    }

    // Check Local Registered Users
    try {
      const users = JSON.parse(localStorage.getItem('ghe_registered_users') || '[]');
      const found = users.find(
        (u) => u.email.toLowerCase() === cleanEmail && u.password === password
      );
      if (found) {
        const sessionUser = { ...found };
        delete sessionUser.password;
        setCurrentUser(sessionUser);
        return { success: true, user: sessionUser };
      }
    } catch {
      // ignore
    }

    return { success: false, message: 'Invalid email or password. Please check your credentials.' };
  };

  const signup = (userData) => {
    try {
      const cleanEmail = userData.email.trim().toLowerCase();
      const users = JSON.parse(localStorage.getItem('ghe_registered_users') || '[]');

      if (
        cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() ||
        users.some((u) => u.email.toLowerCase() === cleanEmail)
      ) {
        return { success: false, message: 'An account with this email address already exists.' };
      }

      const newUser = {
        ...userData,
        email: cleanEmail,
        id: 'usr_' + Date.now(),
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('ghe_registered_users', JSON.stringify(users));

      // Automatically log the user in
      const sessionUser = { ...newUser };
      delete sessionUser.password;
      setCurrentUser(sessionUser);
      return { success: true, user: sessionUser };
    } catch {
      return { success: false, message: 'Failed to create account. Please try again.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        isAdmin: currentUser?.role === 'admin',
        isVisitor: currentUser?.role === 'visitor',
        isExhibitor: currentUser?.role === 'exhibitor',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
