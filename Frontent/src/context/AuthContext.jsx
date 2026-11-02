
import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';
import { USER_PROFILE_AVATAR } from '../data/productsData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('casa_user')) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem('casa_token') || null
  );

  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);

  const openAuthDrawer = () => setIsAuthDrawerOpen(true);
  const closeAuthDrawer = () => setIsAuthDrawerOpen(false);

  const saveAuth = (data) => {
    const loggedInUser = {
      avatar: data.user.avatar || USER_PROFILE_AVATAR,
      tier: data.user.tier || 'Casa Club Member',
      points: data.user.points || 0,
      addresses: data.user.addresses || [],
      ...data.user,
    };

    setUser(loggedInUser);
    setToken(data.token);

    localStorage.setItem('casa_user', JSON.stringify(loggedInUser));
    localStorage.setItem('casa_token', data.token);

    closeAuthDrawer();
    return loggedInUser;
  };

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    return saveAuth(data);
  };

  const signup = async (name, email, password) => {
    const data = await api.register({ name, email, password });
    return saveAuth(data);
  };

  const loginAsGuest = async () => {
    const data = await api.guestLogin();
    return saveAuth(data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('casa_user');
    localStorage.removeItem('casa_token');
  };

  const updateAddress = (updatedAddress) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = {
        ...prev,
        addresses: [updatedAddress],
      };

      localStorage.setItem('casa_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthDrawerOpen,
        openAuthDrawer,
        closeAuthDrawer,
        login,
        signup,
        loginAsGuest,
        logout,
        updateAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
