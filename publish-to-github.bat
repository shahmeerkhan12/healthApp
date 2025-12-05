@echo off
echo ========================================
echo Publishing Health Monitor App to GitHub
echo ========================================
echo.

REM Add Git to PATH for this session
set PATH=%PATH%;C:\Program Files\Git\bin

REM Check if Git is accessible
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not accessible. Please install Git or add it to your PATH.
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git found: 
git --version
echo.

REM Prompt for GitHub repository URL
set /p REPO_URL="Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): "

if "%REPO_URL%"=="" (
    echo ERROR: Repository URL cannot be empty.
    pause
    exit /b 1
)

echo.
echo Checking git status...
git status

echo.
echo Adding all files to git...
git add .

echo.
echo Committing changes...
git commit -m "Initial commit: Health Monitor App with full features"

echo.
echo Setting main branch...
git branch -M main

echo.
echo Adding remote origin...
git remote add origin %REPO_URL% 2>nul
if errorlevel 1 (
    echo Remote origin already exists, updating URL...
    git remote set-url origin %REPO_URL%
)

echo.
echo Pushing to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ERROR: Push failed. This might be because:
    echo 1. The repository already has content
    echo 2. Authentication failed
    echo 3. Network issues
    echo.
    echo Try running: git push -u origin main --force
    echo (Warning: --force will overwrite remote repository)
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Your project is now on GitHub
echo ========================================
echo Repository: %REPO_URL%
echo.
pause
