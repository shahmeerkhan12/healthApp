@echo off
echo ========================================
echo Health Monitor - Starting All Services
echo ========================================
echo.

echo Checking if MongoDB service is running...
sc query MongoDB | find "RUNNING" >nul
if %errorlevel% equ 0 (
    echo MongoDB is running!
) else (
    echo MongoDB is not running. Attempting to start...
    net start MongoDB
    if %errorlevel% neq 0 (
        echo.
        echo WARNING: Could not start MongoDB service!
        echo Please start MongoDB manually:
        echo   Option 1: Run 'mongod' in a separate terminal
        echo   Option 2: Run 'net start MongoDB' as Administrator
        echo.
        pause
        exit /b 1
    )
)
echo.

echo Starting Backend Server...
start "Health Monitor Backend" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

echo Starting Frontend Client...
start "Health Monitor Frontend" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo All services started!
echo ========================================
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Two new windows have opened for backend and frontend.
echo Close those windows to stop the servers.
echo.
pause
