import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <Link to="/" className="logo">
                    <div className="logo-wrapper">
                        <div className="logo-icon-wrapper">
                            <span className="logo-icon">🚗</span>
                        </div>
                        <div className="logo-text">
                            <span className="logo-name">Aradhya</span>
                            <span className="logo-tagline">Car Travels</span>
                        </div>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="main-nav desktop-nav">
                    <button onClick={() => scrollToSection('how-it-works')} className="nav-link">
                        How it Works
                    </button>
                    <button onClick={() => scrollToSection('cars')} className="nav-link">
                        Our Cars
                    </button>
                    <button onClick={() => scrollToSection('reviews')} className="nav-link">
                        Reviews
                    </button>
                    <Link to="/admin" className="nav-link">
                        Admin
                    </Link>
                    <a href="tel:7675847434" className="btn btn-call">
                        📞 Call Now
                    </a>
                    <a href="https://wa.me/7675847434" className="btn btn-whatsapp">
                        💬 WhatsApp
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Mobile Navigation */}
                <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-nav-content">
                        <button onClick={() => scrollToSection('booking-form')} className="mobile-nav-link">
                            📝 Book Now
                        </button>
                        <button onClick={() => scrollToSection('how-it-works')} className="mobile-nav-link">
                            ℹ️ How it Works
                        </button>
                        <button onClick={() => scrollToSection('cars')} className="mobile-nav-link">
                            🚗 Our Cars
                        </button>
                        <button onClick={() => scrollToSection('reviews')} className="mobile-nav-link">
                            ⭐ Reviews
                        </button>
                        <Link to="/admin" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                            👤 Admin
                        </Link>
                        <div className="mobile-nav-actions">
                            <a href="tel:7675847434" className="btn btn-call btn-block">
                                📞 Call Now
                            </a>
                            <a href="https://wa.me/7675847434" className="btn btn-whatsapp btn-block">
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="mobile-menu-overlay"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </div>
        </header>
    );
}

export default Header;
