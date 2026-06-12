import React from 'react';
import { Building2, LayoutDashboard, Home as HomeIcon } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  
  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (tabId) => {
    setActiveTab('home');
    // Allow React state to update first, then scroll to section
    setTimeout(() => {
      const element = document.getElementById(tabId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="logo-link" onClick={handleLogoClick}>
          <Building2 size={30} />
          <span>Estate</span>Hub
        </a>

        <div className="nav-links-wrapper">
          {activeTab === 'home' && (
            <ul className="nav-links">
              <li>
                <button className="nav-item" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Home
                </button>
              </li>
              <li>
                <button className="nav-item" onClick={() => handleNavClick('featured')}>
                  Featured
                </button>
              </li>
              <li>
                <button className="nav-item" onClick={() => handleNavClick('categories')}>
                  Categories
                </button>
              </li>
              <li>
                <button className="nav-item" onClick={() => handleNavClick('why-us')}>
                  Why Us
                </button>
              </li>
              <li>
                <button className="nav-item" onClick={() => handleNavClick('testimonials')}>
                  Reviews
                </button>
              </li>
              <li>
                <button className="nav-item" onClick={() => handleNavClick('insights')}>
                  Insights
                </button>
              </li>
              <li>
                <button className="nav-item" onClick={() => handleNavClick('contact')}>
                  Contact
                </button>
              </li>
            </ul>
          )}

          {activeTab === 'home' ? (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="nav-portal-btn" onClick={() => setActiveTab('admin')}>
                <LayoutDashboard size={16} />
                Admin Portal
              </button>
              <button 
                className="nav-portal-btn" 
                style={{ 
                  backgroundColor: 'transparent', 
                  border: '1.5px solid var(--secondary-color)', 
                  color: 'var(--secondary-color)' 
                }} 
                onClick={() => setActiveTab('auth')}
              >
                Sign In
              </button>
            </div>
          ) : (
            <button className="nav-portal-btn" onClick={() => setActiveTab('home')}>
              <HomeIcon size={16} />
              Back to Site
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
