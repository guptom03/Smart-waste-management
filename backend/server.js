require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve frontend from public folder

// In-memory storage (use database in production)
let alerts = [];
let bins = [];

// API Routes
app.get('/api/alerts', (req, res) => {
    res.json(alerts);
});

app.post('/api/alerts', (req, res) => {
    const { lat, lng, type = 'waste' } = req.body;
    const alert = {
        id: Date.now(),
        lat,
        lng,
        type,
        timestamp: new Date(),
        status: 'active'
    };
    alerts.push(alert);
    res.json(alert);
});

app.delete('/api/alerts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    alerts = alerts.filter(a => a.id !== id);
    res.json({ success: true });
});

app.get('/api/bins', (req, res) => {
    res.json(bins);
});

app.post('/api/bins', (req, res) => {
    const { lat, lng } = req.body;
    const bin = {
        id: Date.now(),
        lat,
        lng,
        status: 'active'
    };
    bins.push(bin);
    res.json(bin);
});

app.put('/api/bins/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const bin = bins.find(b => b.id === id);
    if (bin) {
        bin.status = status;
        res.json(bin);
    } else {
        res.status(404).json({ error: 'Bin not found' });
    }
});

// Demo Data Management
function getDemoData(city) {
    const demoDatasets = {
        delhi: {
            center: { lat: 28.6139, lng: 77.2090 },
            bins: [
                { id: 1, lat: 28.615, lng: 77.210, status: 'active' },
                { id: 2, lat: 28.620, lng: 77.200, status: 'active' },
                { id: 3, lat: 28.610, lng: 77.220, status: 'active' },
                { id: 4, lat: 28.625, lng: 77.215, status: 'maintenance' },
                { id: 5, lat: 28.605, lng: 77.205, status: 'active' }
            ]
        },
        mumbai: {
            center: { lat: 19.0760, lng: 72.8777 },
            bins: [
                { id: 1, lat: 19.078, lng: 72.879, status: 'active' },
                { id: 2, lat: 19.082, lng: 72.875, status: 'active' },
                { id: 3, lat: 19.074, lng: 72.881, status: 'active' },
                { id: 4, lat: 19.080, lng: 72.883, status: 'maintenance' },
                { id: 5, lat: 19.072, lng: 72.873, status: 'active' }
            ]
        },
        bangalore: {
            center: { lat: 12.9716, lng: 77.5946 },
            bins: [
                { id: 1, lat: 12.973, lng: 77.596, status: 'active' },
                { id: 2, lat: 12.978, lng: 77.592, status: 'active' },
                { id: 3, lat: 12.969, lng: 77.598, status: 'active' },
                { id: 4, lat: 12.975, lng: 77.600, status: 'maintenance' },
                { id: 5, lat: 12.967, lng: 77.590, status: 'active' }
            ]
        },
        chennai: {
            center: { lat: 13.0827, lng: 80.2707 },
            bins: [
                { id: 1, lat: 13.084, lng: 80.272, status: 'active' },
                { id: 2, lat: 13.089, lng: 80.268, status: 'active' },
                { id: 3, lat: 13.081, lng: 80.274, status: 'active' },
                { id: 4, lat: 13.087, lng: 80.276, status: 'maintenance' },
                { id: 5, lat: 13.079, lng: 80.266, status: 'active' }
            ]
        },
        kolkata: {
            center: { lat: 22.5726, lng: 88.3639 },
            bins: [
                { id: 1, lat: 22.574, lng: 88.365, status: 'active' },
                { id: 2, lat: 22.579, lng: 88.361, status: 'active' },
                { id: 3, lat: 22.571, lng: 88.367, status: 'active' },
                { id: 4, lat: 22.577, lng: 88.369, status: 'maintenance' },
                { id: 5, lat: 22.569, lng: 88.359, status: 'active' }
            ]
        }
    };

    return demoDatasets[city] || demoDatasets.delhi;
}

app.post('/api/demo/initialize', (req, res) => {
    const { city = 'delhi' } = req.body;
    const demoData = getDemoData(city);

    // Initialize demo bins
    bins = demoData.bins;

    // Initialize demo alerts around the city center
    alerts = [
        { id: Date.now(), lat: demoData.center.lat + (Math.random() - 0.5) * 0.02, lng: demoData.center.lng + (Math.random() - 0.5) * 0.02, type: 'waste', timestamp: new Date(), status: 'active' },
        { id: Date.now() + 1, lat: demoData.center.lat + (Math.random() - 0.5) * 0.02, lng: demoData.center.lng + (Math.random() - 0.5) * 0.02, type: 'waste', timestamp: new Date(), status: 'active' }
    ];

    res.json({ success: true, bins: bins.length, alerts: alerts.length, city });
});

app.post('/api/demo/clear', (req, res) => {
    bins = [];
    alerts = [];
    res.json({ success: true });
});

// Proxy for Gemini API
app.post('/api/gemini', async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to call Gemini API' });
    }
});

// Serve the main dashboard
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error loading page');
        const html = data.replace('{{GOOGLE_MAPS_API_KEY}}', process.env.GOOGLE_MAPS_API_KEY || '');
        res.send(html);
    });
});

// Control dashboard route
app.get('/control', (req, res) => {
    const htmlPath = path.join(__dirname, '..', 'public', 'control.html');
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error loading page');
        const html = data.replace('{{GOOGLE_MAPS_API_KEY}}', process.env.GOOGLE_MAPS_API_KEY || '');
        res.send(html);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});