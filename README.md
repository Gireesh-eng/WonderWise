# 🌍 TravelGen - AI-Powered Travel Itinerary Generator

A full-stack web application that generates personalized travel itineraries using Google's Gemini AI. Built with React, Express, MongoDB, and features a beautiful, modern UI with animations.

![TravelGen](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## ✨ Features

- 🤖 **AI-Powered Generation** - Uses Google Gemini 1.5 Pro to create comprehensive travel handbooks
- 🎨 **Beautiful Multi-Step Form** - Smooth animations and intuitive user experience
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🔐 **User Authentication** - Secure JWT-based authentication system
- 💾 **Save & Manage** - Store and organize all your travel itineraries
- 📥 **Export Options** - Download as HTML or print as PDF
- 🎭 **Theme Selection** - Choose from 5 beautiful color themes
- 📊 **User Dashboard** - Track statistics and recent itineraries
- 🗺️ **Comprehensive Itineraries** - Includes maps, attractions, language guides, and more

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running locally OR MongoDB Atlas account
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   cd travelgen
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration (Choose one)
   # Option 1: Local MongoDB
   MONGODB_URI=mongodb://localhost:27017/travelgen
   
   # Option 2: MongoDB Atlas (Recommended)
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/travelgen

   # JWT Secret (Generate a secure random string)
   JWT_SECRET=your_super_secure_jwt_secret_key_here_change_this

   # Google Gemini AI API Key (REQUIRED)
   GEMINI_API_KEY=your_gemini_api_key_here

   # Client URL (for CORS)
   CLIENT_URL=http://localhost:5173
   ```

5. **Start MongoDB** (if using local MongoDB)
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

6. **Run the application**
   
   In the root directory, run both frontend and backend:
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend dev server on `http://localhost:5173`

7. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
travelgen/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── TripPlannerForm.tsx
│   │   │   ├── ItineraryDisplay.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── context/         # React Context (Auth)
│   │   │   └── AuthContext.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── SignIn.tsx
│   │   │   ├── SignUp.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CreateItinerary.tsx
│   │   │   ├── ViewItinerary.tsx
│   │   │   ├── MyItineraries.tsx
│   │   │   └── Profile.tsx
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   └── vite.config.ts
│
├── server/                  # Express backend
│   ├── config/
│   │   └── database.js      # MongoDB connection
│   ├── middleware/
│   │   └── auth.js          # JWT authentication
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Itinerary.js     # Itinerary schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── itinerary.js     # Itinerary CRUD routes
│   │   └── user.js          # User profile routes
│   ├── services/
│   │   └── geminiService.js # Gemini AI integration
│   └── index.js             # Express server setup
│
├── public/                  # Static files
│   └── paris-travel-plan.html # Sample itinerary
├── package.json             # Root dependencies
├── .gitignore
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Itineraries
- `POST /api/itinerary/generate` - Generate new itinerary (Protected)
- `GET /api/itinerary` - Get all user itineraries (Protected)
- `GET /api/itinerary/:id` - Get specific itinerary (Protected)
- `PATCH /api/itinerary/:id` - Update itinerary (Protected)
- `DELETE /api/itinerary/:id` - Delete itinerary (Protected)

### User
- `GET /api/user/profile` - Get user profile (Protected)
- `PATCH /api/user/profile` - Update user profile (Protected)
- `GET /api/user/stats` - Get user statistics (Protected)

## 🎨 UI Features

### Multi-Step Form
1. **Destination** - Choose your travel destination
2. **Dates** - Select travel dates
3. **Travelers** - Specify number and type of travelers
4. **Budget** - Choose your budget range
5. **Interests** - Select activities and interests
6. **Theme** - Pick a color theme for your handbook

### Generated Itinerary Includes
- ✅ Detailed daily itineraries with morning/afternoon/evening activities
- ✅ Interactive maps with Google Maps integration
- ✅ Key attractions with descriptions and admission fees
- ✅ Language phrases with pronunciation guides
- ✅ Local etiquette and cultural tips
- ✅ Weather forecasts and packing suggestions
- ✅ Emergency contacts and medical facilities
- ✅ Budget breakdowns and money-saving tips

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP client
- **React Router** - Routing

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Google Generative AI** - Gemini API client
- **Helmet** - Security
- **CORS** - Cross-origin requests

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Rate limiting
- Helmet security headers
- CORS configuration
- Input validation
- SQL injection prevention (NoSQL)

## 📝 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `5000` |
| `NODE_ENV` | Environment | No | `development` |
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb://localhost:27017/travelgen` |
| `JWT_SECRET` | JWT signing secret | Yes | `your_secret_key` |
| `GEMINI_API_KEY` | Google Gemini API key | Yes | `AIza...` |
| `CLIENT_URL` | Frontend URL for CORS | No | `http://localhost:5173` |

## 📦 npm Scripts

### Root Directory
- `npm run dev` - Run both frontend and backend concurrently
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm start` - Run backend in production
- `npm run install-all` - Install all dependencies

### Client Directory
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Backend Deployment (Heroku, Railway, etc.)
1. Set environment variables in your hosting platform
2. Connect to MongoDB Atlas
3. Deploy the root directory
4. The start script will run `node server/index.js`

### Frontend Deployment (Vercel, Netlify, etc.)
1. Build the client: `cd client && npm run build`
2. Deploy the `client/dist` folder
3. Set up environment variables if needed
4. Configure redirects for SPA routing

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --version`
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### Gemini API Errors
- Verify your API key is correct
- Check API quota and billing
- Ensure stable internet connection

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for powering the itinerary generation
- Framer Motion for beautiful animations
- Lucide for the icon set
- The open-source community

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ and ☕ by TravelGen Team**

Enjoy planning your perfect trips! ✈️🌍

