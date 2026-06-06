-- Run in Supabase SQL Editor
ALTER TABLE orders ADD COLUMN IF NOT EXISTS mpesa_checkout_request_id TEXT;
