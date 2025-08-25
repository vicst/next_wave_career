# NextWave Careers

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/victorrrst-8757s-projects/v0-next-wave-careers)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/AeOnlJ7F4jb)

## Overview

Career Compass is a trilingual (English/Spanish/Romanian) career guidance web application using the Holland RIASEC personality test. Users can take the assessment anonymously or create accounts for premium features and result saving.

## Features

- **RIASEC Personality Assessment**: 60-question career assessment based on Holland's theory
- **Social Authentication**: Google, Apple, Facebook login with Supabase Auth
- **Trilingual Support**: Full UI and content in English, Spanish, and Romanian
- **Anonymous Testing**: Take assessments without account creation
- **Premium Features**: Advanced career recommendations and result saving
- **Responsive Design**: Works on all devices with accessible UI

## Authentication Setup

### Environment Variables

Add these environment variables in your v0.app project settings:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
\`\`\`

### Supabase Configuration

1. **Enable Auth Providers** in your Supabase dashboard:
   - Go to Authentication > Providers
   - Enable Google, Facebook, and Apple providers

### Provider Setup Instructions

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Configure OAuth consent screen
6. Add these redirect URIs:
   \`\`\`
   https://your-supabase-project.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback (for development)
   \`\`\`
7. Add these authorized origins:
   \`\`\`
   https://your-domain.com
   http://localhost:3000 (for development)
   \`\`\`
8. Copy Client ID and Client Secret to Supabase Auth > Providers > Google

#### Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select existing one
3. Add Facebook Login product
4. In Facebook Login settings, add these Valid OAuth Redirect URIs:
   \`\`\`
   https://your-supabase-project.supabase.co/auth/v1/callback
   \`\`\`
5. Copy App ID and App Secret to Supabase Auth > Providers > Facebook
6. Required permissions: `email`, `public_profile`

#### Apple OAuth Setup

1. Go to [Apple Developer](https://developer.apple.com/)
2. Create a new App ID with Sign In with Apple capability
3. Create a Services ID for web authentication
4. Configure domains and subdomains:
   \`\`\`
   your-domain.com
   your-supabase-project.supabase.co
   \`\`\`
5. Add return URLs:
   \`\`\`
   https://your-supabase-project.supabase.co/auth/v1/callback
   \`\`\`
6. Generate a private key for Sign In with Apple
7. Copy Team ID, Key ID, Client ID, and Private Key to Supabase Auth > Providers > Apple

### Database Setup

Run these SQL scripts in order in your Supabase SQL editor:

1. `scripts/01-create-tables.sql` - Creates database schema
2. `scripts/02-seed-questions.sql` - Adds RIASEC questions
3. `scripts/03-seed-jobs.sql` - Adds traditional job data
4. `scripts/04-seed-future-jobs.sql` - Adds future job data
5. `scripts/05-update-existing-tables.sql` - Adds Romanian language support

## Testing Guide

### Testing Social Login

1. **Google Login**:
   - Click "Continuă cu Google" button
   - Should redirect to Google OAuth
   - After approval, redirects to `/auth/callback`
   - Should create user session and redirect to `/dashboard`

2. **Facebook Login**:
   - Click "Continuă cu Facebook" button
   - Should redirect to Facebook OAuth
   - Verify email permission is granted
   - Should create user session after approval

3. **Apple Login**:
   - Click "Continuă cu Apple" button
   - Should redirect to Apple OAuth
   - Works on both iOS Safari and desktop browsers
   - Should handle email hiding option properly

### Testing Email Authentication

1. **Email + Password**:
   - Use auth modal email form
   - Test both signup and signin flows
   - Verify email confirmation emails are sent

2. **Magic Link**:
   - Check "Folosește link magic" option
   - Enter email and submit
   - Check email for magic link
   - Click link should authenticate user

### Error Testing

1. **Network Errors**: Disconnect internet during auth flow
2. **Invalid Credentials**: Use wrong email/password
3. **Cancelled OAuth**: Cancel provider OAuth flow
4. **Expired Sessions**: Test session refresh

### Security Checklist

- ✅ HTTPS enforced in production
- ✅ PKCE flow used for OAuth
- ✅ State parameter validation
- ✅ Secure httpOnly cookies for sessions
- ✅ CSRF protection via Supabase middleware
- ✅ No service role keys in client code
- ✅ Proper redirect URI validation

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
\`\`\`

## Deployment

Your project is live at:

**[https://vercel.com/victorrrst-8757s-projects/v0-next-wave-careers](https://vercel.com/victorrrst-8757s-projects/v0-next-wave-careers)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/AeOnlJ7F4jb](https://v0.app/chat/projects/AeOnlJ7F4jb)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Support

For issues with authentication setup:
1. Check Supabase logs in Dashboard > Logs
2. Verify environment variables are set correctly
3. Ensure provider credentials match exactly
4. Test redirect URIs are properly configured
