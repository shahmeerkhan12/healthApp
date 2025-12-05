@echo off
echo ========================================
echo Starting Backend with Debug Info
echo ========================================
echo.

echo Checking for .env file...
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Creating .env from .env.example...
    copy .env.example .env
)
echo.

echo Current directory: %CD%
echo.

echo Starting server...
echo If you see errors, they will be displayed below:
echo.

call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo ERROR OCCURRED!
    echo ========================================
    echo.
    echo Common issues:
    echo 1. MongoDB not running - Start MongoDB first
    echo 2. Port 3000 already in use - Close other apps using port 3000
    echo 3. Missing dependencies - Run: npm install
    echo.
    pause
)
