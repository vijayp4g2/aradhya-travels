import { useState } from 'react';
import axios from 'axios';
import BookingForm from '../components/BookingForm';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import CarTypes from '../components/CarTypes';
import Features from '../components/Features';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import './Home.css';

const API_URL = 'http://localhost:5000/api';

function Home() {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBooking = async (bookingData) => {
        // 1. Format Date for better readability (e.g., "Fri, 28 Nov 2025")
        const dateObj = new Date(bookingData.date);
        const formattedDate = dateObj.toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        // 2. Construct the Premium WhatsApp Message
        const message = `*🚖 New Booking Request - Aradhya Travels*

*👤 Customer Details*
Name: *${bookingData.name}*
Mobile: *${bookingData.whatsapp}*

*📍 Trip Details*
Type: *${bookingData.tripType}*
From: *${bookingData.pickup}*
To:   *${bookingData.drop}*

*📅 Schedule*
Date: *${formattedDate}*
Time: *${bookingData.time}*

*🚗 Vehicle Preference*
Car:  *${bookingData.carType}*
Pax:  *${bookingData.passengers}*

_Please confirm availability and fare._`;

        const phoneNumber = '7675847434';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        try {
            // 3. Try to save to database (Backend)
            await axios.post(`${API_URL}/bookings`, bookingData);

            // Success: Database + WhatsApp
            setShowSuccess(true);

        } catch (error) {
            // 4. Fallback: If Backend fails, STILL open WhatsApp
            console.error('Backend save failed, proceeding to WhatsApp fallback:', error);
            // We don't show an error to the user, we just ensure they get to WhatsApp
            setShowSuccess(true); // Show success anyway because WhatsApp will open
        }

        // 5. Always redirect to WhatsApp (Critical Path)
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            setShowSuccess(false);
        }, 1500); // Small delay to show the success toast
    };

    return (
        <div className="home">
            <Header />
            <Hero />
            <BookingForm onSubmit={handleBooking} />
            <HowItWorks />
            <CarTypes />
            <Features />
            <Reviews />
            <Footer />

            {showSuccess && (
                <div className="success-toast">
                    ✅ Booking created! Redirecting to WhatsApp...
                </div>
            )}
        </div>
    );
}

export default Home;
