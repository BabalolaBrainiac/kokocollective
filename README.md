# Koko Kollective

An inclusive BIPOC community-led creative events and social experience platform. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Event Showcase** - Beautiful event listings with filtering by category
- **Event Details** - Individual event pages with Eventbrite ticket integration
- **Admin Dashboard** - Full event management system with authentication
- **Media Uploads** - Upload featured images and gallery photos for events
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-first approach for all devices
- **Instagram Integration** - Direct links to Instagram profile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (for images)
- **Fonts**: Playfair Display (serif), Inter (sans-serif)

## Brand Colors

- **Cream**: #F4EFEA
- **Warm Beige**: #E6DED3
- **Mocha Brown**: #7A5C4D
- **Soft Brown**: #5A463C
- **Sage Green**: #8FA38F
- **Terracotta**: #C7744A
- **Muted Olive**: #6E7C6A

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository and navigate to the project:
```bash
cd projects/kokokollective
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ADMIN_EMAIL=admin@kokokollective.com
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
```

4. Set up the database:
   - Go to your Supabase project
   - Open the SQL Editor
   - Run the contents of `supabase/schema.sql`
   - Create a storage bucket called `event-images` (public)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access

Navigate to `/admin` and log in with the credentials set in your environment variables.

Default credentials (if not set):
- Email: `admin@kokokollective.com`
- Password: `admin123`

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard
│   ├── events/            # Events listing & details
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── navigation.tsx     # Site navigation
│   ├── footer.tsx         # Site footer
│   ├── event-card.tsx     # Event card component
│   ├── events-filter.tsx  # Events filter
│   ├── theme-provider.tsx # Dark mode provider
│   ├── admin-login.tsx    # Admin login form
│   ├── admin-dashboard.tsx # Admin dashboard
│   └── event-form.tsx     # Event creation/editing form
├── lib/                   # Utilities
│   ├── supabase.ts        # Supabase client & functions
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript types
    └── index.ts           # Type definitions
```

## Customisation

### Changing Brand Colors

Edit the colors in `tailwind.config.ts`:

```typescript
colors: {
  cream: '#F4EFEA',
  'warm-beige': '#E6DED3',
  'mocha-brown': '#7A5C4D',
  // ... etc
}
```

### Adding New Event Categories

Edit the `CATEGORIES` array in `src/components/event-form.tsx`:

```typescript
const CATEGORIES = [
  'paint-sip',
  'social-games',
  // add your new category here
]
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Build the production version:
```bash
npm run build
```

## License

Private - All rights reserved.

---

Built with love for the Koko Kollective community.
