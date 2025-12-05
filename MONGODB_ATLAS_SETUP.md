# MongoDB Atlas Cloud Setup Guide

## Step-by-Step Connection Guide

### Step 1: Get Your Connection String

1. **Go to MongoDB Atlas Dashboard** (https://cloud.mongodb.com)
2. **Click "Connect"** on your cluster
3. **Choose "Drivers"** (or "Connect your application")
4. **Select:**
   - Driver: Node.js
   - Version: 5.5 or later
5. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 2: Configure Network Access

**IMPORTANT:** You must allow your IP address to connect!

1. In Atlas, click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Choose one:
   - **"Add Current IP Address"** (your current IP)
   - **"Allow Access from Anywhere"** (0.0.0.0/0) - easier for development
4. Click **"Confirm"**

### Step 3: Verify Database User

1. Click **"Database Access"** (left sidebar)
2. Make sure you have a user with:
   - Username (e.g., "admin", "myuser")
   - Password (you set this during creation)
   - Role: "Atlas admin" or "Read and write to any database"

If you don't have a user:
- Click "Add New Database User"
- Choose "Password" authentication
- Set username and password (remember these!)
- Select "Built-in Role: Atlas admin"
- Click "Add User"

### Step 4: Update Your .env File

1. Open the `.env` file in your project root
2. Replace the `MONGODB_URI` line with your connection string
3. **Important replacements:**
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add `/health-monitor` before the `?` to specify database name

**Example:**

If your connection string is:
```
mongodb+srv://myuser:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

And your password is `MyPass123`, update it to:
```
MONGODB_URI=mongodb+srv://myuser:MyPass123@cluster0.abc123.mongodb.net/health-monitor?retryWrites=true&w=majority
```

**Your .env file should look like:**
```env
PORT=3000
MONGODB_URI=mongodb+srv://myuser:MyPass123@cluster0.abc123.mongodb.net/health-monitor?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

### Step 5: Test Connection

1. Save the `.env` file
2. Run the backend:
   ```cmd
   start-backend.bat
   ```
3. You should see:
   ```
   MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
   Server running on port 3000
   ```

## Common Issues & Solutions

### Error: "MongoServerError: bad auth"
- **Problem:** Wrong username or password
- **Solution:** 
  - Check your Database Access in Atlas
  - Verify username and password are correct
  - Make sure password doesn't contain special characters like `@`, `:`, `/`
  - If it does, URL encode them:
    - `@` becomes `%40`
    - `:` becomes `%3A`
    - `/` becomes `%2F`

### Error: "MongoServerError: IP not in whitelist"
- **Problem:** Your IP address is not allowed
- **Solution:**
  - Go to Network Access in Atlas
  - Add your current IP or allow 0.0.0.0/0

### Error: "Could not connect to any servers"
- **Problem:** Network issue or wrong connection string
- **Solution:**
  - Check your internet connection
  - Verify the connection string is correct
  - Make sure you added `/health-monitor` before the `?`

### Error: "Authentication failed"
- **Problem:** User doesn't have proper permissions
- **Solution:**
  - Go to Database Access
  - Edit user and set role to "Atlas admin"

## Verify Everything Works

1. **Start Backend:**
   ```cmd
   start-backend.bat
   ```
   Look for: "MongoDB Connected: ..."

2. **Start Frontend:**
   ```cmd
   start-frontend.bat
   ```

3. **Open Browser:**
   http://localhost:5173

4. **Register a New User:**
   - Create an account
   - If successful, your MongoDB Atlas is working!

5. **Check Data in Atlas:**
   - Go to Atlas Dashboard
   - Click "Browse Collections"
   - You should see `health-monitor` database
   - With `users` collection containing your new user

## Benefits of MongoDB Atlas

✅ No local installation needed
✅ Automatic backups
✅ Free tier (512MB storage)
✅ Accessible from anywhere
✅ Automatic scaling
✅ Built-in monitoring

## Next Steps

Once connected:
1. Run `start-all.bat` to start everything
2. Register your first user
3. Start tracking your health data!

Your data is now stored securely in the cloud! 🎉
