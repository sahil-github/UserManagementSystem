// frontend/src/components/UserList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

const UserList = ({ users, onDelete, onSelect, selectedUsers = [] }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleCheckboxChange = (userId) => {
    if (onSelect) {
      onSelect(userId);
    }
  };

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found. Add your first user to get started!</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <table className="user-table">
        <thead>
          <tr>
            {onSelect && <th className="checkbox-col">Select</th>}
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {onSelect && (
                <td className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                  />
                </td>
              )}
              <td className="user-name">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {user.location.city}, {user.location.state}, {user.location.country}
              </td>
              <td>{formatDate(user.createdAt)}</td>
              <td className="actions">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;