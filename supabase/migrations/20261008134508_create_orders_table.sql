/*
# Create orders table for Klovyq e-commerce

1. New Tables
- `orders` — stores all customer order information
  - `id` (uuid, primary key)
  - `order_number` (text, unique) — human-readable order ID like KLVQ-2025-0001
  - `customer_name` (text, not null)
  - `phone` (text, not null)
  - `email` (text, not null)
  - `address` (text, not null)
  - `city` (text, not null)
  - `area` (text, not null)
  - `delivery_option` (text, not null) — 'Standard' or 'Express'
  - `items` (jsonb, not null) — array of cart items with product details, quantity, size, color
  - `subtotal` (numeric, not null)
  - `discount` (numeric, default 0)
  - `delivery_charge` (numeric, not null)
  - `total` (numeric, not null)
  - `payment_method` (text, not null) — 'Cash on Delivery'
  - `status` (text, not null, default 'pending') — pending/confirmed/processing/shipped/delivered/cancelled
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `orders`.
- This is a no-auth single-tenant app (no sign-in screen), so policies use `TO anon, authenticated`.
- Allow anon + authenticated to INSERT (customers place orders without signing in).
- Allow anon + authenticated to SELECT (admin dashboard reads orders).
- Allow anon + authenticated to UPDATE (admin changes order status).
- No DELETE policy — orders should never be deleted.
*/ 

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  area text NOT NULL,
  delivery_option text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric NOT NULL DEFAULT 0,
  discount numeric NOT NULL DEFAULT 0,
  delivery_charge numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  payment_method text NOT NULL DEFAULT 'Cash on Delivery',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders"
  ON orders FOR UPDATE
  TO anon, authenticated
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
