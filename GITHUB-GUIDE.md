# Step-by-Step Guide: Push to GitHub

## Prerequisites
- Git installed on your computer ([Download Git](https://git-scm.com/download/win))
- GitHub account ([Sign up](https://github.com/signup))

## Method 1: Using the Automated Script (EASIEST)

1. **Double-click** `push-to-github.bat`
2. Follow the on-screen instructions
3. When prompted, create a new repository on GitHub
4. Copy the repository URL and paste it when asked
5. Done! Your website is now on GitHub

## Method 2: Manual Steps

### Step 1: Create GitHub Repository
1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `abc-digital-website`
3. Description: "ABC Digital Marketing Agency Website"
4. Choose: **Public** (or Private if you prefer)
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

### Step 2: Initialize Local Repository
Open Command Prompt in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: ABC Digital Marketing Agency Website"
git branch -M main
```

### Step 3: Connect to GitHub
Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/abc-digital-website.git
git push -u origin main
```

### Step 4: Verify Upload
1. Go to your GitHub repository
2. Refresh the page
3. You should see all your files!

## Enable GitHub Pages (Make Website Live)

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait 1-2 minutes
7. Your site will be live at: `https://YOUR_USERNAME.github.io/abc-digital-website`

## Updating Your Website

After making changes to your local files:

```bash
git add .
git commit -m "Description of changes"
git push
```

Your GitHub Pages site will automatically update in 1-2 minutes.

## Troubleshooting

### "Git is not recognized"
- Install Git from: https://git-scm.com/download/win
- Restart Command Prompt after installation

### "Permission denied"
- Make sure you're logged into GitHub
- Use HTTPS URL (not SSH) if you haven't set up SSH keys

### "Repository already exists"
- Use a different repository name
- Or delete the existing repository and try again

### Website not loading on GitHub Pages
- Make sure `index.html` is in the root folder
- Check that GitHub Pages is enabled in Settings
- Wait a few minutes for deployment

## Need Help?

- GitHub Documentation: https://docs.github.com
- Git Documentation: https://git-scm.com/doc
- Contact your development team

---

**Good luck! 🚀**
