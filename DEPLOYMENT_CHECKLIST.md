# Deployment Checklist - Vercel + Render

Use this checklist to track your deployment progress.

---

## ✅ Pre-Deployment

- [ ] Code is working locally
- [ ] MongoDB Atlas is configured
- [ ] All features tested locally
- [ ] `.kiro` directory is present
- [ ] `.kiro` is NOT in `.gitignore`

---

## 📤 GitHub Setup

- [ ] Created GitHub repository (public)
- [ ] Repository name: `health-monitor-app`
- [ ] Pushed all code to GitHub
- [ ] Verified `.kiro` directory is in GitHub
- [ ] All files visible in repository

**Repository URL**: `https://github.com/YOUR_USERNAME/health-monitor-app`

---

## 🔧 Render (Backend) Deployment

- [ ] Signed up at render.com with GitHub
- [ ] Created new Web Service
- [ ] Connected GitHub repository
- [ ] Configured settings:
  - [ ] Name: `health-monitor-backend`
  - [ ] Build: `npm install && npm run build`
  - [ ] Start: `npm start`
  - [ ] Instance: Free
- [ ] Added environment variables:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] JWT_EXPIRES_IN
  - [ ] NODE_ENV
  - [ ] PORT
- [ ] Deployment successful
- [ ] Tested backend URL in browser
- [ ] Saw: `{"message":"Health Monitor API","version":"1.0.0"}`

**Backend URL**: `https://_____________________.onrender.com`

---

## 🎨 Vercel (Frontend) Deployment

- [ ] Signed up at vercel.com with GitHub
- [ ] Imported project from GitHub
- [ ] Configured settings:
  - [ ] Root Directory: `client`
  - [ ] Framework: Vite
  - [ ] Build: `npm run build`
  - [ ] Output: `dist`
- [ ] Added environment variable:
  - [ ] VITE_API_URL = (your Render backend URL)
- [ ] Deployment successful
- [ ] Opened frontend URL in browser
- [ ] Saw login/register page

**Frontend URL**: `https://_____________________.vercel.app`

---

## 🔗 CORS Configuration

- [ ] Updated `src/index.ts` with Vercel URL
- [ ] Committed changes
- [ ] Pushed to GitHub
- [ ] Render auto-redeployed (waited 2 minutes)
- [ ] Tested registration - works!

---

## 🧪 Testing Deployment

- [ ] Opened frontend URL
- [ ] Registered new account successfully
- [ ] Logged in successfully
- [ ] Added health record
- [ ] Viewed dashboard
- [ ] Downloaded health report
- [ ] Scheduled activity
- [ ] Viewed diet recommendations
- [ ] All features working!

---

## 👤 Demo Account

- [ ] Created demo account:
  - Email: demo@healthmonitor.com
  - Password: demo123
- [ ] Added 5-10 sample health records
- [ ] Tested demo login works
- [ ] All features accessible with demo account

---

## 📝 Documentation Updates

- [ ] Updated README.md with:
  - [ ] Live application URL
  - [ ] Demo credentials
- [ ] Committed and pushed changes
- [ ] Verified updates on GitHub

---

## 🎥 Video Recording

- [ ] Recorded 3-minute demo video
- [ ] Uploaded to YouTube/Vimeo
- [ ] Set video to PUBLIC
- [ ] Added video link to README.md
- [ ] Tested video link works

**Video URL**: `https://youtube.com/watch?v=___________________`

---

## 📤 Submission Preparation

- [ ] Repository URL ready
- [ ] Application URL ready
- [ ] Video URL ready
- [ ] Demo credentials ready
- [ ] Category selected: Health & Wellness
- [ ] Bonus category: AI-Powered Features
- [ ] KIRO_USAGE.md is comprehensive
- [ ] All documentation complete

---

## 🚀 Final Verification

- [ ] Repository is public
- [ ] `.kiro` directory visible in GitHub
- [ ] Application loads and works
- [ ] Demo account works
- [ ] Video is public and under 3 minutes
- [ ] All links work
- [ ] Ready to submit!

---

## 📋 Submission Form Data

**Repository URL**:
```
https://github.com/YOUR_USERNAME/health-monitor-app
```

**Application URL**:
```
https://YOUR-VERCEL-URL.vercel.app
```

**Video URL**:
```
https://youtube.com/watch?v=YOUR_VIDEO_ID
```

**Demo Credentials**:
```
Email: demo@healthmonitor.com
Password: demo123
```

**Category**: Health & Wellness

**Bonus Category**: AI-Powered Features

---

## 🎉 Completion Status

**Overall Progress**: _____ / 100%

**Estimated Time Remaining**: _____ minutes

**Ready to Submit**: YES / NO

---

## 📞 Quick Help

### If Backend Won't Deploy
- Check Render logs
- Verify MongoDB connection string
- Ensure all environment variables are set

### If Frontend Won't Deploy
- Verify `client` is root directory
- Check build logs in Vercel
- Ensure VITE_API_URL is set

### If Registration Fails
- Check browser console (F12)
- Verify CORS in backend includes Vercel URL
- Test backend URL directly

### If Demo Account Doesn't Work
- Re-register the demo account
- Verify credentials are correct
- Check if backend is awake (first request takes 30s)

---

**Good luck with your deployment!** 🚀

Follow VERCEL_RENDER_DEPLOYMENT.md for detailed step-by-step instructions.
