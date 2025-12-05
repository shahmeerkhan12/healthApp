# Deployment Guide

This guide will help you deploy the Health Monitor App to production.

## Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (free tier available)
- Hosting platform account (Vercel, Netlify, Heroku, Railway, etc.)

## Option 1: Deploy to Vercel (Recommended for Frontend)

### Backend Deployment (Railway/Render)

1. **Create account on Railway.app or Render.com**

2. **Connect your GitHub repository**

3. **Configure environment variables:**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_random_string
   PORT=3000
   ```

4. **Set build command:**
   ```bash
   npm install && npm run build
   ```

5. **Set start command:**
   ```bash
   npm start
   ```

6. **Deploy and note your backend URL**

### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to client directory:**
   ```bash
   cd client
   ```

3. **Update API proxy in vite.config.ts:**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': {
           target: 'YOUR_BACKEND_URL', // Replace with Railway/Render URL
           changeOrigin: true
         }
       }
     }
   });
   ```

4. **Build the frontend:**
   ```bash
   npm run build
   ```

5. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

## Option 2: Deploy to Heroku

### Backend

1. **Create Heroku app:**
   ```bash
   heroku create health-monitor-backend
   ```

2. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_connection_string
   heroku config:set JWT_SECRET=your_secret
   ```

3. **Create Procfile:**
   ```
   web: npm start
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

### Frontend

1. **Update API endpoint in client/src/context/AuthContext.tsx:**
   ```typescript
   const API_URL = 'https://your-backend-url.herokuapp.com';
   ```

2. **Build and deploy:**
   ```bash
   cd client
   npm run build
   heroku create health-monitor-frontend
   git push heroku main
   ```

## Option 3: Deploy to Single Server (DigitalOcean/AWS)

### Setup

1. **SSH into your server**

2. **Install Node.js and MongoDB:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository:**
   ```bash
   git clone https://github.com/yourusername/health-monitor-app.git
   cd health-monitor-app
   ```

4. **Install dependencies:**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

5. **Build frontend:**
   ```bash
   cd client
   npm run build
   cd ..
   ```

6. **Serve frontend from Express:**
   Update `src/index.ts`:
   ```typescript
   import path from 'path';
   
   // After routes
   app.use(express.static(path.join(__dirname, '../client/dist')));
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
   });
   ```

7. **Use PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "health-monitor" -- start
   pm2 save
   pm2 startup
   ```

8. **Setup Nginx reverse proxy:**
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

## MongoDB Atlas Setup

1. **Create cluster at mongodb.com/cloud/atlas**

2. **Whitelist IP addresses:**
   - For development: Add your current IP
   - For production: Add 0.0.0.0/0 or your server IP

3. **Create database user:**
   - Username: admin (or your choice)
   - Password: Strong password
   - Role: Atlas admin

4. **Get connection string:**
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/health-monitor?retryWrites=true&w=majority
   ```

## Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health-monitor
JWT_SECRET=your_super_secret_key_min_32_characters_long
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

### Frontend
Update axios base URL in production:
```typescript
axios.defaults.baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com' 
  : 'http://localhost:3000';
```

## Post-Deployment Checklist

- [ ] Backend is accessible and returns API responses
- [ ] Frontend loads and displays correctly
- [ ] User registration works
- [ ] User login works
- [ ] Health records can be created
- [ ] Dashboard displays data correctly
- [ ] All API endpoints are functional
- [ ] HTTPS is enabled (use Let's Encrypt)
- [ ] Environment variables are secure
- [ ] Database backups are configured
- [ ] Monitoring is set up (optional)

## Testing Deployment

1. **Test registration:**
   ```bash
   curl -X POST https://your-app.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test123","name":"Test User"}'
   ```

2. **Test login:**
   ```bash
   curl -X POST https://your-app.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test123"}'
   ```

3. **Open browser and test full workflow**

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify environment variables are set
- Check logs: `heroku logs --tail` or `pm2 logs`

### Frontend can't connect to backend
- Verify CORS is enabled
- Check API URL is correct
- Ensure backend is running

### Database connection fails
- Verify IP whitelist in MongoDB Atlas
- Check connection string format
- Ensure database user has correct permissions

## Support

For issues, check:
- Backend logs
- Browser console (F12)
- Network tab for API calls
- MongoDB Atlas monitoring

## Security Notes

- Never commit .env files
- Use strong JWT secrets (min 32 characters)
- Enable HTTPS in production
- Regularly update dependencies
- Monitor for security vulnerabilities
