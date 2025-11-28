# Environment Variables Setup

Add these to your `.env.local` file (or Vercel environment variables):

```bash
# Resend.com API Key for sending emails
RESEND_KEY=re_xxxxxxxxxxxxx

# WhatsApp Cloud API credentials
# Get these from https://developers.facebook.com/apps/
WHATSAPP_TOKEN=your_whatsapp_access_token
WHATSAPP_PHONE_ID=your_phone_number_id

# Your WhatsApp number (format: country code + number, e.g., 14155551234)
MY_WHATSAPP_NUMBER=14155551234

# Email address to receive contact form submissions
CLUB_EMAIL=hello@clubverse.com

# For Resend free tier testing: Use your verified email address
# Resend free tier only allows sending to verified email addresses
# Set this to your verified email (e.g., mcmurrich@gmail.com) for testing
# Leave empty to use CLUB_EMAIL (requires domain verification in Resend)
RESEND_TO_EMAIL=mcmurrich@gmail.com

# Groq API Key for Answers page (RAG-powered chat)
# Get from https://console.groq.com/
GROQ_API_KEY=gsk_xxxxxxxxxxxxx

# GitHub Token for accessing private repositories (Answers page RAG)
# Create at https://github.com/settings/tokens
# Needs 'repo' scope for private repos
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx

# GitHub organization/username (optional, defaults to "your-org")
GITHUB_OWNER=your-org

# GitHub repository to index (optional, defaults to clubverse-core-v5)
# Note: Only the first repo in the list is used
GITHUB_REPOS=clubverse-core-v5
```

## Getting WhatsApp Cloud API Credentials

1. Go to https://developers.facebook.com/apps/
2. Create or select your app
3. Add WhatsApp product
4. Get your Phone Number ID and Access Token
5. Add them to your environment variables

## Getting Resend API Key

1. Sign up at https://resend.com
2. Go to API Keys section
3. Create a new API key
4. Add it to your environment variables

## Getting Groq API Key (for Answers Page)

1. Sign up at https://console.groq.com/
2. Go to API Keys section
3. Create a new API key
4. Add it to your environment variables as `GROQ_API_KEY`

## Getting GitHub Token (for Answers Page RAG)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Clubverse Answers RAG"
4. Select the `repo` scope (for private repos)
5. Generate and copy the token
6. Add it to your environment variables as `GITHUB_TOKEN`

**Note:** The RAG system will automatically index your codebase on first use. This may take a few minutes depending on repository size. Embeddings are cached in memory and refresh every hour or on deploy.

