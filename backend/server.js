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

// In-memory storage for demo (use database in production)
let alerts = [];
let bins = [
    { id: 1, lat: 28.615, lng: 77.210, status: 'active' },
    { id: 2, lat: 28.620, lng: 77.200, status: 'active' },
    { id: 3, lat: 28.610, lng: 77.220, status: 'active' }
];

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