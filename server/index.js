import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aradhya-travels';

let Booking; // Will hold either Mongoose Model or Mock Class

// Mock Database Implementation (Fallback)
class MockBooking {
    constructor(data) {
        Object.assign(this, data);
        this._id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        this.createdAt = new Date();
        this.status = data.status || 'pending';
    }

    async save() {
        MockBooking.store.push(this);
        return this;
    }

    static async find() {
        return {
            sort: (criteria) => {
                // Simple sort implementation (handles { createdAt: -1 })
                const sorted = [...MockBooking.store].sort((a, b) => {
                    if (criteria.createdAt === -1) {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }
                    return 0;
                });
                return sorted;
            }
        };
    }

    static async findById(id) {
        return MockBooking.store.find(b => b._id === id);
    }

    static async findByIdAndUpdate(id, update, options) {
        const index = MockBooking.store.findIndex(b => b._id === id);
        if (index === -1) return null;

        const booking = MockBooking.store[index];
        // Handle nested updates if necessary, but for now simple merge
        Object.assign(booking, update);
        return booking;
    }

    static async findByIdAndDelete(id) {
        const index = MockBooking.store.findIndex(b => b._id === id);
        if (index === -1) return null;
        const deleted = MockBooking.store[index];
        MockBooking.store.splice(index, 1);
        return deleted;
    }

    static async countDocuments(filter = {}) {
        if (Object.keys(filter).length === 0) return MockBooking.store.length;
        return MockBooking.store.filter(b => {
            return Object.entries(filter).every(([key, value]) => b[key] === value);
        }).length;
    }
}
MockBooking.store = [];

// Initialize Database
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Define Mongoose Schema & Model
        const bookingSchema = new mongoose.Schema({
            name: { type: String, required: true },
            whatsapp: { type: String, required: true },
            tripType: { type: String, required: true },
            carType: { type: String, required: true },
            passengers: { type: Number, required: true },
            pickup: { type: String, required: true },
            drop: { type: String, required: true },
            date: { type: String, required: true },
            time: { type: String, required: true },
            status: { type: String, default: 'pending' },
            createdAt: { type: Date, default: Date.now }
        });

        Booking = mongoose.model('Booking', bookingSchema);

    } catch (err) {
        console.log('⚠️  MongoDB Connection Failed:', err.message);
        console.log('🔄 Switching to In-Memory Mock Database (Data will reset on restart)');
        Booking = MockBooking;
    }
};

// Connect to DB (or fallback)
connectDB();

// Routes

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Aradhya Travels API is running',
        dbType: Booking === MockBooking ? 'In-Memory (Mock)' : 'MongoDB'
    });
});

// Get all bookings (for admin dashboard)
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single booking
app.get('/api/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new booking
app.post('/api/bookings', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ success: true, booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update booking status
app.patch('/api/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.json({ success: true, booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Delete booking
app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.json({ success: true, message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get booking statistics
app.get('/api/stats', async (req, res) => {
    try {
        const total = await Booking.countDocuments();
        const pending = await Booking.countDocuments({ status: 'pending' });
        const confirmed = await Booking.countDocuments({ status: 'confirmed' });
        const completed = await Booking.countDocuments({ status: 'completed' });

        res.json({
            success: true,
            stats: { total, pending, confirmed, completed }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api/health`);
});

// Serve Static Assets in Production
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
