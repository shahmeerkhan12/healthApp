# MongoDB Setup Guide for Windows

## Quick Installation

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows x64
   - Click: Download

2. **Install:**
   - Run the `.msi` installer
   - Choose "Complete" installation type
   - Check "Install MongoDB as a Service"
   - Service Name: MongoDB
   - Check "Run service as Network Service user"
   - Install MongoDB Compass (optional but helpful)

3. **Verify Installation:**
   ```cmd
   mongod --version
   ```

## Starting MongoDB

### Method 1: Windows Service (Automatic)
If you installed MongoDB as a service, it starts automatically. To check:

```cmd
sc query MongoDB
```

To start/stop manually:
```cmd
net start MongoDB
net stop MongoDB
```

### Method 2: Manual Start
Open CMD and run:
```cmd
mongod
```
Keep this window open while using the app.

## Verify MongoDB is Running

Open a new CMD window:
```cmd
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/
```

Type `exit` to leave the MongoDB shell.

## Troubleshooting

### Error: "MongoDB service not found"
- MongoDB wasn't installed as a service
- Solution: Run `mongod` manually in a CMD window

### Error: "Data directory not found"
- Create the data directory:
  ```cmd
  mkdir C:\data\db
  ```
- Then run `mongod` again

### Error: "Port 27017 already in use"
- MongoDB is already running
- Or another app is using port 27017
- Check with: `netstat -ano | findstr :27017`

### Can't connect to MongoDB
1. Check if MongoDB is running: `sc query MongoDB`
2. Check if port is open: `netstat -ano | findstr :27017`
3. Try restarting: `net stop MongoDB && net start MongoDB`

## MongoDB Compass (GUI Tool)

If you installed MongoDB Compass:
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You'll see your `health-monitor` database after creating your first user

## Default Connection String

Your app uses:
```
mongodb://localhost:27017/health-monitor
```

This is already configured in your `.env` file.

## Next Steps

Once MongoDB is running:
1. Run `start-all.bat` to start everything
2. Or manually start backend and frontend in separate terminals
3. Register a new user at http://localhost:5173
