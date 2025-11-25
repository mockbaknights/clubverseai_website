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

