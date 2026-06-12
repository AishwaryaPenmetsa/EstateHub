import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Bed, Bath, Maximize2, 
  Calendar, Tag, Mail, Phone, Send, ShieldCheck 
} from 'lucide-react';

const PropertyDetails = ({ property, setActiveTab }) => {
  if (!property) return null;

  const {
    title = 'Luxury Real Estate',
    location = 'Contact Agent for Location',
    price = 0,
    type = 'House',
    image = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    description = 'No description provided.'
  } = property;

  // Detemine specs deterministically based on type to keep MongoDB schema unaltered
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

  // Format Price
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Gallery images list: first is primary, others are mock interiors/exteriors
  const galleryImages = [
    image,
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', // Living Room
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', // Bathroom/Kitchen
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'  // Bedroom
  ];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [advisorForm, setAdvisorForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hello! I would like to receive additional details regarding "${title}" at ${location}. Please coordinate a virtual tour or advisor inspection. Thank you.`
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvisorForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!advisorForm.name.trim() || !advisorForm.email.trim() || !advisorForm.message.trim()) {
      setErrorMsg('Please fill out Name, Email, and Message.');
      return;
    }
    if (!advisorForm.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);
    setAdvisorForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="details-page-container">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Navigation Breadcrumb */}
        <button 
          onClick={() => setActiveTab('home')} 
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: '2rem',
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--secondary-color)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
        >
          <ArrowLeft size={16} />
          Back to Listings
        </button>

        {/* Details Grid Layout */}
        <div className="details-grid">
          {/* Main Content (Left Column) */}
          <div className="details-gallery">
            <div className="details-main-img-wrapper">
              <img 
                src={activeImage} 
                alt={title} 
                className="details-main-img" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="details-thumbnails-grid">
              {galleryImages.map((imgUrl, index) => (
                <button 
                  key={index} 
                  className={`details-thumb-wrapper ${activeImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setActiveImage(imgUrl)}
                >
                  <img 
                    src={imgUrl} 
                    alt={`${title} view ${index + 1}`} 
                    className="details-thumb-img" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </button>
              ))}
            </div>

            {/* General Description Card */}
            <div className="details-main-info" style={{ marginTop: '1.5rem' }}>
              <div className="details-price-title-row">
                <div>
                  <h1 className="details-title">{title}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                    <MapPin size={16} className="text-secondary" style={{ color: 'var(--secondary-color)' }} />
                    <span>{location}</span>
                  </div>
                </div>
                <div className="details-price">{formatPrice(price)}</div>
              </div>

              {/* Specs Bar */}
              <div className="details-meta-specs">
                {type === 'Land' ? (
                  <div className="details-spec-item" style={{ gridColumn: 'span 3', justifyContent: 'center' }}>
                    <div className="details-spec-icon-box">
                      <Maximize2 size={18} />
                    </div>
                    <div className="details-spec-info">
                      <span className="details-spec-value">{specs.area}</span>
                      <span className="details-spec-label">Land Area</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="details-spec-item">
                      <div className="details-spec-icon-box">
                        <Bed size={18} />
                      </div>
                      <div className="details-spec-info">
                        <span className="details-spec-value">{specs.beds}</span>
                        <span className="details-spec-label">Bedrooms</span>
                      </div>
                    </div>

                    <div className="details-spec-item">
                      <div className="details-spec-icon-box">
                        <Bath size={18} />
                      </div>
                      <div className="details-spec-info">
                        <span className="details-spec-value">{specs.baths}</span>
                        <span className="details-spec-label">Bathrooms</span>
                      </div>
                    </div>

                    <div className="details-spec-item">
                      <div className="details-spec-icon-box">
                        <Maximize2 size={18} />
                      </div>
                      <div className="details-spec-info">
                        <span className="details-spec-value">{specs.area}</span>
                        <span className="details-spec-label">Living Area</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Description Block */}
              <div className="details-description-block">
                <h3 className="details-section-title">Property Description</h3>
                <p className="details-description-text">{description}</p>
              </div>

              {/* Additional Property Facts */}
              <div className="details-description-block" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h3 className="details-section-title" style={{ marginBottom: '1rem' }}>Property Overview</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Tag size={16} /> <strong>Property Type:</strong> <span style={{ color: 'var(--text-main)' }}>{type}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Calendar size={16} /> <strong>Status:</strong> <span style={{ color: 'var(--text-main)' }}>Active Listing</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <ShieldCheck size={16} /> <strong>Verification:</strong> <span style={{ color: 'var(--text-main)' }}>100% EstateHub Verified</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Maximize2 size={16} /> <strong>MLS ID:</strong> <span style={{ color: 'var(--text-main)' }}>EH-{(property._id || '0000').substring(0, 8).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advisor Card Sidebar (Right Column) */}
          <div className="details-sidebar">
            <div className="details-advisor-card">
              <div className="advisor-info">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80" 
                  alt="Alexander Vance" 
                  className="advisor-avatar"
                />
                <div>
                  <h4 className="advisor-name">Alexander Vance</h4>
                  <span className="advisor-title">Senior Wealth Broker</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} style={{ color: 'var(--secondary-color)' }} />
                  <span>+1 (800) 555-0199</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} style={{ color: 'var(--secondary-color)' }} />
                  <span>a.vance@estatehub.com</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '0.25rem' }}>
                <h5 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--dark-bg)' }}>Request Tour / Details</h5>

                {isSubmitted && (
                  <div className="alert alert-success" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <ShieldCheck size={16} />
                    <span>Inquiry sent! Alexander Vance will reach out shortly.</span>
                  </div>
                )}

                {errorMsg && (
                  <div className="alert alert-danger" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit}>
                  {/* Floating Form Group Name */}
                  <div className="floating-group">
                    <input 
                      type="text" 
                      name="name" 
                      className="floating-input"
                      placeholder=" "
                      value={advisorForm.name}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="floating-label" style={{ left: '1rem' }}>Your Name</span>
                  </div>

                  {/* Floating Form Group Email */}
                  <div className="floating-group">
                    <input 
                      type="email" 
                      name="email" 
                      className="floating-input"
                      placeholder=" "
                      value={advisorForm.email}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="floating-label" style={{ left: '1rem' }}>Your Email</span>
                  </div>

                  {/* Floating Form Group Message */}
                  <div className="floating-group">
                    <textarea 
                      name="message" 
                      className="floating-input floating-textarea"
                      placeholder=" "
                      value={advisorForm.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                    <span className="floating-label" style={{ left: '1rem', top: '1.2rem' }}>Message Detail</span>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary details-advisor-btn"
                    disabled={isSubmitted}
                  >
                    <Send size={16} />
                    Contact Advisor
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
