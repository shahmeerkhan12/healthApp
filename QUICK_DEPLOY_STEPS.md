# Quick Deploy Steps - Copy & Paste Commands

Follow these steps in order. Copy and paste the commands!

---

## Step 1: Push to GitHub (5 min)

### Create GitHub Repo
1. Go to https://github.com → New repository
2. Name: `health-monitor-app`
3. Public
4. Create

### Push Code
```cmd
git init
git add .
git commit -m "Initial commit: Health Monitor App built with Kiro AI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/health-monitor-app.git
git push -u origin main
```

**⚠️ Replace YOUR_USERNAME with your GitHub username!**

---

## Step 2: Deploy Backend to Render (10 min)

### Sign Up & Create Service
1. Go to https://render.com
2. Sign up with GitHub
3. New + → Web Service
4. Connect `health-monitor-app` repo

### Configure
- **Name**: `health-monitor-backend`
- **Build**: `npm install && npm run build`
- **Start**: `npm start`

### Add Environment Variables
```
MONGODB_URI = (copy from your .env file)
JWT_SECRET = health_monitor_secret_key_2024
JWT_EXPIRES_IN = 7d
NODE_ENV = production
PORT = 3000
```

### Deploy & Copy URL
- Click "Create Web Service"
- Wait 3 minutes
- Copy URL: `https://health-monitor-backend-XXXX.onrender.com`

---

## Step 3: Update Code for Production (5 min)

### Update Frontend API URL

Open `client/.env.production` and replace with your Render URL:
```env
VITE_API_URL=https://YOUR-RENDER-URL.onrender.com
```

### Update Backend CORS

The CORS is already configured in `src/index.ts`, but you'll need to update it with your actual Vercel URL after Step 4.

### Push Changes
```cmd
git add .
git commit -m "Configure production URLs"
git push origin main
```

Wait 2 minutes for Render to redeploy.

---

## Step 4: Deploy Frontend to Vercel (10 min)

### Sign Up & Import
1. Go to https://vercel.com
2. Sign up with GitHub
3. Add New → Project
4. Import `health-monitor-app`

### Configure
- **Root Directory**: `client` (click Edit)
- **Framework**: Vite (auto-detected)
- **Build**: `npm run build`
- **Output**: `dist`

### Add Environment Variable
```
VITE_API_URL = https://YOUR-RENDER-URL.onrender.com
```

### Deploy & Copy URL
- Click "Deploy"
- Wait 3 minutes
- Copy URL: `https://health-monitor-app-XXXX.vercel.app`

---

## Step 5: Update CORS (5 min)

### Update Backend CORS

Open `src/index.ts` and update the CORS origin array with your actual Vercel URL:

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://YOUR-ACTUAL-VERCEL-URL.vercel.app',  // Your real URL
    'https://*.vercel.app'
  ],
  credentials: true
}));
```

### Push Update
```cmd
git add .
git commit -m "Update CORS with Vercel URL"
git push origin main
```

Wait 2 minutes for Render to redeploy.

---

## Step 6: Test Everything (5 min)

### Open Your App
Go to: `https://YOUR-VERCEL-URL.vercel.app`

### Test Registration
1. Click "Register"
2. Fill in details
3. Click "Register"
4. Should redirect to dashboard ✅

### Create Demo Account
1. Logout
2. Register:
   - Email: demo@healthmonitor.com
   - Password: demo123
3. Add 5-10 health records
4. Test all features

---

## Step 7: Update README (2 min)

### Update URLs

Open `README.md` and update:

```markdown
**🚀 Live Application**: https://YOUR-VERCEL-URL.vercel.app

**🔑 Demo Credentials**
- **Email**: demo@healthmonitor.com
- **Password**: demo123
```

### Push
```cmd
git add README.md
git commit -m "Add deployment URLs"
git push origin main
```

---

## ✅ Done!

Your app is live at:
- **Frontend**: https://YOUR-VERCEL-URL.vercel.app
- **Backend**: https://YOUR-RENDER-URL.onrender.com

---

## 🎥 Next: Record Video

Record a 3-minute video showing:
1. Registration/Login (20s)
2. Add health record with sliders (45s)
3. Dashboard with weekly summary (45s)
4. Activities and recommendations (30s)
5. Diet plans (25s)
6. Mention Kiro AI (15s)

Upload to YouTube (PUBLIC) and add link to README.

---

## 📤 Then: Submit!

Use these URLs in submission form:
- **Repo**: https://github.com/YOUR_USERNAME/health-monitor-app
- **App**: https://YOUR-VERCEL-URL.vercel.app
- **Video**: https://youtube.com/watch?v=YOUR_VIDEO_ID
- **Demo**: demo@healthmonitor.com / demo123

---

## 🐛 Common Issues

### "Network Error" when registering
→ Check CORS includes your Vercel URL
→ Wait 30s for backend to wake up (first request)

### "Cannot connect to database"
→ Check MongoDB Atlas IP whitelist (0.0.0.0/0)
→ Verify MONGODB_URI in Render

### Build fails
→ Check logs in Vercel/Render dashboard
→ Verify all environment variables are set

---

**Total Time**: ~40 minutes
**Cost**: $0 (100% FREE)

Good luck! 🚀
