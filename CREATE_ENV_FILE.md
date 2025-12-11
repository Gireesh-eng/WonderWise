# 🔧 How to Create Your .env File

## Quick Steps:

### Step 1: Create the .env file

**Option A - Using Command Line:**

**Windows (PowerShell):**
```powershell
Copy-Item ENV_TEMPLATE.txt .env
```

**Windows (Command Prompt):**
```cmd
copy ENV_TEMPLATE.txt .env
```

**Mac/Linux:**
```bash
cp ENV_TEMPLATE.txt .env
```

**Option B - Manual Creation:**
1. Create a new file named `.env` in the root directory
2. Copy the contents from `ENV_TEMPLATE.txt` into it

---

### Step 2: Get Your Gemini API Key

1. Go to: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key

---

### Step 3: Edit the .env file

Open the `.env` file and add your API key:

```env
# Before:
GEMINI_API_KEY=

# After (example):
GEMINI_API_KEY=AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Also update the JWT_SECRET** to a secure random string:
```env
JWT_SECRET=my_super_secure_random_string_12345
```

---

### Step 4: Choose Your Database

#### Option A: Local MongoDB (Default)
If you have MongoDB installed locally, keep this line:
```env
MONGODB_URI=mongodb://localhost:27017/travelgen
```

#### Option B: MongoDB Atlas (Recommended - Free Cloud)
1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update your `.env`:
```env
MONGODB_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/travelgen?retryWrites=true&w=majority
```

---

### Step 5: Verify Your .env File

Your final `.env` file should look like this:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/travelgen
JWT_SECRET=your_secure_secret_here
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
CLIENT_URL=http://localhost:5173
```

---

## ✅ You're Ready!

Now you can run:
```bash
npm run dev
```

And visit: **http://localhost:5173**

---

## 🔒 Important Security Notes:

1. **Never commit your .env file** to Git (it's already in .gitignore)
2. **Change JWT_SECRET** to a secure random string
3. **Keep your Gemini API key private**

---

## ❓ Troubleshooting:

### "Cannot read .env file"
- Make sure the file is named exactly `.env` (with the dot at the start)
- On Windows, make sure file extensions are visible

### "MongoDB connection failed"
- If using local MongoDB, start it: `brew services start mongodb-community` (Mac)
- If using Atlas, check your connection string and IP whitelist

### "Gemini API error"
- Verify your API key is correct
- Check you have API quota remaining
- Ensure billing is enabled (free tier available)

---

## 🎉 Need Help?

Check **SETUP.md** for detailed setup instructions!

