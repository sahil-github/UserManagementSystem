// frontend/src/pages/EditUser.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { getUserById, updateUser } from '../services/api';
import { useUser } from '../context/UserContext';
import { showToast } from '../utils/helpers';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchUsers } = useUser();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setFetchingUser(true);
      const response = await getUserById(id);
      setUserData(response.data);
    } catch (error) {
      showToast('Failed to load user data', 'error');
      console.error('Error fetching user:', error);
      navigate('/users');
    } finally {
      setFetchingUser(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await updateUser(id, formData);
      showToast('User updated successfully', 'success');
      fetchUsers(); // Refresh the user list
      navigate('/users');
    } catch (error) {
      showToast(error.message || 'Failed to update user', 'error');
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingUser) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Edit User</h1>
        <p>Update user information</p>
      </div>

      <div className="form-container">
        <UserForm
          initialData={userData}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default EditUser;