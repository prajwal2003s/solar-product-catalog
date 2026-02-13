# H.V. Electricals - Solar Product Catalog Setup Guide

This guide will help you set up and deploy your production-ready solar product catalog website.

## Prerequisites

- Supabase account and project created
- GitHub account (for deployment)
- Vercel account (for hosting)
- Node.js 18+ installed locally

## Step 1: Environment Variables Setup

Your project has already been configured with Supabase environment variables. Verify they're set in the Vercel project settings:

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `SUPABASE_JWT_SECRET`

## Step 2: Database Setup

### Create Tables
Execute the following SQL in your Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS products (
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

CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
```

### Set Up RLS Policies
```sql
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (status = 'active' OR auth.uid() IN (
    SELECT user_id FROM user_roles WHERE role = 'admin'
  ));

CREATE POLICY "Only admins can insert products" ON products
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin')
  );

CREATE POLICY "Only admins can update products" ON products
  FOR UPDATE USING (
    auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin')
  );

CREATE POLICY "Only admins can delete products" ON products
  FOR DELETE USING (
    auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin')
  );

CREATE POLICY "Users can read own role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);
```

## Step 3: Create Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Create a new bucket named `product-images`
3. Toggle "Public bucket" to ON
4. Click Create

## Step 4: Create Admin User

1. Go to Supabase Dashboard → Authentication → Users
2. Create a new user with email and password
3. In the SQL Editor, add the admin role:

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin');
```

Replace `USER_ID_HERE` with the actual user ID from the auth table.

## Step 5: Insert Sample Products (Optional)

```sql
INSERT INTO products (name, description, category, whatsapp_number, status) VALUES
  ('Renew Power DCR 550W Solar Module', 'High wattage solar panel with excellent efficiency and durability.', 'Solar Panel', '919529989096', 'active'),
  ('Adani DCR 540W Solar Module', 'High efficiency solar panel suitable for residential and commercial installations.', 'Solar Panel', '919529989096', 'active'),
  ('ACDB-DCDB Premium Box Combo', 'Premium protection electrical box with surge protection.', 'ACDB-DCDB', '919529989096', 'active'),
  ('Solar Structure HDG', 'Heavy-duty hot-dip galvanized solar mounting structure.', 'Structure', '919529989096', 'active');
```

## Step 6: Local Testing

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Test the following:
   - Public website: `http://localhost:3000`
   - Products page: `http://localhost:3000/products`
   - Product details: Click on any product card
   - Admin login: `http://localhost:3000/admin/login`
   - Admin dashboard: `http://localhost:3000/admin/dashboard` (after login)

## Step 7: Deployment to Vercel

1. Push your code to GitHub (if not already done)
2. Connect your GitHub repository to Vercel
3. Vercel will auto-detect Next.js and configure settings
4. Ensure environment variables are set in Vercel project settings
5. Deploy!

## Features Included

### Public Website
- ✅ Responsive navbar with WhatsApp contact button
- ✅ Professional hero section
- ✅ Features showcase
- ✅ Products catalog with search and filtering
- ✅ Category-based filtering
- ✅ Individual product detail pages
- ✅ WhatsApp inquiry buttons throughout
- ✅ Professional footer

### Admin Panel
- ✅ Secure admin login (email/password)
- ✅ Role-based access control
- ✅ Dashboard with statistics
- ✅ Product management (create, read, update, delete)
- ✅ Image upload to Supabase Storage
- ✅ Product search and filtering
- ✅ Status management (active/inactive)
- ✅ Beautiful and intuitive UI

### Database & Security
- ✅ PostgreSQL database with Row Level Security
- ✅ Supabase Authentication
- ✅ Public image storage bucket
- ✅ Admin role verification
- ✅ Protected routes

## Customization Guide

### Update Company Information
1. Edit `/app/layout.tsx` - Update metadata
2. Edit `/components/navbar.tsx` - Update company name and links
3. Edit `/app/page.tsx` - Update hero section and content
4. Update WhatsApp number throughout (search for `919529989096`)

### Change Colors
The app uses CSS variables for theming. Edit `/app/globals.css`:
- `--primary` - Main brand color (currently blue)
- `--secondary` - Accent color (currently green)
- Adjust HSL values to match your brand

### Add New Categories
Edit `/components/category-filter.tsx`:
```typescript
const CATEGORIES = [
  'Solar Panel',
  'Inverter',
  'ACDB-DCDB',
  'Cable',
  'Structure',
  'BOS MATERIALS',
  'Meter',
  // Add your category here
]
```

## Troubleshooting

### Image Upload Not Working
1. Verify `product-images` bucket exists and is public
2. Check Supabase environment variables are correct
3. Ensure authenticated admin user has upload permissions

### Admin Login Fails
1. Verify user exists in Supabase Auth
2. Verify user has admin role in `user_roles` table
3. Check email/password combination

### Products Not Showing
1. Ensure products exist with `status = 'active'`
2. Check RLS policies are correctly configured
3. Verify Supabase connection is working

### WhatsApp Links Not Working
1. Verify WhatsApp number format includes country code
2. Test links directly in browser
3. Ensure WhatsApp is installed on user's device

## Performance Optimizations
- ✅ Image optimization with Next.js Image component
- ✅ Lazy loading of products
- ✅ Optimized database queries with proper indexes
- ✅ Client-side filtering for instant search results
- ✅ CSS-in-JS with Tailwind for minimal CSS

## Security Features
- ✅ Protected admin routes with authentication
- ✅ Row Level Security (RLS) on database tables
- ✅ Role-based access control
- ✅ Secure password authentication
- ✅ Session-based authentication

## Support & Maintenance

### Regular Tasks
- Review and moderate product listings
- Update product information as needed
- Monitor admin access logs
- Keep dependencies updated

### Backup Strategy
Supabase provides automatic backups. For additional safety:
1. Use Supabase's backup features
2. Periodically export your database
3. Keep GitHub repository updated

## Next Steps
1. Customize company branding and content
2. Set up admin user account
3. Add your solar products
4. Test all features thoroughly
5. Deploy to Vercel
6. Set up custom domain (optional)

## Support
For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Check Next.js documentation: https://nextjs.org/docs
3. Review Vercel deployment guide: https://vercel.com/docs

---

Built with Next.js 14, Supabase, Tailwind CSS, and deployed on Vercel. Ready for production!
