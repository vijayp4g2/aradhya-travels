import './CarTypes.css';

export default function CarTypes() {
    const cars = [
        { name: 'Economy', icon: '🚗', seats: 4, desc: 'Compact & Efficient for city rides' },
        { name: 'Sedan', icon: '🚙', seats: 4, desc: 'Premium comfort for long journeys' },
        { name: 'SUV', icon: '🚐', seats: '6-7', desc: 'Spacious for families & luggage' },
        { name: 'Tempo', icon: '🚌', seats: '12+', desc: 'Perfect for large group tours' }
    ];

    return (
        <section id="cars" className="car-types-section">
            <div className="container">
                <h2 className="section-title">Choose Your Ride</h2>
                <div className="cars-grid">
                    {cars.map(car => (
                        <div key={car.name} className="car-card">
                            <div className="car-icon-wrapper">
                                {car.icon}
                            </div>
                            <h3 className="car-title">{car.name}</h3>
                            <p className="car-desc">{car.desc}</p>
                            <ul className="car-features">
                                <li>
                                    <span className="feature-icon">🪑</span> {car.seats} Comfortable Seats
                                </li>
                                <li>
                                    <span className="feature-icon">❄️</span> AC & Music System
                                </li>
                                <li>
                                    <span className="feature-icon">🛡️</span> Clean & Sanitized
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
