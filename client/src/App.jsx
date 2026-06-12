import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import LoginSignup from './pages/LoginSignup';
import PropertyDetails from './pages/PropertyDetails';
import { Building2 } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', margin: '3rem auto', borderRadius: '12px', maxWidth: '800px', fontFamily: 'sans-serif' }}>
          <h2 style={{ marginBottom: '1rem' }}>Rendering Error Detected</h2>
          <p style={{ marginBottom: '1rem', fontWeight: 600 }}>This error was caught by the application Error Boundary:</p>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fca5a5', overflowX: 'auto', fontSize: '0.9rem', color: '#dc2626' }}>
            {this.state.error && this.state.error.toString()}
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [notification, setNotification] = useState(null); // { message: '', type: 'success' | 'info' | 'error' }

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Fetch all properties from Express API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        console.error('Failed to fetch properties from server');
      }
    } catch (error) {
      console.error('Network error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Action: Add new property listing
  const handleAddProperty = async (newPropertyData) => {
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPropertyData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Refresh properties list
        await fetchProperties();
        showNotification('Property added to verified directory successfully!', 'success');
        return { success: true, property: data };
      } else {
        return { success: false, message: data.message || 'Server returned an error' };
      }
    } catch (error) {
      console.error('Error adding property:', error);
      return { success: false, message: 'Could not connect to the server' };
    }
  };

  // Action: Delete property listing
  const handleDeleteProperty = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Refresh properties list
        await fetchProperties();
        showNotification('Property listing permanently removed from inventory.', 'success');
      } else {
        const data = await response.json();
        showNotification(data.message || 'Failed to delete listing from database', 'error');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      showNotification('Could not connect to server to delete property', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFooterLinkClick = (sectionId) => {
    setActiveTab('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="app-container">
      {/* Header Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Floating sliding custom notification */}
      {notification && (
        <div 
          className={`alert alert-${notification.type === 'error' ? 'danger' : 'success'}`} 
          style={{
            position: 'fixed',
            top: '90px',
            right: '30px',
            zIndex: 9999,
            boxShadow: 'var(--shadow-lg)',
            animation: 'slideIn 0.35s ease',
            maxWidth: '380px',
            backgroundColor: notification.type === 'error' ? '#fee2e2' : '#d1fae5',
            color: notification.type === 'error' ? '#991b1b' : '#065f46',
            border: `1px solid ${notification.type === 'error' ? '#fecaca' : '#a7f3d0'}`,
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <span>{notification.message}</span>
          <button 
            onClick={() => setNotification(null)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'inherit', 
              cursor: 'pointer', 
              fontWeight: 'bold', 
              marginLeft: '1.5rem',
              fontSize: '1.2rem',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>
      )}
      
      {/* Page Content */}
      <div style={{ flexGrow: 1 }}>
        <ErrorBoundary>
          {activeTab === 'home' && (
            <Home 
              properties={properties} 
              loading={loading} 
              setActiveTab={setActiveTab} 
              onViewDetails={(prop) => {
                setSelectedProperty(prop);
                setActiveTab('details');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
          {activeTab === 'admin' && (
            <AdminDashboard
              properties={properties}
              loading={loading}
              onAddProperty={handleAddProperty}
              onDeleteProperty={handleDeleteProperty}
            />
          )}
          {activeTab === 'auth' && (
            <LoginSignup 
              setActiveTab={setActiveTab} 
            />
          )}
          {activeTab === 'details' && (
            <PropertyDetails 
              property={selectedProperty} 
              setActiveTab={setActiveTab} 
            />
          )}
        </ErrorBoundary>
      </div>

      {/* Upgraded Premium Commercial Footer */}
      <footer className="footer-premium">
        <div className="footer-premium-grid">
          <div className="footer-col">
            <a href="#" className="logo-link" style={{ color: '#ffffff', marginBottom: '0.5rem' }} onClick={(e) => { e.preventDefault(); setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <Building2 size={28} />
              <span>Estate</span>Hub
            </a>
            <p className="footer-desc">
              EstateHub is a modern, verified real estate listing platform. We connect prospective buyers and local property managers through transparent and reliable information sheets.
            </p>
            <div className="footer-socials">
              <button className="social-icon-btn" onClick={() => showNotification('Opening Facebook link mockup...', 'success')} aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </button>
              <button className="social-icon-btn" onClick={() => showNotification('Opening Twitter link mockup...', 'success')} aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </button>
              <button className="social-icon-btn" onClick={() => showNotification('Opening LinkedIn link mockup...', 'success')} aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </button>
              <button className="social-icon-btn" onClick={() => showNotification('Opening Instagram link mockup...', 'success')} aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </button>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-list">
              <li>
                <button className="footer-link" onClick={() => handleFooterLinkClick('featured')}>
                  Featured Listings
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleFooterLinkClick('categories')}>
                  Property Categories
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleFooterLinkClick('why-us')}>
                  Why Choose Us
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleFooterLinkClick('testimonials')}>
                  Client Testimonials
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleFooterLinkClick('insights')}>
                  Tips & Insights
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Operations</h4>
            <ul className="footer-list">
              <li>
                <button className="footer-link" onClick={() => setActiveTab('admin')}>
                  Add Property Listing
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleFooterLinkClick('contact')}>
                  Get in Touch
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => showNotification('Terms and Conditions detail is a mockup for evaluation purposes.', 'success')}>
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => showNotification('Privacy policy is a mockup for evaluation purposes.', 'success')}>
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Newsletter</h4>
            <p className="footer-desc" style={{ fontSize: '0.85rem' }}>
              Subscribe to our weekly insights newsletter for early notifications on premium localized listings.
            </p>
            <form 
              className="footer-newsletter-form" 
              onSubmit={(e) => { 
                e.preventDefault(); 
                showNotification('Success! You have subscribed to the EstateHub weekly newsletter.', 'success'); 
                e.target.reset(); 
              }}
            >
              <input 
                type="email" 
                placeholder="Enter email address..." 
                className="newsletter-input" 
                required 
              />
              <button type="submit" className="newsletter-btn">Join</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © {new Date().getFullYear()} EstateHub. All rights reserved. Real Estate Listing Manager Portfolio Project.
          </p>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => showNotification('Privacy Policy detail is a mockup.', 'success')}>Privacy Policy</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }} onClick={() => showNotification('Terms of Use detail is a mockup.', 'success')}>Terms of Use</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }} onClick={() => showNotification('Sitemap detail is a mockup.', 'success')}>Sitemap</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
