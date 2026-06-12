import React from 'react';
import { MapPin, Trash2, Eye, Bed, Bath, Maximize2 } from 'lucide-react';

const PropertyCard = ({ property, isAdmin, onDelete, onViewDetails }) => {
  if (!property) return null;
  
  const { 
    _id, 
    title = 'Luxury Real Estate', 
    location = 'Contact Agent for Location', 
    price = 0, 
    type = 'House', 
    image = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', 
    description = 'No description provided.' 
  } = property;

  // Format price helper (e.g. $850,000)
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Deterministic specs based on type so we don't have to change backend MongoDB schema
  const getSpecs = (propertyType) => {
    switch (propertyType) {
      case 'Villa':
        return { beds: 5, baths: 4.5, area: '4,200 sqft' };
      case 'Apartment':
        return { beds: 2, baths: 2, area: '1,150 sqft' };
      case 'Condo':
        return { beds: 2, baths: 1.5, area: '980 sqft' };
      case 'Townhouse':
        return { beds: 3, baths: 2.5, area: '1,650 sqft' };
      case 'Land':
        return { beds: 0, baths: 0, area: '2.5 Acres' };
      case 'House':
      default:
        return { beds: 3, baths: 2, area: '1,850 sqft' };
    }
  };

  const specs = getSpecs(type);

  return (
    <div className="property-card">
      <div className="card-image-wrapper">
        <span className="type-badge">{type}</span>
        <img 
          src={image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'} 
          alt={title} 
          className="card-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>
      
      <div className="card-body">
        <div className="card-price">{formatPrice(price)}</div>
        <h3 className="card-title">{title}</h3>
        
        <div className="card-location">
          <MapPin size={16} />
          <span>{location}</span>
        </div>

        {/* Feature Icons Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          padding: '0.75rem 0', 
          borderTop: '1px solid var(--border-color)', 
          borderBottom: '1px solid var(--border-color)', 
          marginBottom: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          {type === 'Land' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', width: '100%', justifyContent: 'center' }}>
              <Maximize2 size={14} />
              <span style={{ fontWeight: 600 }}>{specs.area} Land Plot</span>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Bed size={14} />
                <span><strong style={{ color: 'var(--text-main)' }}>{specs.beds}</strong> Beds</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Bath size={14} />
                <span><strong style={{ color: 'var(--text-main)' }}>{specs.baths}</strong> Baths</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Maximize2 size={14} />
                <span><strong style={{ color: 'var(--text-main)' }}>{specs.area}</strong></span>
              </div>
            </>
          )}
        </div>
        
        <p className="card-description">{description}</p>
        
        <div className="card-footer" style={{ border: 'none', paddingTop: 0 }}>
          {isAdmin ? (
            <button 
              className="btn btn-outline-danger" 
              onClick={() => onDelete(_id)}
              style={{ width: '100%' }}
            >
              <Trash2 size={16} />
              Delete Listing
            </button>
          ) : (
            <button 
              className="btn btn-primary"
              onClick={() => onViewDetails && onViewDetails(property)}
              style={{ width: '100%' }}
            >
              <Eye size={16} />
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
