// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Something went wrong');
  }
  
  return data;
};

// User API calls
export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return handleResponse(response);
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  return handleResponse(response);
};

export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// Notification API calls
export const sendNotifications = async (notificationData) => {
  const response = await fetch(`${API_BASE_URL}/notifications/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notificationData),
  });
  return handleResponse(response);
};

// Analytics API calls
export const getAnalytics = async () => {
  const response = await fetch(`${API_BASE_URL}/analytics/users-by-location`);
  return handleResponse(response);
};