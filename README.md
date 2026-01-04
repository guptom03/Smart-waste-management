# Smart Waste Management System

A production-ready web application for monitoring and managing urban waste collection with AI-powered insights.

## Features

- **Real-time Dashboard**: Interactive map showing waste bins and alerts
- **AI Analysis**: AI-powered waste analysis and cleanup strategies
- **Control Panel**: Administrative interface for managing bins and alerts
- **RESTful API**: Backend API for bins, alerts, and AI services

## Tech Stack

- **Frontend**: HTML, Tailwind CSS, Google Maps API
- **Backend**: Node.js, Express.js
- **AI**: AI-powered analysis
- **Maps**: Google Maps with dark theme

## Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the backend directory:
   ```
   GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key
   PORT=3000
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. Open your browser to `http://localhost:3000`

## API Endpoints

- `GET /api/bins` - Get all waste bins
- `POST /api/bins` - Add a new bin
- `PUT /api/bins/:id` - Update bin status
- `GET /api/alerts` - Get all alerts
- `POST /api/alerts` - Create a new alert
- `DELETE /api/alerts/:id` - Resolve an alert
- `POST /api/gemini` - AI analysis proxy

## Production Deployment

For production deployment:

1. Set environment variables securely
2. Use a database instead of in-memory storage
3. Add authentication and authorization
4. Configure HTTPS
5. Set up monitoring and logging

## Usage

- **Main Dashboard**: View real-time alerts and generate AI cleanup plans
- **Control Panel**: Manage bins, resolve alerts, and monitor system status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request