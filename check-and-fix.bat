@echo off
echo ========================================
echo Health Monitor - Checking for Issues
echo ========================================
echo.

echo Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)

echo Checking npm installation...
npm --version
if %errorlevel% neq 0 (
    echo ERROR: npm not found!
    pause
    exit /b 1
)
echo.

echo Checking if node_modules exists...
if not exist "node_modules\" (
    echo node_modules not found. Installing backend dependencies...
    call npm install
)
echo.

echo Checking if client/node_modules exists...
if not exist "client\node_modules\" (
    echo client/node_modules not found. Installing frontend dependencies...
    cd client
    call npm install
    cd ..
)
echo.

echo Checking MongoDB connection...
echo Make sure MongoDB is running before starting the backend!
echo.
echo Options:
echo 1. Local MongoDB: Run 'mongod' in another terminal
echo 2. MongoDB Atlas: Update MONGODB_URI in .env file
echo.

echo ========================================
echo System Check Complete!
echo ========================================
echo.
echo To start the app:
echo 1. Make sure MongoDB is running
echo 2. Run: start-backend.bat (in one terminal)
echo 3. Run: start-frontend.bat (in another terminal)
echo.
pause
