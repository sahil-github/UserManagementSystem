// frontend/src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllUsers } from '../services/api';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllUsers();
      setUsers(data.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const value = {
    users,
    setUsers,
    loading,
    error,
    fetchUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};