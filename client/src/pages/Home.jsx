import React, { useState, useEffect, useRef } from 'react';
import PropertyCard from '../components/PropertyCard';
import { 
  Search, Sparkles, MapPin, Users, Award, 
  ShieldCheck, Quote, Phone, Mail, Clock, 
  ArrowRight, Home as HomeIcon, CheckCircle, MessageSquare,
  Building2, X, Send, Bot, RefreshCw
} from 'lucide-react';

// Animated counter helper using requestAnimationFrame
const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const numericTarget = parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;
    if (numericTarget === 0) {
      setCount(target);
      return;
    }

    let startTimestamp = null;
    const duration = 1500; // 1.5s duration

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * numericTarget);
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericTarget);
      }
    };

    window.requestAnimationFrame(step);
  }, [target]);

  const displayCount = typeof count === 'number' ? count.toLocaleString() : count;
  return <>{displayCount}{suffix}</>;
};

// Mock testimonials data
const testimonialsData = [
  {
    rating: 5,
    text: `"Finding an oceanside villa that matches specifications without hidden broker costs was our dream. EstateHub verified listings saved us weeks of research and the advisor was extremely helpful."`,
    name: "Sarah Jenkins",
    role: "Villa Owner, Malibu",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    rating: 5,
    text: `"The search and filters are incredibly fast. We searched by location and found a condo in San Francisco within minutes. Form requests are quick and realtor responses are immediate."`,
    name: "Marcus Thompson",
    role: "Condo Resident, SOMA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    rating: 5,
    text: `"As an investor, trusted property data is paramount. Being able to review structural descriptions and verified prices online made my land acquisition in Hill Country extremely straightforward."`,
    name: "Dr. Alan Chen",
    role: "Real Estate Investor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

// Interactive testimonial carousel component
const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '750px', margin: '0 auto', padding: '1rem 0' }}>
      <div style={{ minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div 
          className="testimonial-card" 
          key={activeIndex} 
          style={{ 
            boxShadow: 'var(--shadow-md)', 
            border: '1px solid var(--border-gold)',
            background: '#ffffff', 
            padding: '2.5rem', 
            borderRadius: 'var(--radius-md)',
            animation: 'fadeIn 0.5s ease',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <Quote className="quote-icon" size={32} style={{ color: 'var(--secondary-color)', alignSelf: 'flex-start' }} />
          
          <div className="rating-stars" style={{ color: 'var(--gold-accent)', fontSize: '1.25rem' }}>
            {Array(testimonialsData[activeIndex].rating).fill(null).map((_, i) => <span key={i}>★</span>)}
          </div>
          
          <p style={{ fontStyle: 'italic', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
            {testimonialsData[activeIndex].text}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <img 
              src={testimonialsData[activeIndex].image} 
              alt={testimonialsData[activeIndex].name} 
              className="author-avatar"
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--secondary-color)' }}
            />
            <div>
              <h4 style={{ fontWeight: 700, color: 'var(--dark-bg)' }}>{testimonialsData[activeIndex].name}</h4>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{testimonialsData[activeIndex].role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', alignItems: 'center' }}>
        <button 
          onClick={prevSlide}
          className="social-icon-btn"
          style={{ width: '42px', height: '42px' }}
          aria-label="Previous review"
        >
          &larr;
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: activeIndex === index ? 'var(--secondary-color)' : '#cbd5e1',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className="social-icon-btn"
          style={{ width: '42px', height: '42px' }}
          aria-label="Next review"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

// Mock articles data
const blogArticles = {
  buying: {
    title: 'Top Tips for First-Time Home Buyers',
    category: 'Buying Guide',
    date: 'June 10, 2026',
    readTime: '5 Min Read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
    content: (
      <div className="modal-article-text">
        <p>Purchasing your first home is one of the most significant financial milestones in your life. While the process is exciting, it can also be complex and overwhelming. Here are the 4 vital steps to secure your first property stress-free:</p>
        <h4>1. Get Pre-Approved for a Mortgage</h4>
        <p>Before you begin scanning listings, consult with a mortgage broker to get pre-approved. Pre-approval gives you a clear understanding of your borrowing capacity, sets a realistic budget range, and shows sellers that you are a serious, qualified buyer.</p>
        <h4>2. Understand Your Closing Costs</h4>
        <p>Many buyers save only for the down payment, forgetting about closing fees. Expect to pay an additional 2% to 5% of the loan amount for lender fees, attorney costs, title insurance, property taxes, and home inspection audits.</p>
        <h4>3. Hire a Local Surveyor</h4>
        <p>Never buy a home without a thorough structural audit. A professional surveyor can identify hidden issues like foundation leaks, electrical glitches, and roof degradation, saving you thousands in emergency repair bills later.</p>
        <h4>4. Focus on Location and Future Value</h4>
        <p>You can renovate a house, but you cannot change its location. Evaluate localized factors like school districts, public transport access, local crime rates, and municipal development plans that will impact property value appreciation.</p>
      </div>
    )
  },
  investment: {
    title: 'Understanding Real Estate ROI Channels',
    category: 'Investment',
    date: 'May 28, 2026',
    readTime: '8 Min Read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    content: (
      <div className="modal-article-text">
        <p>Real estate remains one of the most reliable wealth-building vehicles. However, to maximize your returns, you must understand the different return-on-investment (ROI) channels available in today's economy:</p>
        <h4>1. Traditional Long-Term Rentals</h4>
        <p>Long-term leasing provides stable, predictable monthly cash flow. It is ideal for investors seeking lower risk and consistent income, though rental yields generally range between 4% and 7% annually depending on local demand.</p>
        <h4>2. Short-Term Holiday Lettings</h4>
        <p>Platforms like Airbnb allow listing properties for daily holiday rentals. This can yield 2x to 3x higher gross income compared to traditional leases, but it comes with higher vacancies, maintenance costs, and active management demands.</p>
        <h4>3. Commercial Property Leases</h4>
        <p>Investing in offices, warehouses, or retail units offers triple-net leases (NNN) where the tenant covers maintenance, insurance, and taxes. These leases are typically 5 to 10 years long, securing long-term wealth.</p>
        <h4>4. Capital Appreciation & Flipping</h4>
        <p>Flipping involves purchasing distressed properties below market value, renovating them quickly, and selling for a profit. This yields high, fast returns but requires intense industry knowledge, project management, and risk absorption.</p>
      </div>
    )
  },
  management: {
    title: 'Preventative Property Management Hacks',
    category: 'Management',
    date: 'April 15, 2026',
    readTime: '6 Min Read',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    content: (
      <div className="modal-article-text">
        <p>Property maintenance is the single largest cash-drain for landlords. Applying a preventative property management checklist can save you thousands in emergency repair fees and keep tenants happy:</p>
        <h4>1. Seasonal Drainage Audits</h4>
        <p>Clean gutters and downspouts twice a year. Water damage from blocked gutters is the leading cause of structural rot and basement flooding, costing thousands in foundation adjustments.</p>
        <h4>2. HVAC Preventative Maintenance</h4>
        <p>Schedule semi-annual servicing for heating and cooling systems. Replacing air filters every 3 months and clearing dust extends unit life by 5 to 10 years and keeps utility bills low.</p>
        <h4>3. Early Insulation Verification</h4>
        <p>Drafty doors and unsealed windows leak thermal energy. Check seals around doors and window caulking in autumn to retain warmth, lowering winter energy bills by up to 15%.</p>
        <h4>4. Prompt Tenant Communication</h4>
        <p>Encourage tenants to report minor leaks or dampness immediately. A small pipe drip can turn into a mold outbreak or floor wood-rot if left unaddressed for weeks.</p>
      </div>
    )
  }
};

const Home = ({ properties = [], loading, setActiveTab, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  
  // Custom modals state
  const [activeArticle, setActiveArticle] = useState(null);

  // Form highlighting states
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);

  // AI Chat Portal states
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      text: "Hello! I am the EstateHub AI Assistant. Ask me anything about our listings, average prices, locations, or home buying tips!", 
      sender: 'ai' 
    }
  ]);

  const chatEndRef = useRef(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiTyping]);
  
  // Contact Form local state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Buy',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Safeguard properties
  const safeProperties = Array.isArray(properties) ? properties.filter(p => p !== null && p !== undefined) : [];

  // Extract unique locations/cities dynamically
  const uniqueCities = [...new Set(safeProperties
    .filter(p => typeof p.location === 'string')
    .map(p => {
      const parts = p.location.split(',');
      return parts.length > 1 ? parts[parts.length - 2].trim() : p.location.trim();
    })
  )];

  // Filter properties
  const filteredProperties = safeProperties.filter((property) => {
    if (typeof property.location !== 'string') return false;
    const matchesLocation = property.location
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
      
    const matchesType = selectedType === 'All' || property.type === selectedType;
    
    return matchesLocation && matchesType;
  });

  // Featured Properties: Grab top 3 listings with highest prices
  const featuredProperties = [...safeProperties]
    .filter(p => typeof p.price === 'number')
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);

  // Category counts
  const getCategoryCount = (type) => {
    return safeProperties.filter(p => p.type === type).length;
  };

  const handleCategoryClick = (type) => {
    setSelectedType(type);
    const listElement = document.getElementById('property-listings');
    if (listElement) {
      listElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const listElement = document.getElementById('property-listings');
    if (listElement) {
      listElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setFormError('Please fill in Name, Email, and Message.');
      return;
    }
    
    if (!contactForm.email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormError('');
    setFormSubmitted(true);
    setContactForm({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'Buy',
      message: ''
    });
    
    setTimeout(() => {
      setFormSubmitted(false);
    }, 4000);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Open Blog Article
  const handleOpenArticle = (articleId) => {
    const article = blogArticles[articleId];
    if (article) {
      setActiveArticle(article);
    }
  };

  // AI Chat message sender
  const handleSendAiMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setChatInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      const lowerMsg = userMsg.toLowerCase();
      let response = "";

      // 1. Calculate Average Price
      if (lowerMsg.includes('average') || lowerMsg.includes('mean price') || lowerMsg.includes('how much cost')) {
        const prices = safeProperties.map(p => p.price).filter(price => typeof price === 'number');
        if (prices.length > 0) {
          const avg = prices.reduce((sum, val) => sum + val, 0) / prices.length;
          const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(avg);
          response = `Based on our current database, the average listing price of properties on EstateHub is ${formatted}. Let me know if you would like me to list details of any specific type!`;
        } else {
          response = "We currently have no property pricing records to compute an average. Please use the Admin Portal to add a property listing.";
        }
      } 
      // 2. Count listings
      else if (lowerMsg.includes('how many properties') || lowerMsg.includes('total properties') || lowerMsg.includes('total listings') || lowerMsg.includes('how many listings') || lowerMsg.includes('how many homes')) {
        response = `We currently have ${safeProperties.length} active verified properties listed in our database. You can search them by location or filter by categories like Villas, Apartments, Condos, or Land!`;
      } 
      // 3. Category search: Villa
      else if (lowerMsg.includes('villa') || lowerMsg.includes('villas')) {
        const count = getCategoryCount('Villa');
        const list = safeProperties.filter(p => p.type === 'Villa').map(p => `"${p.title}" in ${p.location}`).join(', ');
        response = `We have ${count} Luxury Villa(s) available. ${count > 0 ? `These include: ${list}.` : "You can add new villas in the Admin Portal!"}`;
      } 
      // 4. Category search: Apartment
      else if (lowerMsg.includes('apartment') || lowerMsg.includes('apartments')) {
        const count = getCategoryCount('Apartment');
        const list = safeProperties.filter(p => p.type === 'Apartment').map(p => `"${p.title}" in ${p.location}`).join(', ');
        response = `We have ${count} Apartment(s) listed. ${count > 0 ? `These include: ${list}.` : "Use the Admin Portal to list apartments."}`;
      } 
      // 5. Category search: House
      else if (lowerMsg.includes('house') || lowerMsg.includes('houses') || lowerMsg.includes('independent house')) {
        const count = getCategoryCount('House');
        const list = safeProperties.filter(p => p.type === 'House').map(p => `"${p.title}" in ${p.location}`).join(', ');
        response = `We have ${count} Independent House(s) listed. ${count > 0 ? `These include: ${list}.` : "You can add new homes using the Admin form."}`;
      } 
      // 6. Category search: Condo
      else if (lowerMsg.includes('condo') || lowerMsg.includes('condos') || lowerMsg.includes('condominium')) {
        const count = getCategoryCount('Condo');
        const list = safeProperties.filter(p => p.type === 'Condo').map(p => `"${p.title}" in ${p.location}`).join(', ');
        response = `We have ${count} Condominium(s) listed. ${count > 0 ? `These include: ${list}.` : "Feel free to add a new Condo listing."}`;
      } 
      // 7. Category search: Land
      else if (lowerMsg.includes('land') || lowerMsg.includes('plot') || lowerMsg.includes('plots')) {
        const count = getCategoryCount('Land');
        const list = safeProperties.filter(p => p.type === 'Land').map(p => `"${p.title}" in ${p.location}`).join(', ');
        response = `We have ${count} Land Plot(s) listed. ${count > 0 ? `These include: ${list}.` : "You can add plots of land from the Admin form."}`;
      } 
      // 8. Location queries
      else if (lowerMsg.includes('malibu')) {
        const matches = safeProperties.filter(p => p.location.toLowerCase().includes('malibu'));
        response = matches.length > 0 
          ? `Yes, in Malibu we have: ${matches.map(p => `"${p.title}" for $${p.price.toLocaleString()}`).join(', ')}.`
          : "We do not have any properties listed in Malibu at the moment. You can add one via the Admin dashboard!";
      } 
      else if (lowerMsg.includes('austin')) {
        const matches = safeProperties.filter(p => p.location.toLowerCase().includes('austin'));
        response = matches.length > 0 
          ? `In Austin, we have: ${matches.map(p => `"${p.title}" starting at $${p.price.toLocaleString()}`).join(', ')}.`
          : "We currently do not have listings in Austin. Add one in the Admin dashboard!";
      } 
      else if (lowerMsg.includes('new york') || lowerMsg.includes('manhattan') || lowerMsg.includes('nyc')) {
        const matches = safeProperties.filter(p => p.location.toLowerCase().includes('new york') || p.location.toLowerCase().includes('manhattan'));
        response = matches.length > 0 
          ? `In New York, we have: ${matches.map(p => `"${p.title}" listed at $${p.price.toLocaleString()}`).join(', ')}.`
          : "No New York properties found in active inventory. List one using the Admin dashboard!";
      } 
      // 9. Operations queries (Help/Listings)
      else if (lowerMsg.includes('list') || lowerMsg.includes('add') || lowerMsg.includes('sell') || lowerMsg.includes('upload')) {
        response = "To list your property with EstateHub, scroll to the top of the page and click the 'Admin Portal' button in the navbar. Fill out the Add Property form, and it will appear on the Home page immediately!";
      } 
      else if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email') || lowerMsg.includes('office')) {
        response = "You can contact our advisory team by calling +1 (800) 555-0199 or emailing advisors@estatehub.com. You can also write your details in the contact form at the bottom of this page.";
      } 
      else if (lowerMsg.includes('tips') || lowerMsg.includes('buy') || lowerMsg.includes('invest') || lowerMsg.includes('management')) {
        response = "For buying tips, investment ROI strategies, or property management hacks, please check out the 'Real Estate Tips & Insights' section on the homepage. Click 'Read Article' on any blog card to read the complete article!";
      } 
      // 10. Greetings
      else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey') || lowerMsg.includes('greetings')) {
        response = "Hello! I am ready to assist you. Ask me about average pricing, counts of specific property types, list instructions, or how to contact our agents.";
      } 
      // 11. Fallback
      else {
        response = "I'm here to help you navigate EstateHub! You can ask me questions like: 'What is the average price?', 'How many properties are listed?', 'Do you have villas?', 'How do I list a house?', or 'Where is your office?'";
      }

      setChatMessages(prev => [...prev, { text: response, sender: 'ai' }]);
      setIsAiTyping(false);
    }, 1000);
  };

  return (
    <div>
      {/* 1. UPGRADED PREMIUM HERO SECTION */}
      <section className="hero-section-premium">
        <div className="hero-premium-content">
          <span className="hero-premium-badge">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} />
            EstateHub Real Estate
          </span>
          <h1 className="hero-premium-title">
            Find Your <span>Dream Property</span>
          </h1>
          <p className="hero-premium-subtitle">
            Discover modern apartments, beachside villas, suburban family homes, and scenic land plots. Browse verified listings managed by industry professionals.
          </p>
          <div className="hero-premium-ctas">
            <button className="btn btn-primary" onClick={() => document.getElementById('property-listings').scrollIntoView({ behavior: 'smooth' })}>
              Browse Listings
            </button>
            <button className="btn btn-outline-white" onClick={() => setActiveTab('admin')}>
              List Your Property
            </button>
          </div>
        </div>
      </section>

      {/* Hero Integrated Search Widget */}
      <div className="search-widget-wrapper">
        <form onSubmit={handleSearchSubmit}>
          <div className="search-widget-container">
            <div className="search-widget-input-wrapper">
              <Search className="search-widget-icon" size={20} />
              <input
                type="text"
                className="search-widget-input"
                placeholder="Enter city, state, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search-widget-input-wrapper">
              <HomeIcon className="search-widget-icon" size={20} />
              <select
                className="search-widget-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Property Types</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Land">Land Plot</option>
              </select>
            </div>
            <button type="submit" className="search-widget-btn">
              <Search size={18} />
              Search
            </button>
          </div>
        </form>
      </div>

      {/* 2. PROPERTY STATISTICS SECTION WITH ANIMATED COUNTERS */}
      <section className="section-padding">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">
                <AnimatedCounter target={safeProperties.length || 6} />
              </div>
              <div className="stat-label">Total Properties</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                <AnimatedCounter target={uniqueCities.length || 6} suffix="+" />
              </div>
              <div className="stat-label">Cities Covered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                <AnimatedCounter target={4800} suffix="+" />
              </div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                <AnimatedCounter target={1250} suffix="+" />
              </div>
              <div className="stat-label">Properties Sold</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES SECTION */}
      <section id="featured" className="section-padding section-bg-white">
        <div className="section-container">
          <div className="featured-grid-header">
            <div className="section-title-block">
              <span className="section-subtitle">Exquisite Living</span>
              <h2 className="section-main-title">Featured Listings</h2>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={() => { setSelectedType('All'); document.getElementById('property-listings').scrollIntoView({ behavior: 'smooth' }); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              View All Properties
              <ArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              <p>Loading featured properties...</p>
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="featured-grid">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={`featured-${property._id}`}
                  property={property}
                  isAdmin={false}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
              <p>No listings currently available.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. PROPERTY CATEGORIES SECTION */}
      <section id="categories" className="section-padding">
        <div className="section-container">
          <div className="section-title-block">
            <span className="section-subtitle">Diverse Portfolios</span>
            <h2 className="section-main-title">Browse by Category</h2>
          </div>

          <div className="categories-grid">
            <div className={`category-card ${selectedType === 'Apartment' ? 'active' : ''}`} onClick={() => handleCategoryClick('Apartment')}>
              <div className="category-icon-wrapper">
                <HomeIcon size={24} />
              </div>
              <h4 className="category-title">Apartments</h4>
              <span className="category-count">{getCategoryCount('Apartment')} Listings</span>
            </div>

            <div className={`category-card ${selectedType === 'Villa' ? 'active' : ''}`} onClick={() => handleCategoryClick('Villa')}>
              <div className="category-icon-wrapper">
                <Sparkles size={24} />
              </div>
              <h4 className="category-title">Luxury Villas</h4>
              <span className="category-count">{getCategoryCount('Villa')} Listings</span>
            </div>

            <div className={`category-card ${selectedType === 'House' ? 'active' : ''}`} onClick={() => handleCategoryClick('House')}>
              <div className="category-icon-wrapper">
                <Award size={24} />
              </div>
              <h4 className="category-title">Houses</h4>
              <span className="category-count">{getCategoryCount('House')} Listings</span>
            </div>

            <div className={`category-card ${selectedType === 'Condo' ? 'active' : ''}`} onClick={() => handleCategoryClick('Condo')}>
              <div className="category-icon-wrapper">
                <Building2 size={24} />
              </div>
              <h4 className="category-title">Condominiums</h4>
              <span className="category-count">{getCategoryCount('Condo')} Listings</span>
            </div>

            <div className={`category-card ${selectedType === 'Land' ? 'active' : ''}`} onClick={() => handleCategoryClick('Land')}>
              <div className="category-icon-wrapper">
                <MapPin size={24} />
              </div>
              <h4 className="category-title">Scenic Land</h4>
              <span className="category-count">{getCategoryCount('Land')} Listings</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE ESTATEHUB SECTION */}
      <section id="why-us" className="section-padding section-bg-white">
        <div className="section-container">
          <div className="section-title-block">
            <span className="section-subtitle">Our Guarantee</span>
            <h2 className="section-main-title">Why Choose EstateHub</h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon-box">
                <ShieldCheck size={26} />
              </div>
              <h4 className="benefit-title">Verified Listings</h4>
              <p className="benefit-description">
                Every single property listed on EstateHub goes through a rigorous manual review process to guarantee authentic pricing and real media.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)' }}>
                <Award size={26} />
              </div>
              <h4 className="benefit-title">Trusted Information</h4>
              <p className="benefit-description">
                We pull official town registrar files and structural documents so you receive completely factual, non-biased information sheets.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-color)' }}>
                <Search size={26} />
              </div>
              <h4 className="benefit-title">Easy Search Experience</h4>
              <p className="benefit-description">
                Our lightweight, responsive search mechanics allow filtering properties instantly without complex form pages or load delays.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box" style={{ backgroundColor: 'rgba(15, 23, 42, 0.08)', color: 'var(--dark-bg)' }}>
                <Users size={26} />
              </div>
              <h4 className="benefit-title">Professional Management</h4>
              <p className="benefit-description">
                Our administrators work directly with localized realtors to handle viewings, paperwork, legal verification, and final handovers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SEARCH RESULTS LISTING VIEW */}
      <section id="property-listings" className="section-padding" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-container">
          <div className="section-header">
            <div className="section-title-block" style={{ textAlign: 'left', marginBottom: 0 }}>
              <span className="section-subtitle">Real-time Catalog</span>
              <h2 className="section-main-title">All Property Listings</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {selectedType !== 'All' && (
                <button 
                  className="btn" 
                  onClick={() => setSelectedType('All')}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', backgroundColor: 'var(--border-color)', borderRadius: '50px' }}
                >
                  Clear Type: {selectedType} ×
                </button>
              )}
              {searchTerm && (
                <button 
                  className="btn" 
                  onClick={() => setSearchTerm('')}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', backgroundColor: 'var(--border-color)', borderRadius: '50px' }}
                >
                  Clear Search ×
                </button>
              )}
              <span className="results-count">
                {loading ? 'Loading...' : `${filteredProperties.length} Matches`}
              </span>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
              <div className="spinner" style={{
                width: '45px',
                height: '45px',
                border: '4px solid rgba(37, 99, 235, 0.1)',
                borderTopColor: 'var(--primary-color)',
                borderRadius: '50%',
                margin: '0 auto 1.5rem auto',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p>Refreshing active listing database...</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  isAdmin={false}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <HomeIcon size={48} className="empty-icon" />
              <h3 className="empty-title">No listings match selection</h3>
              <p className="empty-description">
                We couldn't locate active property items in "{searchTerm || 'selected areas'}" matching type "{selectedType}". Try selecting "All Property Types" or clearing search queries.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS SECTION WITH CAROUSEL */}
      <section id="testimonials" className="section-padding section-bg-white">
        <div className="section-container">
          <div className="section-title-block">
            <span className="section-subtitle">Real Stories</span>
            <h2 className="section-main-title">What Our Customers Say</h2>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* 7. REAL ESTATE TIPS & INSIGHTS (BLOG SECTION) */}
      <section id="insights" className="section-padding">
        <div className="section-container">
          <div className="section-title-block">
            <span className="section-subtitle">Resource Center</span>
            <h2 className="section-main-title">Real Estate Tips & Insights</h2>
          </div>

          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-image-wrapper">
                <span className="blog-category-badge">Buying Guide</span>
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" 
                  alt="Home Buying Tips" 
                  className="blog-image"
                />
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span>June 10, 2026</span>
                  <span>•</span>
                  <span>5 Min Read</span>
                </div>
                <h3 className="blog-title" onClick={() => handleOpenArticle('buying')}>
                  Top Tips for First-Time Home Buyers
                </h3>
                <p className="blog-excerpt">
                  Navigating mortgage pre-approvals, inspection checks, and closing costs can be overwhelming. Learn the 4 vital steps to secure your first property stress-free.
                </p>
                <button className="blog-readmore" onClick={() => handleOpenArticle('buying')}>
                  Read Article <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="blog-card">
              <div className="blog-image-wrapper">
                <span className="blog-category-badge">Investment</span>
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" 
                  alt="Investment Tips" 
                  className="blog-image"
                />
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span>May 28, 2026</span>
                  <span>•</span>
                  <span>8 Min Read</span>
                </div>
                <h3 className="blog-title" onClick={() => handleOpenArticle('investment')}>
                  Understanding Real Estate ROI Channels
                </h3>
                <p className="blog-excerpt">
                  Compare traditional long-term rentals with commercial leases and holiday lettings to understand yield ratios and property appreciation charts in today's economy.
                </p>
                <button className="blog-readmore" onClick={() => handleOpenArticle('investment')}>
                  Read Article <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="blog-card">
              <div className="blog-image-wrapper">
                <span className="blog-category-badge">Management</span>
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" 
                  alt="Property Management Tips" 
                  className="blog-image"
                />
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span>April 15, 2026</span>
                  <span>•</span>
                  <span>6 Min Read</span>
                </div>
                <h3 className="blog-title" onClick={() => handleOpenArticle('management')}>
                  Preventative Property Management Hacks
                </h3>
                <p className="blog-excerpt">
                  Save thousands in maintenance bills by applying seasonal inspection schedules. Check structural drainage, insulation leaks, and electrical systems before they cause emergencies.
                </p>
                <button className="blog-readmore" onClick={() => handleOpenArticle('management')}>
                  Read Article <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION WITH FLOATING LABELS */}
      <section id="contact" className="section-padding section-bg-white">
        <div className="section-container">
          <div className="contact-grid-container">
            
            {/* Left Column: Contact details */}
            <div className="contact-info-block">
              <div>
                <span className="section-subtitle">Get In Touch</span>
                <h2 className="section-main-title" style={{ marginBottom: '1rem' }}>Contact Our Real Estate Advisory Team</h2>
                <p className="contact-header-subtitle">
                  Have inquiries about a listing or want to register property under professional management? Send a message or call our support lines.
                </p>
              </div>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 className="contact-detail-title">Phone Number</h5>
                    <p className="contact-detail-text">+1 (800) 555-0199</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h5 className="contact-detail-title">Corporate Email</h5>
                    <p className="contact-detail-text">advisors@estatehub.com</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="contact-detail-title">HQ Office</h5>
                    <p className="contact-detail-text">500 Madison Avenue, 18th Floor, New York, NY 10022</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h5 className="contact-detail-title">Operating Hours</h5>
                    <p className="contact-detail-text">Mon - Sat: 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form Card */}
            <div className={`contact-form-card ${isFormHighlighted ? 'contact-form-highlight' : ''}`} id="contact-form-card-element">
              <h3 className="contact-form-title">Send An Inquiry</h3>
              
              {formError && <div className="alert alert-danger">{formError}</div>}
              {formSubmitted && (
                <div className="alert alert-success">
                  <CheckCircle size={18} />
                  Inquiry sent! Our advisors will review and reach out within 24 hours.
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                {/* Floating group Name */}
                <div className="floating-group">
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className="floating-input"
                    placeholder=" "
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                  />
                  <span className="floating-label">Full Name</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                  {/* Floating group Email */}
                  <div className="floating-group">
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className="floating-input"
                      placeholder=" "
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                    />
                    <span className="floating-label">Email Address</span>
                  </div>

                  {/* Floating group Inquiry Type */}
                  <div className="floating-group">
                    <select
                      id="contact-inquiryType"
                      name="inquiryType"
                      className="floating-select"
                      value={contactForm.inquiryType}
                      onChange={handleContactChange}
                      required
                    >
                      <option value="Buy">Buying Property</option>
                      <option value="Sell">Listing/Selling</option>
                      <option value="General">General Inquiry</option>
                    </select>
                    <span className="floating-label">Inquiry Type</span>
                  </div>
                </div>

                {/* Floating group Phone */}
                <div className="floating-group">
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    className="floating-input"
                    placeholder=" "
                    value={contactForm.phone}
                    onChange={handleContactChange}
                  />
                  <span className="floating-label">Phone Number (Optional)</span>
                </div>

                {/* Floating group Message */}
                <div className="floating-group">
                  <textarea
                    id="contact-message"
                    name="message"
                    className="floating-input floating-textarea"
                    placeholder=" "
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                  ></textarea>
                  <span className="floating-label" style={{ top: '1.2rem' }}>Message Details</span>
                </div>

                <button type="submit" className="btn btn-primary submit-btn" style={{ width: '100%' }}>
                  <MessageSquare size={16} />
                  Submit Inquiry
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* --- FLOATING AI ASSISTANT PORTAL WIDGET --- */}
      <div>
        {/* Toggle Button */}
        <button 
          className="ai-portal-bubble" 
          onClick={() => setIsAiOpen(!isAiOpen)}
          aria-label="Toggle AI Assistant"
        >
          {isAiOpen ? <X size={26} /> : <Bot size={26} />}
        </button>

        {/* Chat Window */}
        {isAiOpen && (
          <div className="ai-portal-window">
            <div className="ai-chat-titlebar">
              <div className="ai-chat-title-info">
                <span className="ai-status-indicator"></span>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.3px' }}>EstateHub AI Advisor</span>
              </div>
              <button className="ai-chat-close-btn" onClick={() => setIsAiOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="ai-chat-message-feed">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}
                >
                  {msg.text}
                </div>
              ))}
              {isAiTyping && (
                <div className="chat-bubble chat-bubble-typing">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendAiMessage} className="ai-chat-form">
              <input 
                type="text" 
                className="ai-chat-form-input" 
                placeholder="Ask average price, count listings, tips..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isAiTyping}
              />
              <button type="submit" className="ai-chat-send-btn" disabled={isAiTyping || !chatInput.trim()}>
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* --- CUSTOM ARTICLE MODAL READER --- */}
      {activeArticle && (
        <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title-text">{activeArticle.title}</h3>
              <button className="modal-close-icon" onClick={() => setActiveArticle(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <img src={activeArticle.image} alt={activeArticle.title} className="modal-article-img" />
              <div className="modal-article-meta">
                <span>{activeArticle.category}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
              {activeArticle.content}
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setActiveArticle(null)}>
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
