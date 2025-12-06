// frontend/src/pages/AddUser.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { createUser } from '../services/api';
import { useUser } from '../context/UserContext';
import { showToast } from '../utils/helpers';

const AddUser = () => {
  const navigate = useNavigate();
  const { fetchUsers } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await createUser(formData);
      showToast('User created successfully', 'success');
      fetchUsers(); // Refresh the user list
      navigate('/users');
    } catch (error) {
      showToast(error.message || 'Failed to create user', 'error');
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add New User</h1>
        <p>Fill in the details to create a new user</p>
      </div>

      <div className="form-container">
        <UserForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </div>
  );
};

export default AddUser;