import './Hero.css';

function Hero() {
    return (
        <section className="hero-section">
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Book Your Car in <span className="highlight">30 Seconds</span>
                    </h1>
                    <p className="hero-subtitle">
                        Premium car rental service in Hyderabad. Safe, reliable, and affordable rides for local and outstation trips.
                    </p>
                    <div className="hero-features">
                        <div className="feature-item">
                            <span className="feature-icon">✓</span> Verified Drivers
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">✓</span> Clean Cars
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">✓</span> On-Time Pickup
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
