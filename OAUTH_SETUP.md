# OAuth Setup Guide for Career Compass

## Google OAuth Configuration

### 1. Supabase Dashboard Setup

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Find **Google** and click **Enable**
4. You'll need to configure:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)

### 2. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API** and **Google OAuth2 API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Configure the OAuth consent screen:
   - Application name: "Career Compass"
   - Authorized domains: Add your domain
6. Create OAuth 2.0 Client ID:
   - Application type: **Web application**
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://your-domain.com` (for production)
   - Authorized redirect URIs:
     - `https://your-supabase-project.supabase.co/auth/v1/callback`

### 3. Supabase Configuration

1. Copy the **Client ID** and **Client Secret** from Google Cloud Console
2. Paste them in your Supabase Google provider settings
3. Save the configuration

### 4. Environment Variables

Ensure these are set in your Vercel project:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
\`\`\`

### 5. Testing

1. Test in development first with `http://localhost:3000`
2. Ensure popup blockers are disabled
3. Check browser console for detailed error messages

## Troubleshooting

### "This content is blocked" Error

This usually means:
1. **OAuth not configured**: Google provider not enabled in Supabase
2. **Wrong redirect URI**: Mismatch between Google Cloud Console and Supabase
3. **Domain not authorized**: Your domain not added to Google OAuth settings
4. **Popup blocked**: Browser blocking the OAuth popup

### Common Solutions

1. **Check Supabase Auth URL**: Should be `https://your-project.supabase.co/auth/v1/callback`
2. **Verify domains**: Ensure all domains are added to Google Cloud Console
3. **Clear browser cache**: Sometimes cached OAuth settings cause issues
4. **Test in incognito**: Rules out browser extension interference

### Debug Steps

1. Open browser developer tools
2. Check console for detailed error messages
3. Verify network requests to Supabase auth endpoints
4. Test with different browsers
</markdown>
