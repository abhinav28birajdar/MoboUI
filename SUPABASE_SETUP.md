# MOBOUI - Supabase Setup Guide

This guide will walk you through setting up Supabase for the MOBOUI application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Supabase Project Setup](#supabase-project-setup)
3. [Database Configuration](#database-configuration)
4. [Authentication Setup](#authentication-setup)
5. [Storage Configuration](#storage-configuration)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
8. [Testing](#testing)

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available at https://supabase.com)
- Git installed

---

## Supabase Project Setup

### 1. Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in the project details:
   - **Project Name:** `moboui` (or your preferred name)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Select the region closest to your location
   - **Pricing Plan:** Select "Free" for development

4. Wait for the project to be created (2-3 minutes)

### 2. Get Your Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Copy the following credentials:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon (public) key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

---

## Database Configuration

### 1. Execute the Database Schema

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of `supabase-schema.sql` from your project root
4. Paste it into the SQL editor
5. Click **"Run"** button (or press Ctrl+Enter)

**Important:** This will create all tables, relationships, RLS policies, triggers, and seed data.

### 2. Verify the Schema

After the script completes:

1. Go to **Table Editor** (left sidebar)
2. You should see the following tables:
   - `profiles`
   - `categories`
   - `components`
   - `component_props`
   - `component_examples`
   - `themes`
   - `templates`
   - `favorites`
   - `submissions`
   - `activity_logs`
   - `audit_logs`
   - `user_settings`
   - `notifications`

### 3. Check Row Level Security (RLS)

1. Click on any table (e.g., `components`)
2. Go to the **Authentication** tab
3. Verify that **Enable RLS** toggle is **ON**
4. Check the **Policies** section to see the security rules

---

## Authentication Setup

### 1. Enable Email Authentication

1. Go to **Authentication** (left sidebar)
2. Click **Providers**
3. Make sure **Email** is enabled (should be by default)

### 2. Configure OAuth Providers (Optional)

For social login support (GitHub, Google), follow these steps:

#### GitHub OAuth

1. Go to **Settings** → **Developer settings** → **OAuth Apps** on GitHub
2. Create a new OAuth Application:
   - **Application name:** MOBOUI
   - **Homepage URL:** `http://localhost:3000` (development)
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback`
3. Copy the **Client ID** and **Client Secret**
4. In Supabase, go to **Authentication** → **Providers** → **GitHub**
5. Enable it and paste your credentials
6. Copy the callback URL provided and add it to your GitHub OAuth app settings

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Create **OAuth 2.0 Client ID**:
   - Application type: **Web application**
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback`
5. Copy the **Client ID** and **Client Secret**
6. In Supabase, go to **Authentication** → **Providers** → **Google**
7. Enable it and paste your credentials

### 3. Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize confirmation, reset password, and magic link templates as needed
3. Add your app's branding

---

## Storage Configuration

### 1. Create Storage Buckets

1. Go to **Storage** (left sidebar)
2. Click **Create a new bucket**
3. Create two buckets:

   **Bucket 1: uploads**
   - **Name:** `uploads`
   - **Privacy:** Public
   - Click **Create Bucket**

   **Bucket 2: code** (optional, for code file exports)
   - **Name:** `code`
   - **Privacy:** Public
   - Click **Create Bucket**

### 2. Set Storage Policies

For the `uploads` bucket:

1. Click on the `uploads` bucket
2. Go to the **Policies** tab
3. Click **Add Policy** → **For full customization, use SQL editor**
4. Create policies for:
   - **Allow public read**: `true` (for all users to view uploaded images)
   - **Allow authenticated insert**: Only authenticated users can upload
   - **Allow own delete**: Users can delete their own files

Example policy SQL:
```sql
-- Allow public read
CREATE POLICY "Public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads');

-- Allow authenticated upload
CREATE POLICY "Authenticated upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'uploads'
    AND auth.role() = 'authenticated'
  );

-- Allow own delete
CREATE POLICY "Own delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'uploads'
    AND owner = auth.uid()
  );
```

---

## Environment Variables

### 1. Create `.env.local` file

In your project root, create a `.env.local` file:

```bash
cp .env.example .env.local
```

### 2. Fill in the Variables

Edit `.env.local` and add your Supabase credentials:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# OAuth (Optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. For Production

Create a `.env.production` file with production URLs and keys (similar structure but with production URLs).

---

## Running the Application

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 3. Generate TypeScript Types (Optional)

To auto-generate TypeScript types from your Supabase schema:

```bash
npm install -D @supabase/supabase-js supabase
npx supabase gen types typescript --project-id your-project-id > src/lib/database.types.ts
```

---

## Testing

### 1. Test Authentication

1. Navigate to `/register`
2. Create a new account with email and password
3. You should see a confirmation flow
4. After confirmation, go to `/login`
5. Log in with your credentials
6. You should be redirected to `/account`

### 2. Test Project Submission

1. Make sure you're logged in
2. Go to `/submit`
3. Fill in the form:
   - **Project Title:** "My First App"
   - **Description:** "A test submission"
   - **Screenshot:** Upload an image
4. Click **Submit Project**
5. Check Supabase → **Table Editor** → **submissions** table
6. Your submission should appear there

### 3. Test Components API

1. Go to `/components`
2. The components should load from the database (or seed data if empty)
3. Test filtering by category and framework
4. Click on a component to see details

### 4. Test Favorites

1. Go to `/components`
2. Click the heart icon on a component
3. Go to `/favorites`
4. Your favorite should appear there

### 5. Test OAuth (if configured)

1. Go to `/login`
2. Click **GitHub** or **Google** button
3. You should be redirected to the provider's login
4. After authentication, you should be logged in

---

## Troubleshooting

### Issue: "Database connection failed"

**Solution:**
- Check that your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Verify the environment variables are loaded: Check browser console for errors
- Clear browser cache and restart dev server

### Issue: "RLS policy violation"

**Solution:**
- Check that RLS is enabled on the table
- Verify the policies match your use case
- Make sure you're logged in for authenticated operations

### Issue: "Storage file upload fails"

**Solution:**
- Check that the `uploads` bucket exists and is public
- Verify storage policies are configured
- Check file size is under the limit

### Issue: "OAuth not working"

**Solution:**
- Verify redirect URLs match exactly (including protocol and path)
- Check that Provider credentials are correct
- Make sure cookies are enabled in your browser
- Check browser console for CORS or other errors

### Issue: "Can't create new profiles after signup"

**Solution:**
- Check that the `handle_new_user` trigger is created
- Verify the trigger is active: Go to SQL Editor and check the trigger status
- Check the auth logs for errors

---

## Database Maintenance

### Backup Your Data

Supabase provides automated daily backups on the free tier. For manual backups:

1. Go to **Settings** → **Database** → **Backups**
2. Click **Create backup**

### Monitor Database Usage

1. Go to **Settings** → **Database** → **Usage**
2. Monitor storage and connections
3. Set up alerts for quota warnings

### View Logs

1. Go to **Database** → **Logs** to see query logs and errors
2. Use **Auth** → **Logs** to see authentication events

---

## Advanced Configuration

### Custom Email Templates

Customize email templates in **Authentication** → **Email Templates** for:
- Email confirmation
- Password reset
- Magic link sign-in

### Custom Claims

Add custom claims to JWT tokens by:
1. Creating functions in Supabase SQL
2. Setting up custom claims via auth.users() metadata

### Real-time Subscriptions

Subscribe to real-time changes:

```typescript
const subscription = supabase
  .from('components')
  .on('*', payload => {
    console.log('Change detected:', payload)
  })
  .subscribe();
```

---

## Next Steps

1. **Customize**: Update the seed data and categories for your specific use case
2. **Add Features**: Implement more advanced features like ratings, comments, etc.
3. **Optimize**: Set up indexes and views for better performance
4. **Monitor**: Set up alerts and monitoring for production
5. **Scale**: Consider Supabase Pro plan for higher limits and priority support

---

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase SQL](https://supabase.com/docs/guides/database/overview)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Next.js & Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

## Support

For issues or questions:
- Check the [Supabase Discord](https://discord.supabase.com)
- Review [Supabase GitHub Issues](https://github.com/supabase/supabase/issues)
- Check application logs: `npm run dev` and look for errors in console
