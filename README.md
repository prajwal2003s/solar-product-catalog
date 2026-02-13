# H.V. Electricals & Engineering Services - Solar Product Catalog

A production-ready solar product catalog website with a secure admin dashboard for managing products, built with Next.js 14, Supabase, and Tailwind CSS.

## Overview

This is a complete e-commerce catalog solution for an authorized Renew Power dealer. It features:

- **Public-facing catalog** with search, filtering, and WhatsApp integration
- **Secure admin panel** with full product management capabilities  
- **Image upload to cloud storage** via Supabase
- **Database-driven product management** with real-time updates
- **Responsive design** optimized for all devices
- **Production-ready** and fully deployable to Vercel

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Deployment:** Vercel

## Features

### Public Website
- 🏠 Professional hero section with call-to-action
- 📦 Responsive product catalog grid
- 🔍 Real-time product search
- 🏷️ Category-based filtering
- 📱 WhatsApp inquiry buttons throughout
- 📄 Individual product detail pages
- 📱 Fully responsive mobile design

### Admin Panel
- 🔐 Secure email/password login
- 🛡️ Role-based access control
- 📊 Dashboard with key statistics
- ➕ Create new products
- ✏️ Edit existing products
- 🖼️ Upload product images
- 🗑️ Delete products with confirmation
- 🔄 Toggle product status (active/inactive)

### Technical Features
- ✅ Row Level Security (RLS) on database
- ✅ Optimized database queries with indexes
- ✅ Client-side product filtering
- ✅ Image optimization with Next.js Image
- ✅ Protected routes with middleware
- ✅ Error handling and validation
- ✅ SEO-optimized pages

## Quick Start

### Prerequisites
- Node.js 18 or higher
- Supabase account
- GitHub account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd solar-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── admin/
│   │   ├── login/              # Admin login page
│   │   ├── dashboard/          # Protected admin dashboard
│   │   │   └── products/       # Product management
│   │   └── actions.ts          # Server actions
│   ├── products/
│   │   ├── page.tsx            # Products catalog
│   │   └── [id]/page.tsx       # Product details
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── navbar.tsx              # Navigation bar
│   ├── product-card.tsx        # Product card component
│   ├── product-grid.tsx        # Products grid layout
│   ├── category-filter.tsx     # Category filter
│   ├── admin-header.tsx        # Admin navigation
│   ├── admin-product-form.tsx  # Product form
│   └── ui/                     # shadcn/ui components
├── lib/
│   └── supabase/
│       ├── client.ts           # Client-side Supabase
│       ├── server.ts           # Server-side Supabase
│       └── proxy.ts            # Auth proxy
├── middleware.ts               # Next.js middleware
├── scripts/
│   ├── init-db.sql             # Database initialization
│   └── setup-db.mjs            # Node.js setup script
├── SETUP_GUIDE.md              # Detailed setup guide
├── DEPLOYMENT_CHECKLIST.md     # Deployment checklist
└── README.md                   # This file
```

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  whatsapp_number TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### User Roles Table
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);
```

## Configuration

### Customizing Your Site

1. **Company Information** - Edit `/app/layout.tsx` and `/components/navbar.tsx`
2. **Colors** - Modify CSS variables in `/app/globals.css`
3. **Categories** - Update `/components/category-filter.tsx`
4. **WhatsApp Number** - Search and replace throughout the project
5. **Content** - Edit page components directly

### Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL         # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY    # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY        # Supabase service role key (admin)
POSTGRES_URL                     # PostgreSQL connection string
POSTGRES_PRISMA_URL              # PostgreSQL connection string for Prisma
POSTGRES_URL_NON_POOLING         # Non-pooling connection string
SUPABASE_JWT_SECRET              # JWT secret for auth
```

## Authentication & Security

### Admin Access
1. Navigate to `/admin/login`
2. Sign in with your admin email and password
3. You'll be authenticated and redirected to the dashboard
4. Only users with the `admin` role can access the admin panel

### Database Security
- All data is protected with Row Level Security (RLS)
- Unauthenticated users can only view active products
- Only admins can modify products
- All sensitive operations are protected

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Configure environment variables
   - Click "Deploy"

3. **Configure Environment Variables in Vercel**
   - Add all required Supabase environment variables
   - Redeploy after adding variables

4. **Set Up Custom Domain** (Optional)
   - Follow Vercel's domain configuration guide

### Other Deployment Options
- Netlify (with serverless functions)
- AWS Amplify
- Railway
- Render

## Usage

### For Customers (Public Site)

1. **Browse Products**
   - Visit the home page
   - Click on "Products" in the navigation
   - Use search to find specific products
   - Filter by category

2. **View Product Details**
   - Click on any product card
   - View full description and specifications
   - Click "Inquire on WhatsApp" to contact

3. **Contact via WhatsApp**
   - Click WhatsApp button anywhere on the site
   - Your default WhatsApp app will open
   - Pre-filled message will appear

### For Admins (Admin Panel)

1. **Login**
   - Navigate to `/admin/login`
   - Use your admin credentials

2. **Dashboard**
   - View key metrics
   - See recent products
   - Quick access to all features

3. **Manage Products**
   - Add new products with images
   - Edit existing product details
   - Update pricing and availability
   - Delete products (with confirmation)
   - Upload images to cloud storage

## Performance

- **Optimized Images:** Using Next.js Image component for automatic optimization
- **Database Indexes:** Key fields are indexed for fast queries
- **Client-side Filtering:** Instant search without server requests
- **Lazy Loading:** Products load efficiently
- **CSS Optimization:** Tailwind CSS purges unused styles

## SEO

All pages include:
- Proper meta tags (title, description)
- Open Graph tags for social sharing
- Structured data for search engines
- Mobile viewport configuration
- Robots.txt and sitemap support

## Troubleshooting

### Common Issues

**Products not showing?**
- Ensure products have `status = 'active'`
- Check database connection
- Verify RLS policies are configured

**Image upload fails?**
- Check `product-images` bucket exists and is public
- Verify Supabase environment variables
- Check file size (max 5MB)

**Admin login not working?**
- Verify admin user exists in Supabase Auth
- Confirm user has admin role in database
- Check email/password combination

**WhatsApp links not working?**
- Verify WhatsApp number includes country code
- Test in a browser with WhatsApp installed
- Check URL encoding

## Support & Documentation

- **Setup Guide:** See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Deployment Checklist:** See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

## License

This project is proprietary software for H.V. Electricals & Engineering Services.

## Support

For issues or questions:
1. Check the documentation files
2. Review Supabase logs
3. Check Vercel deployment logs
4. Contact support if issues persist

---

**Built with ❤️ using Next.js, Supabase, and Tailwind CSS**

Ready for production deployment and scaling!
