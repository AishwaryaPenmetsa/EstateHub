import React from 'react';
import PropertyForm from '../components/PropertyForm';
import { Trash2, AlertCircle, RefreshCw } from 'lucide-react';

const AdminDashboard = ({ properties, loading, onAddProperty, onDeleteProperty }) => {
  
  // Format price helper (e.g. $850,000)
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleDeleteClick = (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete the property "${title}"?`)) {
      onDeleteProperty(id);
    }
  };

  return (
    <main className="main-content" style={{ paddingTop: '2rem' }}>
      <div className="section-header">
        <h2 className="section-title">Admin Dashboard</h2>
        <span className="results-count">Listing Operations Control</span>
      </div>

      <div className="dashboard-layout">
        {/* Left Hand Column: Form for adding listings */}
        <div>
          <PropertyForm onAddProperty={onAddProperty} />
        </div>

        {/* Right Hand Column: Inventory list with deleting options */}
        <div className="dashboard-inventory-container">
          <div className="inventory-header">
            <h3 className="inventory-title">Active Inventory</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {properties.length} Total Listings
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              <RefreshCw size={24} className="spinner" style={{ animation: 'spin 1s linear infinite', marginBottom: '0.5rem' }} />
              <p>Refreshing inventory...</p>
            </div>
          ) : properties.length > 0 ? (
            <div className="inventory-list">
              {properties.map((property) => (
                <div key={property._id} className="inventory-item">
                  <div className="inventory-item-details">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="inventory-item-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="inventory-item-info">
                      <h4 className="inventory-item-title">{property.title}</h4>
                      <div className="inventory-item-meta">
                        <span>{property.location}</span>
                        <span>•</span>
                        <span style={{ textTransform: 'uppercase', fontWeight: 600, color: 'var(--accent-color)' }}>
                          {property.type}
                        </span>
                        <span>•</span>
                        <span className="inventory-item-price">{formatPrice(property.price)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="inventory-item-actions">
                    <button 
                      className="btn btn-outline-danger" 
                      onClick={() => handleDeleteClick(property._id, property.title)}
                      style={{ padding: '0.5rem' }}
                      title="Delete Listing"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state" style={{ padding: '3rem 1.5rem' }}>
              <AlertCircle size={36} className="empty-icon" />
              <h4 className="empty-title">Inventory Empty</h4>
              <p className="empty-description" style={{ fontSize: '0.88rem' }}>
                There are no active properties in the database. Use the "Add Property" form to create one.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
