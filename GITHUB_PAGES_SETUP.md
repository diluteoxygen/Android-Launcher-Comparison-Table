# GitHub Pages Setup Instructions

This repository is now configured to work with GitHub Pages. Follow these steps to enable it:

## Enable GitHub Pages

1. Go to the repository settings on GitHub: https://github.com/diluteoxygen/Android-Launcher-Comparison-Table/settings/pages

2. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select "main" (or your default branch) and "/ (root)"
   - Click "Save"

3. Wait a few minutes for GitHub to build and deploy your site

4. Your site will be available at: **https://diluteoxygen.github.io/Android-Launcher-Comparison-Table/**

## Update Repository Description

To add the GitHub Pages link to your repository description:

1. Go to the main repository page: https://github.com/diluteoxygen/Android-Launcher-Comparison-Table

2. Click the ⚙️ (gear icon) next to "About" on the right side

3. In the "Description" field, add:
   ```
   The Definitive Android Launcher Comparison Table
   ```

4. Check the box "Use your GitHub Pages website"
   - This will automatically add the GitHub Pages URL to your repository

5. Optionally add topics/tags like: `android`, `launcher`, `comparison`, `table`

6. Click "Save changes"

## Verify the Setup

Once enabled, you can verify the site is working by visiting:
- https://diluteoxygen.github.io/Android-Launcher-Comparison-Table/

The interactive comparison table with search and filter functionality should load.

## What's Included

- ✅ `index.html` - Main HTML file with interactive comparison table
- ✅ `.nojekyll` - Prevents Jekyll processing (GitHub Pages default processor)
- ✅ `App Icons/` - Directory with launcher icons
- ✅ Updated `README.md` - Now includes link to GitHub Pages site

## Notes

- The `.nojekyll` file ensures GitHub Pages serves your HTML file directly without Jekyll processing
- No additional configuration files are needed
- The site will automatically update when you push changes to the main branch
