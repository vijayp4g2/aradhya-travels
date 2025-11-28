import { useState, useEffect } from 'react';
import './BookingForm.css';

function BookingForm({ onSubmit }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        tripType: 'One Way',
        pickup: '',
        drop: '',
        date: '',
        time: '',
        carType: 'Economy',
        passengers: 1,
        name: '',
        whatsapp: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Set default date and time
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        now.setHours(now.getHours() + 1);
        now.setMinutes(Math.ceil(now.getMinutes() / 30) * 30);
        const timeString = now.toTimeString().slice(0, 5);

        setFormData(prev => ({
            ...prev,
            date: today,
            time: timeString
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleTripTypeClick = (type) => {
        setFormData(prev => ({ ...prev, tripType: type }));
    };

    const handleQuickTime = (offset) => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + offset);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setFormData(prev => ({ ...prev, time: `${hours}:${minutes}` }));
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.pickup.trim()) newErrors.pickup = 'Pickup location is required';
            if (!formData.drop.trim()) newErrors.drop = 'Drop location is required';
        } else if (step === 2) {
            // Date and time are auto-filled, so no validation needed
        } else if (step === 3) {
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
            else if (!validatePhone(formData.whatsapp)) newErrors.whatsapp = 'Invalid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(3)) return;

        setIsSubmitting(true);

        // Submit the form
        await onSubmit(formData);

        // Reset form
        setFormData({
            tripType: 'One Way',
            pickup: '',
            drop: '',
            date: formData.date,
            time: formData.time,
            carType: 'Economy',
            passengers: 1,
            name: '',
            whatsapp: ''
        });

        setCurrentStep(1);
        setIsSubmitting(false);
    };

    const carOptions = [
        { value: 'Economy', label: 'Economy', icon: '🚗', seats: '4', price: '₹10-12/km' },
        { value: 'Sedan', label: 'Sedan', icon: '🚙', seats: '4', price: '₹12-15/km' },
        { value: 'SUV', label: 'SUV', icon: '🚐', seats: '6-7', price: '₹15-18/km' },
        { value: 'Tempo', label: 'Tempo Traveller', icon: '🚌', seats: '12+', price: '₹20-25/km' }
    ];

    return (
        <section className="booking-section" id="booking-form">
            <div className="container">
                <div className="booking-wrapper">
                    {/* Booking Header */}
                    <div className="booking-intro">
                        <h2 className="booking-title">Book Your Ride in 3 Easy Steps</h2>
                        <p className="booking-subtitle">Fill in your details and get instant confirmation on WhatsApp</p>
                    </div>

                    <div className="booking-card">
                        {/* Step Indicator */}
                        <div className="step-indicator">
                            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                                <div className="step-circle">
                                    {currentStep > 1 ? '✓' : '1'}
                                </div>
                                <div className="step-label">Trip Details</div>
                            </div>
                            <div className="step-line"></div>
                            <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                                <div className="step-circle">
                                    {currentStep > 2 ? '✓' : '2'}
                                </div>
                                <div className="step-label">Date & Car</div>
                            </div>
                            <div className="step-line"></div>
                            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                                <div className="step-circle">3</div>
                                <div className="step-label">Contact Info</div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="booking-form">
                            {/* Step 1: Trip Details */}
                            {currentStep === 1 && (
                                <div className="form-step" key="step1">
                                    <h3 className="step-title">Where are you going?</h3>

                                    {/* Trip Type */}
                                    <div className="form-group">
                                        <label className="form-label">Trip Type</label>
                                        <div className="chip-group">
                                            {['One Way', 'Round Trip', 'Local', 'Airport'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    className={`chip ${formData.tripType === type ? 'active' : ''}`}
                                                    onClick={() => handleTripTypeClick(type)}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Locations */}
                                    <div className="form-group">
                                        <label htmlFor="pickup" className="form-label">
                                            <span className="label-icon">📍</span> Pickup Location
                                        </label>
                                        <input
                                            type="text"
                                            id="pickup"
                                            name="pickup"
                                            className={`form-input ${errors.pickup ? 'error' : ''}`}
                                            placeholder="Enter your pickup location"
                                            value={formData.pickup}
                                            onChange={handleChange}
                                        />
                                        {errors.pickup && <span className="error-text">{errors.pickup}</span>}
                                        <span className="input-hint">e.g., Hitech City, Gachibowli, Airport</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="drop" className="form-label">
                                            <span className="label-icon">📍</span> Drop Location
                                        </label>
                                        <input
                                            type="text"
                                            id="drop"
                                            name="drop"
                                            className={`form-input ${errors.drop ? 'error' : ''}`}
                                            placeholder="Enter your destination"
                                            value={formData.drop}
                                            onChange={handleChange}
                                        />
                                        {errors.drop && <span className="error-text">{errors.drop}</span>}
                                        <span className="input-hint">e.g., Secunderabad, Banjara Hills, Shamshabad</span>
                                    </div>

                                    <button type="button" onClick={nextStep} className="btn btn-primary btn-block btn-lg">
                                        Continue to Date & Car →
                                    </button>
                                </div>
                            )}

                            {/* Step 2: Date, Time & Car */}
                            {currentStep === 2 && (
                                <div className="form-step" key="step2">
                                    <h3 className="step-title">When do you need the car?</h3>

                                    {/* Date & Time */}
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="date" className="form-label">
                                                <span className="label-icon">📅</span> Date
                                            </label>
                                            <input
                                                type="date"
                                                id="date"
                                                name="date"
                                                className="form-input"
                                                value={formData.date}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="time" className="form-label">
                                                <span className="label-icon">🕐</span> Time
                                            </label>
                                            <input
                                                type="time"
                                                id="time"
                                                name="time"
                                                className="form-input"
                                                value={formData.time}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Quick Time Select */}
                                    <div className="quick-time-options">
                                        <button type="button" className="time-chip" onClick={() => handleQuickTime(0)}>
                                            Now
                                        </button>
                                        <button type="button" className="time-chip" onClick={() => handleQuickTime(60)}>
                                            In 1 hr
                                        </button>
                                        <button type="button" className="time-chip" onClick={() => handleQuickTime(240)}>
                                            In 4 hrs
                                        </button>
                                        <button type="button" className="time-chip" onClick={() => handleQuickTime(720)}>
                                            Tonight
                                        </button>
                                    </div>

                                    {/* Car Type Selection */}
                                    <div className="form-group">
                                        <label className="form-label">
                                            <span className="label-icon">🚗</span> Select Car Type
                                        </label>
                                        <div className="car-selection-grid">
                                            {carOptions.map(car => (
                                                <div
                                                    key={car.value}
                                                    className={`car-option ${formData.carType === car.value ? 'selected' : ''}`}
                                                    onClick={() => setFormData(prev => ({ ...prev, carType: car.value }))}
                                                >
                                                    <div className="car-option-icon">{car.icon}</div>
                                                    <div className="car-option-name">{car.label}</div>
                                                    <div className="car-option-details">
                                                        <span className="car-seats">👥 {car.seats}</span>
                                                        <span className="car-price">{car.price}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Passengers */}
                                    <div className="form-group">
                                        <label htmlFor="passengers" className="form-label">
                                            <span className="label-icon">👥</span> Number of Passengers
                                        </label>
                                        <div className="passenger-selector">
                                            <button
                                                type="button"
                                                className="passenger-btn"
                                                onClick={() => setFormData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                id="passengers"
                                                name="passengers"
                                                className="passenger-input"
                                                value={formData.passengers}
                                                onChange={handleChange}
                                                min="1"
                                                max="20"
                                            />
                                            <button
                                                type="button"
                                                className="passenger-btn"
                                                onClick={() => setFormData(prev => ({ ...prev, passengers: Math.min(20, prev.passengers + 1) }))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-navigation">
                                        <button type="button" onClick={prevStep} className="btn btn-outline btn-lg">
                                            ← Back
                                        </button>
                                        <button type="button" onClick={nextStep} className="btn btn-primary btn-lg">
                                            Continue to Contact →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Contact Info */}
                            {currentStep === 3 && (
                                <div className="form-step" key="step3">
                                    <h3 className="step-title">Almost done! Your contact details</h3>

                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">
                                            <span className="label-icon">👤</span> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={`form-input ${errors.name ? 'error' : ''}`}
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <span className="error-text">{errors.name}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="whatsapp" className="form-label">
                                            <span className="label-icon">💬</span> WhatsApp Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="whatsapp"
                                            name="whatsapp"
                                            className={`form-input ${errors.whatsapp ? 'error' : ''}`}
                                            placeholder="10-digit mobile number"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            maxLength="10"
                                        />
                                        {errors.whatsapp && <span className="error-text">{errors.whatsapp}</span>}
                                        <span className="input-hint">We'll send booking confirmation on WhatsApp</span>
                                    </div>

                                    {/* Booking Summary */}
                                    <div className="booking-summary">
                                        <h4>Booking Summary</h4>
                                        <div className="summary-item">
                                            <span className="summary-label">Trip:</span>
                                            <span className="summary-value">{formData.tripType}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-label">Route:</span>
                                            <span className="summary-value">{formData.pickup} → {formData.drop}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-label">Date & Time:</span>
                                            <span className="summary-value">{formData.date} at {formData.time}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-label">Car:</span>
                                            <span className="summary-value">{formData.carType} ({formData.passengers} passengers)</span>
                                        </div>
                                    </div>

                                    <div className="form-navigation">
                                        <button type="button" onClick={prevStep} className="btn btn-outline btn-lg">
                                            ← Back
                                        </button>
                                        <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                                            {isSubmitting ? 'Processing...' : '💬 Book on WhatsApp'}
                                        </button>
                                    </div>

                                    <p className="form-note">
                                        🔒 No payment required now. We'll confirm fare & details on WhatsApp.
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookingForm;
