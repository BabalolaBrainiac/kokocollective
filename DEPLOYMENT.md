# Deployment Guide

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Choose a name (e.g., "kokokollective")
4. Select a region close to your users (London for UK)
5. Wait for the project to be created

### 2. Set Up the Database

1. In your Supabase dashboard, go to the **SQL Editor**
2. Click **New query**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run**

### 3. Set Up Storage

1. Go to **Storage** in the sidebar
2. Click **New bucket**
3. Name: `event-images`
4. Check **Public bucket**
5. Click **Save**

### 4. Get Your API Keys

1. Go to **Project Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy:
   - **Project URL** (for `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** API key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/kokokollective.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_ADMIN_EMAIL=admin@kokokollective.com
   NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
   ```
6. Click **Deploy**

### 3. Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** > **Domains**
3. Add your domain (kokokollective.com)
4. Follow the DNS configuration instructions

## Post-Deployment Checklist

- [ ] Visit the live site and test all pages
- [ ] Test the admin login at `/admin`
- [ ] Create a test event
- [ ] Upload test images
- [ ] Test Eventbrite ticket links
- [ ] Test dark mode toggle
- [ ] Test mobile responsiveness
- [ ] Update Instagram link if needed
- [ ] Add Google Analytics (optional)

## Troubleshooting

### Images not uploading
- Check that the `event-images` bucket exists
- Check that the bucket is public
- Check storage policies in Supabase

### Admin login not working
- Verify environment variables are set correctly
- Check browser console for errors
- Try clearing session storage and logging in again

### Events not showing
- Check that events are published (`is_published = true`)
- Check browser console for Supabase errors
- Verify database schema matches the SQL file

## Support

For issues or questions, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
