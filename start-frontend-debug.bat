@echo off
echo ========================================
echo Starting Frontend with Debug Info
echo ========================================
echo.

echo Current directory: %CD%
echo.

echo Navigating to client folder...
cd client

echo Starting Vite dev server...
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
    echo 1. Port 5173 already in use - Close other apps using port 5173
    echo 2. Missing dependencies - Run: cd client ^&^& npm install
    echo 3. TypeScript errors - Check the error messages above
    echo.
    cd ..
    pause
)
