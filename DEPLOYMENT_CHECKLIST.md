# Deployment Checklist

Complete these steps before deploying to production:

## Database Setup ✓
- [ ] Created `products` table in Supabase
- [ ] Created `user_roles` table in Supabase
- [ ] Set up all database indexes
- [ ] Enabled Row Level Security (RLS) on both tables
- [ ] Configured all RLS policies
- [ ] Created admin user account
- [ ] Added admin role to user via SQL
- [ ] Created `product-images` storage bucket
- [ ] Set `product-images` bucket to public

## Environment Variables ✓
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set
- [ ] All PostgreSQL environment variables are set
- [ ] Variables are added to Vercel project settings

## Customization ✓
- [ ] Updated company name (H.V. Electricals → Your Company)
- [ ] Updated WhatsApp number throughout app
- [ ] Updated colors in `/app/globals.css`
- [ ] Updated company logo/avatar
- [ ] Updated page metadata (title, description)
- [ ] Reviewed all copy and content
- [ ] Added sample products to database

## Code Quality ✓
- [ ] No console.log statements (removed for production)
- [ ] All TypeScript types are correct
- [ ] No hardcoded secrets or API keys
- [ ] All components are properly exported
- [ ] No broken imports or references

## Testing ✓
- [ ] Homepage loads correctly
- [ ] Products page displays all active products
- [ ] Product search works
- [ ] Category filtering works
- [ ] Product detail pages load
- [ ] WhatsApp links open correctly
- [ ] Admin login works with valid credentials
- [ ] Admin login fails with invalid credentials
- [ ] Admin dashboard loads
- [ ] Can create a new product
- [ ] Can upload product image
- [ ] Can edit existing product
- [ ] Can delete product (with confirmation)
- [ ] Product appears/disappears on public site based on status
- [ ] All forms validate input correctly
- [ ] Responsive design works on mobile
- [ ] Responsive design works on tablet
- [ ] Responsive design works on desktop

## Performance ✓
- [ ] Images are optimized (using Next.js Image component)
- [ ] Database queries use proper indexes
- [ ] RLS policies are efficient
- [ ] No N+1 query problems
- [ ] Page load time is acceptable

## Security ✓
- [ ] Protected routes require authentication
- [ ] Only admins can access admin panel
- [ ] Only admins can edit/delete products
- [ ] All user inputs are validated
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] HTTPS is enforced
- [ ] CORS is properly configured

## Deployment ✓
- [ ] Code is pushed to GitHub
- [ ] GitHub repository is connected to Vercel
- [ ] Vercel project is configured
- [ ] Environment variables are set in Vercel
- [ ] Build process completes without errors
- [ ] No warnings during build
- [ ] Preview deployment works
- [ ] Production deployment is ready

## Post-Deployment ✓
- [ ] Test live site functionality
- [ ] Verify all pages load correctly
- [ ] Test admin panel on live site
- [ ] Test product creation/editing/deletion
- [ ] Verify images display correctly
- [ ] Check mobile responsiveness on live site
- [ ] Test WhatsApp links
- [ ] Monitor error logs
- [ ] Set up monitoring/analytics (optional)
- [ ] Configure custom domain (optional)

## Launch Readiness Checklist

### Must Have ✓
- [ ] Database is set up and tested
- [ ] All admin users are created
- [ ] Supabase Storage bucket exists
- [ ] Environment variables are configured
- [ ] Code is deployed to Vercel
- [ ] Site is accessible at domain

### Should Have ✓
- [ ] Custom domain is set up
- [ ] SSL certificate is active
- [ ] Error monitoring is configured
- [ ] Analytics are tracking
- [ ] Backup strategy is in place
- [ ] Documentation is complete

### Nice to Have ✓
- [ ] SEO is optimized
- [ ] Performance monitoring is set up
- [ ] Auto-scaling is configured
- [ ] CDN is optimized
- [ ] Email notifications are set up

## Production Monitoring

After deployment, monitor:
- [ ] Error logs in browser console
- [ ] Vercel deployment logs
- [ ] Supabase query logs
- [ ] Database performance
- [ ] Image loading performance
- [ ] User engagement metrics

## Troubleshooting During Deployment

If something goes wrong:
1. Check Vercel deployment logs
2. Check Supabase status page
3. Verify environment variables are correct
4. Check database connection
5. Review network requests in browser DevTools
6. Check for console errors

## Rollback Plan

If major issues occur after deployment:
1. Revert to previous Vercel deployment via dashboard
2. Or redeploy previous git commit
3. Check database for data integrity
4. Notify users of temporary service issues

## Go-Live Announcement

Once everything is verified:
1. Announce site is live
2. Share products catalog link
3. Promote via social media
4. Gather user feedback
5. Monitor for issues

---

**Deployment Status:** Ready for production launch

**Last Updated:** $(date)

**Deployed By:** ___________________

**Sign-off:** ___________________
