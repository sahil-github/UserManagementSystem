// frontend/src/components/Notification.jsx
import React, { useState } from 'react';

const Notification = ({ selectedUsers, onSend, isLoading }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (selectedUsers.length === 0) {
      newErrors.users = 'Please select at least one user';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSend(formData);
      // Reset form after sending
      setFormData({
        subject: '',
        message: '',
      });
    }
  };

  return (
    <form className="notification-form" onSubmit={handleSubmit}>
      {errors.users && (
        <div className="alert alert-error">{errors.users}</div>
      )}

      <div className="selected-count">
        <span className="count-badge">{selectedUsers.length}</span>
        user(s) selected
      </div>

      <div className="form-group">
        <label htmlFor="subject">Email Subject *</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={errors.subject ? 'error' : ''}
          placeholder="Enter email subject"
        />
        {errors.subject && (
          <span className="error-message">{errors.subject}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? 'error' : ''}
          placeholder="Enter your message"
          rows="8"
        ></textarea>
        {errors.message && (
          <span className="error-message">{errors.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading || selectedUsers.length === 0}
      >
        {isLoading ? 'Sending...' : 'Send Notification'}
      </button>
    </form>
  );
};

export default Notification;