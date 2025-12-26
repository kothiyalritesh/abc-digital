# HOW TO VIEW YOUR WEBSITE

## The Problem
The header and footer aren't showing when you open HTML files directly because browsers block loading external files (header.html, footer.html) for security reasons (CORS policy).

## The Solution
You need to run a local web server. I've created an easy way to do this:

## Method 1: Double-Click to Start (EASIEST)
1. Double-click `START-WEBSITE.bat`
2. Your browser will open automatically
3. The website will work perfectly with header and footer!

## Method 2: Manual Start
1. Open Command Prompt in this folder
2. Run: `python start-server.py`
3. Open browser and go to: http://localhost:8000

## Method 3: Using Python directly
```bash
python -m http.server 8000
```
Then open: http://localhost:8000

## To Stop the Server
Press `Ctrl + C` in the command prompt window

## Why This Works
- The local server serves your files properly
- No CORS restrictions
- Header and footer load correctly
- All JavaScript works as expected

## For Production/Live Website
When you upload to a real web server (hosting), this will work automatically. The CORS issue only happens when opening files directly from your computer.

## Troubleshooting

**Q: "Python is not recognized"**
- Install Python from python.org
- Or use any other local server (XAMPP, WAMP, Live Server extension in VS Code)

**Q: Port 8000 already in use**
- Edit `start-server.py` and change `PORT = 8000` to `PORT = 8080` or any other number

**Q: Still not working?**
- Make sure all files are in the same folder
- Check that header.html and footer.html exist
- Check browser console (F12) for errors
