// frontend/src/pages/Users.jsx
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import UserList from '../components/UserList';
import { deleteUser } from '../services/api';
import { showToast } from '../utils/helpers';

const Users = () => {
  const { users, loading, fetchUsers } = useUser();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setDeleting(true);
        await deleteUser(id);
        showToast('User deleted successfully', 'success');
        fetchUsers(); // Refresh the list
      } catch (error) {
        showToast(error.message || 'Failed to delete user', 'error');
        console.error('Error deleting user:', error);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Users</h1>
        <p>Manage your users - view, edit, or delete</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <UserList users={users} onDelete={handleDelete} />
      )}

      {deleting && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Users;