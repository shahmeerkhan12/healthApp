# Setup Guide

Follow these steps to get your Health Monitor app running.

## Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Download the LTS version for Windows
3. Run the installer
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## Step 2: Install MongoDB

### Option A: Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Start MongoDB service

### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env` file with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health-monitor
   ```

## Step 3: Install Backend Dependencies

```bash
npm install
```

This installs:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- TypeScript and type definitions

## Step 4: Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

This installs:
- react
- react-router-dom
- axios
- vite
- TypeScript

## Step 5: Configure Environment

The `.env` file is already created. Update if needed:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/health-monitor
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

**Important**: Change `JWT_SECRET` to a random string for production!

## Step 6: Run the Application

### Terminal 1 - Backend Server
```bash
npm run dev
```
Server will start on http://localhost:3000

### Terminal 2 - Frontend Client
```bash
cd client
npm run dev
```
Client will start on http://localhost:5173

## Step 7: Access the App

Open your browser and go to: http://localhost:5173

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your connection string in `.env`
- For Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change PORT in `.env` for backend
- Change port in `client/vite.config.ts` for frontend

### Module Not Found
- Run `npm install` in root directory
- Run `npm install` in client directory

### TypeScript Errors
- Run `npm run build` to check for compilation errors
- Ensure all dependencies are installed

## Next Steps

1. Register a new account
2. Start logging your health data
3. Explore the dashboard and features
4. Customize the app to your needs

## Development Tips

- Backend hot-reload is enabled with ts-node
- Frontend hot-reload is enabled with Vite
- Check browser console for frontend errors
- Check terminal for backend errors
- Use MongoDB Compass to view database contents

## Production Deployment

For production:
1. Build frontend: `cd client && npm run build`
2. Serve static files from Express
3. Use environment variables for sensitive data
4. Enable HTTPS
5. Use a process manager like PM2
6. Set up proper logging
7. Configure CORS properly
8. Use MongoDB Atlas for database
