import './Reviews.css';

export default function Reviews() {
    const reviews = [
        {
            text: "Excellent service! The driver was on time and the car was very clean. Highly recommended for family trips.",
            author: "Rajesh Kumar",
            type: "Family Trip"
        },
        {
            text: "Booking was so easy. Just a few clicks and done. Very professional team and transparent pricing.",
            author: "Priya Sharma",
            type: "Airport Transfer"
        },
        {
            text: "Used their service for an outstation trip to Srisailam. Smooth ride and the driver was very polite.",
            author: "Amit Varma",
            type: "Outstation"
        }
    ];

    return (
        <section id="reviews" className="reviews-section">
            <div className="container">
                <h2 className="section-title">Happy Customers</h2>
                <div className="reviews-grid">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="review-card">
                            <div className="quote-icon">"</div>
                            <div className="stars">⭐⭐⭐⭐⭐</div>
                            <p className="review-text">{review.text}</p>
                            <div className="reviewer-info">
                                <div className="reviewer-avatar">
                                    {review.author.charAt(0)}
                                </div>
                                <div className="reviewer-details">
                                    <span className="reviewer-name">{review.author}</span>
                                    <span className="reviewer-type">{review.type}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
