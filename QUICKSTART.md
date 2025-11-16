# Quick Start Guide - RFP Analyzer

## Prerequisites

- Node.js 18+ installed
- An LLM API key (Anthropic Claude or OpenAI)

## 5-Minute Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your API key
# For Anthropic (recommended):
LLM_API_KEY=sk-ant-api03-...your_key_here...
```

**Where to get API keys:**
- Anthropic: https://console.anthropic.com/ (free tier available)
- OpenAI: https://platform.openai.com/api-keys

### 3. Run the Dev Server

```bash
npm run dev
```

Open http://localhost:3000

### 4. Test It Out

Try pasting this sample RFP:

```
Subject: New E-commerce Website Project

Hi team,

We need a new e-commerce website for our artisan coffee brand. The main goals are:
- Increase online sales by 40%
- Provide excellent mobile shopping experience
- Integrate with our existing inventory system

Key deliverables:
1. Responsive website design (desktop + mobile)
2. Product catalog with 200+ items
3. Shopping cart and checkout flow
4. Integration with Stripe payment processing
5. Admin dashboard for managing products

Timeline:
- Design mockups: Due March 15
- Development complete: Due May 1
- Launch: May 15

Stakeholders:
- Sarah Johnson (CEO) - Final approvals
- Mike Chen (Marketing Director) - Content and branding
- Alex Rivera (IT Manager) - Technical integration

Please let me know if you have questions!
```

Click "Analyze Brief" and watch the magic happen!

## What's Next?

- See the full documentation in `RFP-ANALYZER-README.md`
- Set up ClickUp integration to auto-create tasks
- Deploy to Vercel for production use

## Troubleshooting

**"LLM_API_KEY is not set"**
- Make sure `.env.local` exists in the root directory
- Restart the dev server after creating the file

**Port 3000 already in use**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Build errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```
