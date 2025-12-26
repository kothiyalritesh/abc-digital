@echo off
echo ========================================
echo   Push ABC Digital Website to GitHub
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: ABC Digital Marketing Agency Website"

echo.
echo Step 4: Setting up main branch...
git branch -M main

echo.
echo ========================================
echo   IMPORTANT: GitHub Repository Setup
echo ========================================
echo.
echo Please follow these steps:
echo.
echo 1. Go to https://github.com/new
echo 2. Create a new repository named: abc-digital-website
echo 3. DO NOT initialize with README, .gitignore, or license
echo 4. Copy the repository URL (it will look like: https://github.com/YOUR_USERNAME/abc-digital-website.git)
echo.
set /p REPO_URL="Paste your GitHub repository URL here: "

echo.
echo Step 5: Adding remote repository...
git remote add origin %REPO_URL%

echo.
echo Step 6: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   SUCCESS! Website pushed to GitHub
echo ========================================
echo.
echo Your website is now on GitHub at:
echo %REPO_URL%
echo.
echo To view it online, you can:
echo 1. Enable GitHub Pages in repository settings
echo 2. Your site will be live at: https://YOUR_USERNAME.github.io/abc-digital-website
echo.
pause
