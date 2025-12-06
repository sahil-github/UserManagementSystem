// frontend/src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { validateEmail, validatePhone } from '../utils/helpers';

const UserForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: {
      city: '',
      state: '',
      country: '',
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.location.city.trim()) {
      newErrors['location.city'] = 'City is required';
    }

    if (!formData.location.state.trim()) {
      newErrors['location.state'] = 'State is required';
    }

    if (!formData.location.country.trim()) {
      newErrors['location.country'] = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Enter full name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="Enter email address"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'error' : ''}
          placeholder="Enter phone number"
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            className={errors['location.city'] ? 'error' : ''}
            placeholder="Enter city"
          />
          {errors['location.city'] && (
            <span className="error-message">{errors['location.city']}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="state">State *</label>
          <input
            type="text"
            id="state"
            name="location.state"
            value={formData.location.state}
            onChange={handleChange}
            className={errors['location.state'] ? 'error' : ''}
            placeholder="Enter state"
          />
          {errors['location.state'] && (
            <span className="error-message">{errors['location.state']}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <input
            type="text"
            id="country"
            name="location.country"
            value={formData.location.country}
            onChange={handleChange}
            className={errors['location.country'] ? 'error' : ''}
            placeholder="Enter country"
          />
          {errors['location.country'] && (
            <span className="error-message">{errors['location.country']}</span>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save User'}
      </button>
    </form>
  );
};

export default UserForm;