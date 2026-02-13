# Supabase Storage Setup Guide

## Create Public Bucket for Product Images

Follow these steps in your Supabase dashboard:

### Step 1: Navigate to Storage
1. Go to your Supabase project dashboard
2. Click on "Storage" in the left sidebar

### Step 2: Create New Bucket
1. Click "Create a new bucket" or the "+" button
2. Enter the bucket name: `product-images`
3. Toggle "Public bucket" to ON
4. Click "Create bucket"

### Step 3: Configure CORS Policy (if needed)
If you encounter CORS issues, you may need to configure CORS. This is usually already configured in Supabase.

### Step 4: Verify Configuration
The bucket should be:
- Name: `product-images`
- Public: Yes
- Accessible from your application

## Image Upload Testing

Once the bucket is created, the admin product form will automatically:
1. Upload images to the `product-images` bucket
2. Generate public URLs for the images
3. Store the URLs in the database

## Troubleshooting

If image uploads fail:
1. Ensure the `product-images` bucket exists and is public
2. Check that Supabase environment variables are correctly set
3. Verify that the authenticated user has permission to upload
4. Check browser console for specific error messages
