# ENTE Store

## Admin panel
- Open `admin.html` on the deployed site to sign in.
- Admin users must exist in Supabase Authentication and have a matching row in `public.admin_users`.
- Products are managed in Supabase `public.products`; product images are stored in the public `ente-products` Storage bucket.
- The storefront reads active products from Supabase and falls back to `products.js` if Supabase cannot be reached.

## Supabase configuration
The browser configuration is in `supabase-config.js`. It contains the project URL and a publishable key, which is designed for browser use. Never put a Supabase secret/service-role key in this file or in the repository. Keep Row Level Security enabled and retain the admin-only policies for writes.

## Deploy
Upload the contents of this folder to the existing Cloudflare Pages/GitHub project, preserving the current site root and image assets.

## First-time database setup
After the `products` and `admin_users` tables and RLS policies have been created, open Supabase SQL Editor and run `supabase-seed.sql` once. This imports the two sample products already present in `products.js`, so the existing storefront catalog remains visible after switching to Supabase.
