import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const API_URL = 'http://localhost:5000/api';

function Admin() {
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0 });
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setRefreshing(true);
        await Promise.all([fetchBookings(), fetchStats()]);
        setRefreshing(false);
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${API_URL}/bookings`);
            setBookings(response.data.bookings);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_URL}/stats`);
            setStats(response.data.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(`${API_URL}/bookings/${id}`, { status });
            fetchBookings();
            fetchStats();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const deleteBooking = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await axios.delete(`${API_URL}/bookings/${id}`);
                fetchBookings();
                fetchStats();
            } catch (error) {
                console.error('Error deleting booking:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="admin-page">
            {/* Header */}
            <div className="admin-header">
                <div className="container header-content">
                    <div className="header-left">
                        <div className="logo-badge">Admin</div>
                        <h1>Dashboard</h1>
                    </div>
                    <div className="header-actions">
                        <button
                            onClick={fetchData}
                            className={`btn-icon ${refreshing ? 'spinning' : ''}`}
                            title="Refresh Data"
                        >
                            🔄
                        </button>
                        <Link to="/" className="btn btn-outline">
                            Visit Website ↗
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container admin-container">
                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card total">
                        <div className="stat-icon-wrapper">
                            <span className="stat-icon">📊</span>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{stats.total}</div>
                            <div className="stat-label">Total Bookings</div>
                        </div>
                    </div>
                    <div className="stat-card pending">
                        <div className="stat-icon-wrapper">
                            <span className="stat-icon">⏳</span>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{stats.pending}</div>
                            <div className="stat-label">Pending Actions</div>
                        </div>
                    </div>
                    <div className="stat-card confirmed">
                        <div className="stat-icon-wrapper">
                            <span className="stat-icon">✅</span>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{stats.confirmed}</div>
                            <div className="stat-label">Confirmed Trips</div>
                        </div>
                    </div>
                    <div className="stat-card completed">
                        <div className="stat-icon-wrapper">
                            <span className="stat-icon">🎉</span>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{stats.completed}</div>
                            <div className="stat-label">Completed</div>
                        </div>
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="bookings-section">
                    <div className="section-header">
                        <h2>Recent Bookings</h2>
                        <span className="badge-count">{bookings.length} records</span>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading bookings...</p>
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📭</div>
                            <h3>No bookings found</h3>
                            <p>New bookings will appear here instantly.</p>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="bookings-table">
                                <thead>
                                    <tr>
                                        <th>Booking Info</th>
                                        <th>Customer</th>
                                        <th>Trip Details</th>
                                        <th>Vehicle</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map(booking => (
                                        <tr key={booking._id}>
                                            <td>
                                                <div className="booking-date">
                                                    <span className="date-main">
                                                        {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                    </span>
                                                    <span className="time-sub">{booking.time}</span>
                                                </div>
                                                <div className="created-at">
                                                    Booked: {new Date(booking.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="customer-info">
                                                    <span className="customer-name">{booking.name}</span>
                                                    <a
                                                        href={`https://wa.me/${booking.whatsapp}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="whatsapp-link"
                                                    >
                                                        <span className="wa-icon">💬</span> {booking.whatsapp}
                                                    </a>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="trip-info">
                                                    <span className="trip-type-badge">{booking.tripType}</span>
                                                    <div className="route-line">
                                                        <span className="point from">{booking.pickup}</span>
                                                        <span className="arrow">→</span>
                                                        <span className="point to">{booking.drop}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="car-info">
                                                    <span className="car-type">{booking.carType}</span>
                                                    <span className="pax-count">👥 {booking.passengers}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <select
                                                    value={booking.status}
                                                    onChange={(e) => updateStatus(booking._id, e.target.value)}
                                                    className={`status-select status-${booking.status}`}
                                                >
                                                    <option value="pending">⏳ Pending</option>
                                                    <option value="confirmed">✅ Confirmed</option>
                                                    <option value="completed">🎉 Completed</option>
                                                    <option value="cancelled">❌ Cancelled</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => deleteBooking(booking._id)}
                                                    className="btn-delete"
                                                    title="Delete Booking"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;
