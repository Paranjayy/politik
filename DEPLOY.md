# Deployment Setup Guide

## Project Already Linked to Vercel

Your project is already linked to Vercel:
- **Project ID:** `prj_vWFRuLrmgKxml1HlS5omMytpOl1R`
- **Org ID:** `team_wyB5r55qBEw65jPc3ukEtTsi`
- **Project Name:** `politik`

## Option 1: Enable Vercel GitHub Integration (Recommended)

This is the simplest approach for automatic deployments:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **politik** project
3. Navigate to **Settings** → **Git**
4. Click **Connect Git Repository**
5. Select **GitHub** and authorize access
6. Choose the repository: `Paranjayy/politik`
7. Configure deployment settings:
   - **Production Branch:** `main`
   - **Preview Deployments:** Enable for pull requests (optional)
8. Click **Save**

Once connected, every push to `main` will trigger an automatic production deployment.

## Option 2: GitHub Actions Workflow (Fallback)

If you prefer GitHub Actions, a workflow has been created at `.github/workflows/deploy.yml`.

### Required Secrets

Add these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

| Secret | Value |
|--------|-------|
| `VERCEL_TOKEN` | Your Vercel access token |
| `VERCEL_ORG_ID` | `team_wyB5r55qBEw65jPc3ukEtTsi` |
| `VERCEL_PROJECT_ID` | `prj_vWFRuLrmgKxml1HlS5omMytpOl1R` |

### Getting Your Vercel Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click **Create Token**
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token and add it as `VERCEL_TOKEN` in GitHub

### How It Works

- On every push to `main`, the workflow will:
  1. Checkout the code
  2. Set up Node.js 20
  3. Install dependencies with `npm ci`
  4. Run the build
  5. Deploy to Vercel production

## Verifying Deployment

After setting up either option:
1. Push a change to `main`
2. Check the [Vercel Dashboard](https://vercel.com/dashboard) for deployment status
3. Or check the GitHub Actions tab in your repository
