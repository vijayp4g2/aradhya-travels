import './HowItWorks.css';

export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            icon: '📍',
            title: 'Choose Your Trip',
            desc: 'Select your trip type, pickup location, and destination. We cover local, outstation, and airport transfers.'
        },
        {
            number: 2,
            icon: '🚗',
            title: 'Select Car & Time',
            desc: 'Pick the perfect car for your needs and schedule your pickup time. We have options for every budget.'
        },
        {
            number: 3,
            icon: '💬',
            title: 'Get Confirmation',
            desc: 'Receive instant fare details and booking confirmation directly on WhatsApp. No upfront payment needed.'
        }
    ];

    return (
        <section id="how-it-works" className="how-it-works-section">
            <div className="container">
                <h2 className="section-title">How It Works</h2>
                <div className="steps-container">
                    <div className="steps-grid">
                        {steps.map((step) => (
                            <div key={step.number} className="step-card">
                                <div className="step-number">{step.number}</div>
                                <div className="step-icon-wrapper">
                                    {step.icon}
                                </div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
