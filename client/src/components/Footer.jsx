import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-col footer-brand">
                        <h3>Aradhya Travels</h3>
                        <p className="footer-desc">
                            Your trusted partner for safe, reliable, and comfortable car rentals in Hyderabad.
                            Experience the joy of travel with our premium fleet.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link">FB</a>
                            <a href="#" className="social-link">IG</a>
                            <a href="#" className="social-link">TW</a>
                            <a href="#" className="social-link">WA</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#booking-form">Book Now</a></li>
                            <li><a href="#cars">Our Fleet</a></li>
                            <li><a href="#how-it-works">How It Works</a></li>
                            <li><a href="#reviews">Reviews</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4>Our Services</h4>
                        <ul className="footer-links">
                            <li><a href="#">Local Rentals</a></li>
                            <li><a href="#">Outstation Trips</a></li>
                            <li><a href="#">Airport Transfers</a></li>
                            <li><a href="#">Corporate Travel</a></li>
                            <li><a href="#">Wedding Cars</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-col">
                        <h4>Contact Us</h4>
                        <ul className="contact-info">
                            <li>
                                <span className="contact-icon">📞</span>
                                <a href="tel:7675847434">7675847434</a>
                            </li>
                            <li>
                                <span className="contact-icon">💬</span>
                                <a href="https://wa.me/7675847434">Chat on WhatsApp</a>
                            </li>
                            <li>
                                <span className="contact-icon">📧</span>
                                <a href="mailto:info@aradhyatravels.com">info@aradhyatravels.com</a>
                            </li>
                            <li>
                                <span className="contact-icon">📍</span>
                                <span>Hyderabad, Telangana, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">&copy; {new Date().getFullYear()} Aradhya Car Travels. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
