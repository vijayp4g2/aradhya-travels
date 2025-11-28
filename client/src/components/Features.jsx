import './Features.css';

export default function Features() {
    const features = [
        {
            icon: '🛡️',
            title: 'Verified Drivers',
            desc: 'Every driver is background-checked and professionally trained for your safety.'
        },
        {
            icon: '✨',
            title: 'Clean & Sanitized',
            desc: 'Our cars are deeply cleaned and sanitized before every trip.'
        },
        {
            icon: '⏰',
            title: 'On-Time Pickup',
            desc: 'We value your time. Guaranteed on-time pickup or your money back.'
        },
        {
            icon: '🎧',
            title: '24/7 Support',
            desc: 'Need help? Our support team is available round the clock on WhatsApp.'
        }
    ];

    return (
        <section className="features-section">
            <div className="container">
                <h2 className="section-title text-white">Why Riders Love Us</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-box">
                            <div className="feature-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
