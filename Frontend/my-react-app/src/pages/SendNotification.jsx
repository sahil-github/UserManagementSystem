// frontend/src/pages/SendNotification.jsx
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import UserList from '../components/UserList';
import Notification from '../components/Notification';
import { sendNotifications } from '../services/api';
import { showToast } from '../utils/helpers';

const SendNotification = () => {
  const { users, loading } = useUser();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sending, setSending] = useState(false);

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
  };

  const handleSendNotification = async (formData) => {
    try {
      setSending(true);
      const response = await sendNotifications({
        userIds: selectedUsers,
        subject: formData.subject,
        message: formData.message,
      });
      
      showToast(response.message, 'success');
      setSelectedUsers([]); // Clear selection after sending
    } catch (error) {
      showToast(error.message || 'Failed to send notifications', 'error');
      console.error('Error sending notifications:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Send Notifications</h1>
        <p>Select users and send email notifications</p>
      </div>

      <div className="notification-page">
        <div className="user-selection">
          <div className="section-header">
            <h2>Select Users</h2>
            <button className="btn btn-secondary" onClick={handleSelectAll}>
              {selectedUsers.length === users.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading users...</p>
            </div>
          ) : (
            <UserList
              users={users}
              onSelect={handleSelectUser}
              selectedUsers={selectedUsers}
              onDelete={() => {}}
            />
          )}
        </div>

        <div className="notification-section">
          <h2>Compose Message</h2>
          <Notification
            selectedUsers={selectedUsers}
            onSend={handleSendNotification}
            isLoading={sending}
          />
        </div>
      </div>

      {sending && (
        <div className="overlay">
          <div className="spinner"></div>
          <p>Sending notifications...</p>
        </div>
      )}
    </div>
  );
};

export default SendNotification;