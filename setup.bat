@echo off
echo ========================================
echo Health Monitor App Setup
echo ========================================
echo.

echo Step 1: Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b %errorlevel%
)
echo Backend dependencies installed successfully!
echo.

echo Step 2: Installing frontend dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    cd ..
    pause
    exit /b %errorlevel%
)
cd ..
echo Frontend dependencies installed successfully!
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To run the application:
echo 1. Open TWO command prompt windows
echo 2. In first window, run: npm run dev
echo 3. In second window, run: cd client ^&^& npm run dev
echo 4. Open browser to: http://localhost:5173
echo.
pause
