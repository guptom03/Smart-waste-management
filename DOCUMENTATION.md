# Smart Waste Management System

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Demo Data Management](#demo-data-management)
- [Deployment](#deployment)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Smart Waste Management System is a comprehensive web application designed to monitor and manage urban waste collection operations. It provides real-time visualization of waste bins, alert management, AI-powered analysis, and administrative controls for efficient city waste management.

### Key Capabilities
- **Real-time Monitoring**: Interactive maps showing bin locations and waste alerts
- **AI Integration**: Intelligent waste analysis and cleanup strategy generation
- **Multi-city Support**: Demo data for major Indian cities
- **Administrative Control**: Complete bin and alert management interface
- **Scalable Architecture**: RESTful API backend with modern frontend

## 🏗️ Architecture

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External APIs │
│   (HTML/CSS/JS) │◄──►│   (Node.js)     │◄──►│   (Google Maps) │
│                 │    │                 │    │   (Gemini AI)   │
│ - Dashboard     │    │ - REST API      │    │                 │
│ - Control Panel │    │ - Data Storage  │    └─────────────────┘
│ - Maps          │    │ - AI Proxy      │
│ - Real-time UI  │    │ - File Serving  │
└─────────────────┘    └─────────────────┘
```

### Component Breakdown

#### Frontend Architecture
- **Main Dashboard** (`index.html`): Real-time monitoring interface
- **Control Panel** (`control.html`): Administrative management interface
- **Google Maps Integration**: Interactive mapping with custom styling
- **Responsive Design**: Tailwind CSS for modern UI

#### Backend Architecture
- **Express.js Server**: RESTful API endpoints
- **In-memory Storage**: Demo data management (replace with database for production)
- **Environment Configuration**: Secure API key management
- **CORS Support**: Cross-origin resource sharing
- **Static File Serving**: Frontend asset delivery

#### Data Flow
```
User Action → Frontend → API Call → Backend Processing → Database/API → Response → UI Update
```

## ✨ Features

### Core Features
- **Interactive Maps**: Google Maps with dark theme and custom markers
- **Real-time Alerts**: Live waste detection and notification system
- **AI Analysis**: Gemini-powered waste assessment and cleanup strategies
- **Bin Management**: CRUD operations for waste bin locations and status
- **Demo Data**: City-specific sample data for presentations

### Advanced Features
- **Multi-city Support**: Pre-configured data for 5 major Indian cities
- **Status Tracking**: Bin maintenance and operational status monitoring
- **Alert Resolution**: Mark alerts as resolved with automatic cleanup
- **Manual Data Entry**: Add bins with precise coordinates
- **Bulk Operations**: Clear all data or initialize demo datasets

### User Interface Features
- **Dark Theme**: Modern UI with consistent styling
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Controls**: Click-to-add bins, drag-to-pan maps
- **Real-time Updates**: Live data synchronization
- **Error Handling**: Graceful error messages and recovery

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: ES6+ features, async/await, fetch API
- **Google Maps JavaScript API**: Interactive mapping and visualization
- **Leaflet.js**: Fallback mapping library (replaced with Google Maps)

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **CORS**: Cross-origin resource sharing middleware
- **dotenv**: Environment variable management
- **File System**: Dynamic HTML template injection

### External Services
- **Google Maps Platform**: Mapping, geocoding, and visualization
- **Google Gemini AI**: Natural language processing and analysis
- **OpenStreetMap**: Alternative tile provider (fallback)

### Development Tools
- **Git**: Version control system
- **npm**: Package management
- **VS Code**: Development environment
- **GitHub**: Repository hosting and collaboration

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher (comes with Node.js)
- **Git**: Version control system
- **Web Browser**: Modern browser with JavaScript enabled
- **Internet Connection**: Required for Google Maps and AI services

### API Keys Required
- **Google Maps API Key**: For map visualization
- **Google Gemini API Key**: For AI analysis (optional)

### Development Environment
- **Operating System**: Windows 10/11, macOS, or Linux
- **RAM**: Minimum 4GB, recommended 8GB
- **Storage**: 500MB free space for project and dependencies

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/guptom03/Smart-waste-management.git
cd Smart-waste-management
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment
Create `.env` file in `backend/` directory:
```env
# Environment Variables
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
PORT=3000
```

### 4. Start Development Server
```bash
npm start
```

### 5. Access Application
- **Main Dashboard**: http://localhost:3000
- **Control Panel**: http://localhost:3000/control

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `3000` |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key | Yes | - |
| `GEMINI_API_KEY` | Google Gemini API key | No | - |

### Google Maps API Setup
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select a project
3. Enable "Maps JavaScript API"
4. Create an API key
5. Restrict key to your domain (localhost:3000 for development)

### Gemini AI Setup (Optional)
1. Enable "Generative Language API" in Google Cloud Console
2. Use the same project or create a new API key
3. Add key to `.env` file

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
Currently no authentication required (add for production).

### Response Format
All responses are in JSON format:
```json
{
  "success": boolean,
  "data": object|array,
  "error": string
}
```

### Endpoints

#### Bin Management

**GET /api/bins**
- **Description**: Retrieve all waste bins
- **Response**: Array of bin objects
```json
[
  {
    "id": 1,
    "lat": 28.6139,
    "lng": 77.2090,
    "status": "active"
  }
]
```

**POST /api/bins**
- **Description**: Create a new waste bin
- **Body**:
```json
{
  "lat": 28.6139,
  "lng": 77.2090
}
```
- **Response**: Created bin object

**PUT /api/bins/:id**
- **Description**: Update bin status
- **Body**:
```json
{
  "status": "maintenance"
}
```
- **Response**: Updated bin object

#### Alert Management

**GET /api/alerts**
- **Description**: Retrieve all active alerts
- **Response**: Array of alert objects
```json
[
  {
    "id": 1,
    "lat": 28.6139,
    "lng": 77.2090,
    "type": "waste",
    "timestamp": "2024-01-04T10:00:00.000Z",
    "status": "active"
  }
]
```

**POST /api/alerts**
- **Description**: Create a new alert
- **Body**:
```json
{
  "lat": 28.6139,
  "lng": 77.2090,
  "type": "waste"
}
```
- **Response**: Created alert object

**DELETE /api/alerts/:id**
- **Description**: Resolve/delete an alert
- **Response**: Success confirmation

#### Demo Data Management

**POST /api/demo/initialize**
- **Description**: Initialize demo data for a city
- **Body**:
```json
{
  "city": "delhi"
}
```
- **Available Cities**: `delhi`, `mumbai`, `bangalore`, `chennai`, `kolkata`
- **Response**:
```json
{
  "success": true,
  "bins": 5,
  "alerts": 2,
  "city": "delhi"
}
```

**POST /api/demo/clear**
- **Description**: Clear all bins and alerts
- **Response**: Success confirmation

#### AI Integration

**POST /api/gemini**
- **Description**: Get AI analysis for waste scenarios
- **Body**:
```json
{
  "prompt": "Analyze waste at coordinates 28.6139, 77.2090"
}
```
- **Response**: AI-generated text analysis

## 📖 Usage Guide

### First Time Setup
1. **Start the server**: `cd backend && npm start`
2. **Open browser**: Navigate to http://localhost:3000
3. **Configure API keys**: Add Google Maps API key to `.env`
4. **Initialize demo data**: Use control panel for sample data

### Main Dashboard Usage
- **View Map**: Interactive Google Maps with bin locations
- **Simulate Alerts**: Click "SIMULATE WASTE DETECTION"
- **AI Analysis**: Click markers for waste assessment
- **Generate Strategies**: Use "GENERATE SMART CLEANUP PLAN"

### Control Panel Usage
- **Demo Data**: Select city and initialize sample data
- **Manual Entry**: Add bins with latitude/longitude
- **Status Management**: Update bin operational status
- **Alert Resolution**: Mark alerts as resolved
- **Data Management**: Clear all data when needed

### City Selection
Available cities for demo data:
- **Delhi**: India's capital with dense urban layout
- **Mumbai**: Coastal metropolitan with high population density
- **Bangalore**: Tech hub with planned urban development
- **Chennai**: Southern city with industrial zones
- **Kolkata**: Eastern metropolitan with historical layout

## 🎭 Demo Data Management

### Demo Cities Data

| City | Coordinates | Bins | Alerts | Characteristics |
|------|-------------|------|--------|------------------|
| Delhi | 28.6139°N, 77.2090°E | 5 | 2 | Capital city, dense urban |
| Mumbai | 19.0760°N, 72.8777°E | 5 | 2 | Coastal, high density |
| Bangalore | 12.9716°N, 77.5946°E | 5 | 2 | Tech hub, planned layout |
| Chennai | 13.0827°N, 80.2707°E | 5 | 2 | Industrial, port city |
| Kolkata | 22.5726°N, 88.3639°E | 5 | 2 | Historical, river city |

### Demo Data Structure
Each city demo includes:
- **5 Waste Bins**: Strategically placed with realistic coordinates
- **2 Waste Alerts**: Random locations within city bounds
- **Mixed Status**: Active, maintenance, and inactive bins
- **Realistic Spacing**: Based on actual urban planning

### Manual Data Entry
- **Coordinate System**: WGS84 (latitude/longitude)
- **Precision**: Up to 5 decimal places recommended
- **Validation**: Automatic bounds checking (-90 to 90 lat, -180 to 180 lng)
- **Status Options**: active, maintenance, inactive

## 🚀 Deployment

### Development Deployment
```bash
# Install dependencies
npm install

# Start development server
npm start

# Server runs on http://localhost:3000
```

### Production Deployment

#### Option 1: Local Production
```bash
# Set production environment
export NODE_ENV=production

# Use production port
export PORT=80

# Start server
npm start
```

#### Option 2: PM2 Process Manager
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start server.js --name "waste-management"

# Save PM2 configuration
pm2 save

# Set up auto-restart
pm2 startup
```

#### Option 3: Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup for Production
```env
NODE_ENV=production
PORT=80
GOOGLE_MAPS_API_KEY=your_production_api_key
GEMINI_API_KEY=your_production_gemini_key
```

### Security Considerations
- **HTTPS**: Use SSL certificates for production
- **API Keys**: Restrict to specific domains
- **Rate Limiting**: Implement request throttling
- **Authentication**: Add user authentication
- **Database**: Replace in-memory storage with persistent database

## 💻 Development

### Project Structure
```
Smart-waste-management/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Dependencies
│   └── .env              # Environment variables
├── public/
│   ├── index.html        # Main dashboard
│   └── control.html      # Control panel
├── .gitignore            # Git ignore rules
└── README.md            # This documentation
```

### Development Scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Code Style Guidelines
- **JavaScript**: ES6+ syntax, async/await preferred
- **HTML**: Semantic markup, accessibility considerations
- **CSS**: Tailwind utility classes
- **API**: RESTful conventions, JSON responses
- **Error Handling**: Try-catch blocks, meaningful error messages

### Adding New Features
1. **Plan**: Define requirements and API endpoints
2. **Backend**: Implement server-side logic
3. **Frontend**: Update UI components
4. **Testing**: Verify functionality
5. **Documentation**: Update this guide

## 🔧 Troubleshooting

### Common Issues

#### Google Maps Not Loading
**Symptoms**: "This page didn't load Google Maps correctly"
**Solutions**:
1. Check `GOOGLE_MAPS_API_KEY` in `.env`
2. Verify API key restrictions in Google Cloud Console
3. Ensure Maps JavaScript API is enabled
4. Check browser console for detailed errors

#### Server Not Starting
**Symptoms**: Port 3000 already in use
**Solutions**:
1. Kill existing process: `taskkill /PID <pid> /F`
2. Change port in `.env`: `PORT=3001`
3. Check for other applications using port 3000

#### API Key Errors
**Symptoms**: 403 Forbidden or authentication errors
**Solutions**:
1. Verify API key is correct
2. Check API restrictions
3. Ensure billing is enabled on Google Cloud project
4. Confirm API services are enabled

#### Demo Data Not Loading
**Symptoms**: Initialize button doesn't work
**Solutions**:
1. Check browser console for JavaScript errors
2. Verify server is running
3. Check network connectivity
4. Ensure city selection is valid

### Debug Mode
Enable debug logging:
```bash
DEBUG=* npm start
```

### Performance Issues
- **Memory Usage**: Monitor with `process.memoryUsage()`
- **API Calls**: Implement caching for external APIs
- **Database**: Use connection pooling for production databases

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature-name`
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** with descriptive messages
6. **Push** to your fork
7. **Create** a Pull Request

### Code Standards
- **Commits**: Use conventional commit format
- **Branches**: Feature branches from `master`
- **PRs**: Include description and testing instructions
- **Issues**: Use issue templates for bug reports

### Testing Guidelines
- **Manual Testing**: Test all user flows
- **API Testing**: Use tools like Postman
- **Cross-browser**: Test on Chrome, Firefox, Safari
- **Mobile**: Test responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- **Permissions**: Commercial use, modification, distribution, private use
- **Limitations**: Liability and warranty
- **Conditions**: License and copyright notice

---

## 📞 Support

For support and questions:
- **Issues**: [GitHub Issues](https://github.com/guptom03/Smart-waste-management/issues)
- **Discussions**: [GitHub Discussions](https://github.com/guptom03/Smart-waste-management/discussions)
- **Email**: Contact repository maintainer

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial release with core features
- Google Maps integration
- AI-powered analysis
- Multi-city demo data
- Control panel interface

### Future Releases
- Database integration
- User authentication
- Mobile application
- Advanced analytics
- IoT sensor integration

---

**Built with ❤️ for efficient urban waste management**