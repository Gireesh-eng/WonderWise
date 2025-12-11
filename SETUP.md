# 🚀 Quick Setup Guide for TravelGen

Follow these steps to get your TravelGen application up and running in minutes!

## Step 1: Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

## Step 2: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 3: Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/travelgen

# JWT Secret (Change this to a random secure string)
JWT_SECRET=your_super_secure_random_string_here

# Google Gemini AI API Key (PASTE YOUR KEY HERE)
GEMINI_API_KEY=your_gemini_api_key_from_step_2

# Client URL
CLIENT_URL=http://localhost:5173
```

**IMPORTANT:** Replace `your_gemini_api_key_from_step_2` with your actual Gemini API key!

## Step 4: Start MongoDB

### Option A: Local MongoDB

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
```bash
net start MongoDB
```

### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (Free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update your `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/travelgen?retryWrites=true&w=majority
   ```
7. Replace `<username>` and `<password>` with your database credentials

## Step 5: Run the Application

```bash
npm run dev
```

This will start:
- ✅ Backend server on http://localhost:5000
- ✅ Frontend dev server on http://localhost:5173

## Step 6: Open in Browser

Navigate to: http://localhost:5173

You should see the beautiful TravelGen landing page! 🎉

## 🎯 First Steps After Setup

1. **Sign Up** - Create your account
2. **Create Itinerary** - Click "Create New Itinerary"
3. **Fill the Form** - Go through the 6-step form
4. **Generate** - Wait for AI to create your travel handbook (takes 20-60 seconds)
5. **Download** - Save your beautiful HTML travel guide!

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Ensure MongoDB is running: `mongod --version`
- Check your connection string in `.env`
- For Atlas: Whitelist your IP in Network Access

### Issue: "Gemini API error"
**Solution:**
- Verify your API key is correct in `.env`
- Check you have API quota remaining
- Ensure your Google Cloud project has billing enabled (free tier available)

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find and kill the process
lsof -i :5000
kill -9 <PID>

# Or change the port in .env
PORT=5001
```

### Issue: "Module not found"
**Solution:**
```bash
# Re-install dependencies
rm -rf node_modules client/node_modules
npm run install-all
```

## 📱 Testing the Application

### Test User Registration
1. Go to Sign Up page
2. Create account with:
   - Name: Test User
   - Email: test@example.com
   - Password: test123

### Test Itinerary Generation
1. Login with your account
2. Click "Create New Itinerary"
3. Use these test inputs:
   - Destination: "Paris, France"
   - Dates: "June 15-20, 2024"
   - Travelers: "2 travelers"
   - Budget: "Mid-range ($100-250/day)"
   - Interests: Select 3-4 interests
   - Theme: "Ocean Blue"
4. Click "Generate My Travel Handbook"
5. Wait for generation (30-60 seconds)
6. View, download, or print your itinerary!

## 🎨 UI Features to Explore

- ✨ Smooth animations throughout the app
- 🎯 Multi-step form with progress tracking
- 📱 Fully responsive design
- 🎨 5 beautiful theme options
- 📊 User dashboard with statistics
- 💾 Save and manage multiple itineraries
- 📥 Export as HTML or PDF
- 🔍 Search and filter itineraries

## 📚 Additional Resources

- **Gemini AI Documentation:** https://ai.google.dev/docs
- **MongoDB Documentation:** https://docs.mongodb.com
- **React Documentation:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com

## 💡 Pro Tips

1. **API Key Security:** Never commit your `.env` file to Git
2. **Database:** Use MongoDB Atlas for production (free tier available)
3. **Performance:** The AI generation takes 30-60 seconds - this is normal
4. **Customization:** You can modify the prompt in `server/services/geminiService.js`
5. **Themes:** Edit theme colors in `client/src/components/TripPlannerForm.tsx`

## 🚢 Ready for Production?

When you're ready to deploy:

1. **Backend (Railway, Heroku, or similar):**
   - Set environment variables in hosting dashboard
   - Connect to MongoDB Atlas
   - Deploy from GitHub

2. **Frontend (Vercel, Netlify, or similar):**
   - Build: `cd client && npm run build`
   - Deploy the `client/dist` folder
   - Configure environment variables

## 🎉 You're All Set!

If you've followed all steps, you should have a fully functional AI-powered travel itinerary generator!

**Need help?** Check the main README.md or open an issue on GitHub.

**Enjoy creating amazing travel plans!** ✈️🌍

---

Made with ❤️ by TravelGen Team

