# Free Deployment Guide - Step by Step

## 🎯 Recommended: Vercel + Render (100% Free)

### Prerequisites
- GitHub account
- MongoDB Atlas (already set up ✅)
- Your code pushed to GitHub

---

## Part 1: Deploy Backend to Render (5 minutes)

### Step 1: Sign Up
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub

### Step 2: Create Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect account" to link GitHub
4. Find and select your `health-monitor-app` repository
5. Click "Connect"

### Step 3: Configure Service
Fill in these settings:

**Basic Settings:**
- **Name**: `health-monitor-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: (leave empty)
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

**Environment Variables** (Click "Add Environment Variable"):
```
MONGODB_URI = your_mongodb_atlas_connection_string
JWT_SECRET = your_super_secret_key_change_this
JWT_EXPIRES_IN = 7d
NODE_ENV = production
PORT = 3000
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. Copy your backend URL (looks like: `https://health-monitor-backend.onrender.com`)

**Important**: Free tier sleeps after 15 min inactivity. First request may take 30 seconds to wake up.

---

## Part 2: Deploy Frontend to Vercel (5 minutes)

### Step 1: Update API URL
Before deploying, update the frontend to use your Render backend URL:

1. Open `client/src/context/AuthContext.tsx`
2. Add this at the top:
```typescript
import axios from 'axios';

// Set base URL for production
axios.defaults.baseURL = import.meta.env.PROD 
  ? 'https://health-monitor-backend.onrender.com'  // Your Render URL
  : 'http://localhost:3000';
```

3. Save and commit:
```bash
git add .
git commit -m "Configure production API URL"
git push origin main
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel Website (Easiest)**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import your `health-monitor-app` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"
7. Wait 2 minutes
8. Copy your frontend URL (looks like: `https://health-monitor-app.vercel.app`)

**Option B: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client folder
cd client

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## Part 3: Update CORS (Important!)

Your backend needs to allow requests from your Vercel frontend.

1. Open `src/index.ts`
2. Update CORS configuration:

```typescript
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://health-monitor-app.vercel.app',  // Your Vercel URL
    'https://*.vercel.app'  // Allow all Vercel preview deployments
  ],
  credentials: true
}));
```

3. Commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

4. Render will auto-redeploy (wait 2 minutes)

---

## Part 4: Test Your Deployment

### Test Backend
```bash
curl https://health-monitor-backend.onrender.com/
```
Should return: `{"message":"Health Monitor API","version":"1.0.0"}`

### Test Frontend
1. Open your Vercel URL in browser
2. Try to register a new account
3. Login
4. Add a health record
5. Check dashboard

**If registration fails**: Check browser console (F12) for errors

---

## Alternative: Railway (Even Easier!)

If Render doesn't work, try Railway:

### Deploy to Railway (10 minutes)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway auto-detects Node.js and deploys!
7. Click on the deployment
8. Go to "Variables" tab
9. Add environment variables:
   ```
   MONGODB_URI=your_connection_string
   JWT_SECRET=your_secret
   ```
10. Go to "Settings" tab
11. Click "Generate Domain" to get public URL
12. Copy the URL

**For Frontend on Railway:**
1. Click "New" → "GitHub Repo"
2. Select same repository
3. Click "Settings"
4. Set **Root Directory**: `client`
5. Set **Build Command**: `npm install && npm run build`
6. Set **Start Command**: `npx serve dist -p $PORT`
7. Generate domain
8. Done!

**Free Tier**: $5 credit/month (enough for 2-3 small apps)

---

## Troubleshooting

### Backend Issues

**"Application Error" on Render:**
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

**"Cannot connect to database":**
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
- Verify connection string format

### Frontend Issues

**"Network Error" when registering:**
- Check browser console (F12)
- Verify backend URL in AuthContext.tsx
- Check CORS settings in backend

**Build fails on Vercel:**
- Ensure `client` is set as root directory
- Check that all dependencies are in package.json
- Try deploying from CLI instead

### General Tips

**Render Free Tier Sleeps:**
- First request takes 30-50 seconds (cold start)
- Keep app awake: Use UptimeRobot.com to ping every 14 minutes

**Vercel Build Timeout:**
- If build takes too long, try removing unused dependencies
- Or upgrade to Vercel Pro (not necessary for this app)

---

## Cost Comparison

| Platform | Frontend | Backend | Database | Total |
|----------|----------|---------|----------|-------|
| Vercel + Render | FREE | FREE | FREE (Atlas) | $0 |
| Railway | FREE | FREE | FREE (Atlas) | $0 |
| Netlify + Render | FREE | FREE | FREE (Atlas) | $0 |
| Cyclic | FREE | FREE | FREE (Atlas) | $0 |

All options are 100% FREE for your app size!

---

## After Deployment

### Update README.md
Replace these placeholders:
```markdown
**🚀 Live Application**: https://health-monitor-app.vercel.app
```

### Update Submission Form
```
Application URL: https://health-monitor-app.vercel.app
```

### Create Demo Account
1. Go to your live app
2. Register with:
   - Email: demo@healthmonitor.com
   - Password: demo123
3. Add 5-10 sample health records
4. Test all features

---

## Quick Commands Reference

### Vercel Deployment
```bash
cd client
npx vercel --prod
```

### Check Deployment Status
- Vercel: https://vercel.com/dashboard
- Render: https://dashboard.render.com
- Railway: https://railway.app/dashboard

### View Logs
- Render: Click service → "Logs" tab
- Vercel: Click deployment → "Logs"
- Railway: Click service → "Deployments" → Click deployment

---

## Need Help?

1. Check deployment logs for errors
2. Verify environment variables are set
3. Test backend URL directly in browser
4. Check MongoDB Atlas connection
5. Review CORS settings

**Common Error**: "Cannot read property of undefined"
→ Usually means environment variables aren't set correctly

**Common Error**: "Network Error"
→ Usually means CORS isn't configured or backend is down

---

## Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Can register new account
- [ ] Can login
- [ ] Can add health records
- [ ] Dashboard shows data
- [ ] All features working
- [ ] Demo account created
- [ ] URLs updated in README.md

---

**Estimated Total Time**: 15-20 minutes
**Cost**: $0 (100% FREE)

Good luck with deployment! 🚀
