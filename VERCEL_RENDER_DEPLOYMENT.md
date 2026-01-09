# Deploy to Vercel + Render - Complete Guide

Follow these steps exactly to deploy your Health Monitor App for FREE!

---

## 🎯 What We're Doing

- **Backend** → Render.com (FREE)
- **Frontend** → Vercel.com (FREE)
- **Database** → MongoDB Atlas (Already set up ✅)

**Total Cost**: $0 (100% FREE)

---

## Part 1: Push Code to GitHub (5 minutes)

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click "+" (top right) → "New repository"
3. Name: `health-monitor-app`
4. Description: "Health monitoring app built with Kiro AI"
5. **Public** (required for submission)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

### Step 2: Push Your Code

Open CMD in your project folder and run:

```cmd
git init
git add .
git commit -m "Initial commit: Health Monitor App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/health-monitor-app.git
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your GitHub username!

**Verify**: Go to your GitHub repo and confirm all files are there, including `.kiro` directory.

---

## Part 2: Deploy Backend to Render (10 minutes)

### Step 1: Sign Up for Render

1. Go to https://render.com
2. Click "Get Started for Free"
3. Click "GitHub" to sign up with GitHub
4. Authorize Render to access your repositories

### Step 2: Create Web Service

1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect account" if needed
4. Find `health-monitor-app` in the list
5. Click "Connect"

### Step 3: Configure Service

Fill in these settings:

**Name**: `health-monitor-backend`

**Region**: Choose closest to you (e.g., Oregon USA, Frankfurt EU)

**Branch**: `main`

**Root Directory**: (leave empty)

**Runtime**: `Node`

**Build Command**:
```
npm install && npm run build
```

**Start Command**:
```
npm start
```

**Instance Type**: `Free`

### Step 4: Add Environment Variables

Click "Add Environment Variable" and add these:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `health_monitor_secret_key_2024_change_in_production` |
| `JWT_EXPIRES_IN` | `7d` |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |

**Get your MongoDB URI from `.env` file!**

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. You'll see logs scrolling
4. Wait for "Your service is live 🎉"
5. **Copy your backend URL** (looks like: `https://health-monitor-backend.onrender.com`)

**Save this URL!** You'll need it for the frontend.

### Step 6: Test Backend

Open your backend URL in browser:
```
https://health-monitor-backend.onrender.com
```

You should see:
```json
{"message":"Health Monitor API","version":"1.0.0"}
```

✅ **Backend is live!**

---

## Part 3: Update Frontend for Production (5 minutes)

### Step 1: Update API URL

1. Open `client/.env.production` file
2. Replace the URL with your Render backend URL:

```env
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com
```

**Example**:
```env
VITE_API_URL=https://health-monitor-backend.onrender.com
```

### Step 2: Update CORS in Backend

1. Open `src/index.ts`
2. Find the CORS section
3. Update to include your Vercel URL (we'll add it after deployment):

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://health-monitor-app.vercel.app',  // Your Vercel URL
    'https://*.vercel.app'  // All Vercel preview deployments
  ],
  credentials: true
}));
```

### Step 3: Commit and Push

```cmd
git add .
git commit -m "Configure production URLs"
git push origin main
```

Render will automatically redeploy your backend (wait 2 minutes).

---

## Part 4: Deploy Frontend to Vercel (10 minutes)

### Step 1: Sign Up for Vercel

1. Go to https://vercel.com
2. Click "Sign Up"
3. Click "Continue with GitHub"
4. Authorize Vercel

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Find `health-monitor-app` in the list
3. Click "Import"

### Step 3: Configure Project

**Framework Preset**: Vite (should auto-detect)

**Root Directory**: Click "Edit" → Type `client` → Click "Continue"

**Build Settings**:
- Build Command: `npm run build` (auto-filled)
- Output Directory: `dist` (auto-filled)
- Install Command: `npm install` (auto-filled)

**Environment Variables**:
Click "Add" and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | Your Render backend URL |

**Example**:
```
VITE_API_URL = https://health-monitor-backend.onrender.com
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. You'll see build logs
4. Wait for "Congratulations! 🎉"
5. Click "Visit" or copy your URL

**Your frontend URL** will look like:
```
https://health-monitor-app.vercel.app
```

Or:
```
https://health-monitor-app-YOUR-USERNAME.vercel.app
```

### Step 5: Update CORS (Important!)

Now that you have your Vercel URL, update the backend CORS:

1. Go back to your code
2. Open `src/index.ts`
3. Update CORS with your actual Vercel URL:

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://health-monitor-app-YOUR-USERNAME.vercel.app',  // Your actual URL
    'https://*.vercel.app'
  ],
  credentials: true
}));
```

4. Commit and push:
```cmd
git add .
git commit -m "Update CORS with Vercel URL"
git push origin main
```

5. Wait 2 minutes for Render to redeploy

---

## Part 5: Test Your Deployment (5 minutes)

### Step 1: Open Your App

Go to your Vercel URL:
```
https://health-monitor-app-YOUR-USERNAME.vercel.app
```

### Step 2: Test Registration

1. Click "Register"
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Click "Register"

**If it works**: You'll be redirected to the dashboard! ✅

**If it fails**: 
- Open browser console (F12)
- Check for errors
- Most common: CORS error (update CORS in backend)

### Step 3: Test All Features

- [ ] Add a health record
- [ ] View dashboard
- [ ] Download health report
- [ ] Schedule an activity
- [ ] View diet recommendations

### Step 4: Create Demo Account

1. Logout
2. Register with:
   - Name: Demo User
   - Email: demo@healthmonitor.com
   - Password: demo123
3. Add 5-10 sample health records with different dates
4. This is for judges to test your app!

---

## Part 6: Update Documentation (5 minutes)

### Update README.md

1. Open `README.md`
2. Find these lines and update:

```markdown
**🚀 Live Application**: https://YOUR-VERCEL-URL.vercel.app

**🔑 Demo Credentials**
For testing purposes, you can use:
- **Email**: demo@healthmonitor.com
- **Password**: demo123
```

3. Save and push:
```cmd
git add README.md
git commit -m "Add deployment URLs"
git push origin main
```

---

## 🎉 You're Done!

Your app is now live at:
- **Frontend**: https://YOUR-VERCEL-URL.vercel.app
- **Backend**: https://YOUR-RENDER-URL.onrender.com

---

## 📝 Important Notes

### Render Free Tier
- **Sleeps after 15 minutes** of inactivity
- **First request** takes 30-50 seconds to wake up
- **Solution**: Use UptimeRobot.com to ping every 14 minutes (optional)

### Vercel Free Tier
- **Unlimited bandwidth**
- **No sleep**
- **Fast CDN**
- **Perfect for frontend**

### MongoDB Atlas
- Already configured ✅
- Make sure IP whitelist includes `0.0.0.0/0`

---

## 🐛 Troubleshooting

### "Network Error" when registering

**Problem**: Frontend can't reach backend

**Solutions**:
1. Check backend is awake (visit backend URL)
2. Verify CORS includes your Vercel URL
3. Check environment variable `VITE_API_URL` in Vercel
4. Look at browser console (F12) for exact error

### "Cannot connect to database"

**Problem**: Backend can't reach MongoDB

**Solutions**:
1. Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
2. Verify `MONGODB_URI` in Render environment variables
3. Check Render logs for exact error

### Build fails on Vercel

**Problem**: Build errors

**Solutions**:
1. Verify `client` is set as root directory
2. Check all dependencies are in `client/package.json`
3. Look at build logs for specific error
4. Try deploying from CLI: `cd client && npx vercel --prod`

### CORS Error

**Problem**: "Access-Control-Allow-Origin" error

**Solution**:
1. Update `src/index.ts` CORS to include your Vercel URL
2. Push to GitHub
3. Wait for Render to redeploy (2 minutes)
4. Clear browser cache and try again

---

## 🔄 Making Updates

### Update Frontend
1. Make changes in `client/` folder
2. Commit and push to GitHub
3. Vercel auto-deploys (1-2 minutes)

### Update Backend
1. Make changes in `src/` folder
2. Commit and push to GitHub
3. Render auto-deploys (2-3 minutes)

---

## 📊 Deployment URLs for Submission

Copy these for your submission form:

**Repository URL**:
```
https://github.com/YOUR_USERNAME/health-monitor-app
```

**Application URL**:
```
https://YOUR-VERCEL-URL.vercel.app
```

**Demo Credentials**:
```
Email: demo@healthmonitor.com
Password: demo123
```

---

## ✅ Final Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Can register new account
- [ ] Can login
- [ ] Can add health records
- [ ] Dashboard shows data
- [ ] All features working
- [ ] Demo account created with sample data
- [ ] URLs updated in README.md
- [ ] CORS configured correctly

---

## 🎥 Next Steps

1. ✅ Deployment complete
2. 📹 Record 3-minute demo video
3. 📤 Submit to competition

**Congratulations!** Your app is live! 🚀

---

## 💡 Pro Tips

### Keep Backend Awake
Use UptimeRobot (free):
1. Go to https://uptimerobot.com
2. Add monitor for your Render URL
3. Check every 14 minutes
4. Backend stays awake!

### Custom Domain (Optional)
- Vercel: Settings → Domains → Add your domain
- Render: Settings → Custom Domain → Add your domain

### View Logs
- **Render**: Dashboard → Your service → Logs tab
- **Vercel**: Dashboard → Your project → Deployments → Click deployment → Logs

---

Need help? Check the logs first - they usually tell you exactly what's wrong!
