import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const PropertyForm = ({ onAddProperty }) => {
  const initialFormState = {
    title: '',
    location: '',
    price: '',
    type: 'Apartment',
    image: '',
    description: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear validation messages on change
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, location, price, type, image, description } = formData;

    // Frontend validations
    if (!title.trim() || !location.trim() || !price || !type || !image.trim() || !description.trim()) {
      setError('Please fill in all form fields');
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      setError('Price must be a valid positive number');
      return;
    }

    // Basic URL validation
    if (!image.startsWith('http://') && !image.startsWith('https://')) {
      setError('Please enter a valid image URL starting with http:// or https://');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const result = await onAddProperty(formData);
      if (result.success) {
        setSuccess('Property successfully added to inventory!');
        setFormData(initialFormState);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Failed to save property listing');
      }
    } catch (err) {
      setError('Server connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-form-container">
      <h3 className="form-title">Add Property</h3>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit} noValidate>
        {/* Title */}
        <div className="floating-group">
          <input
            type="text"
            id="title"
            name="title"
            className="floating-input"
            placeholder=" "
            value={formData.title}
            onChange={handleChange}
            required
          />
          <span className="floating-label" style={{ left: '1rem' }}>Property Title</span>
        </div>
        
        {/* Location */}
        <div className="floating-group">
          <input
            type="text"
            id="location"
            name="location"
            className="floating-input"
            placeholder=" "
            value={formData.location}
            onChange={handleChange}
            required
          />
          <span className="floating-label" style={{ left: '1rem' }}>Location (e.g. Miami, Florida)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Price */}
          <div className="floating-group">
            <input
              type="number"
              id="price"
              name="price"
              className="floating-input"
              placeholder=" "
              value={formData.price}
              onChange={handleChange}
              required
            />
            <span className="floating-label" style={{ left: '1rem' }}>Price (USD)</span>
          </div>

          {/* Property Type */}
          <div className="floating-group">
            <select
              id="type"
              name="type"
              className="floating-select"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Land">Land Plot</option>
            </select>
            <span className="floating-label" style={{ left: '1rem' }}>Property Type</span>
          </div>
        </div>

        {/* Image URL */}
        <div className="floating-group">
          <input
            type="url"
            id="image"
            name="image"
            className="floating-input"
            placeholder=" "
            value={formData.image}
            onChange={handleChange}
            required
          />
          <span className="floating-label" style={{ left: '1rem' }}>Image URL</span>
        </div>

        {/* Description */}
        <div className="floating-group">
          <textarea
            id="description"
            name="description"
            className="floating-input floating-textarea"
            placeholder=" "
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <span className="floating-label" style={{ left: '1rem', top: '1.2rem' }}>Description Details</span>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary submit-btn"
          style={{ width: '100%' }}
          disabled={submitting}
        >
          <PlusCircle size={18} />
          {submitting ? 'Adding...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
