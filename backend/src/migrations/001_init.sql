-- Gulson Restaurant Database Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  avatar_url VARCHAR(500),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  image_url VARCHAR(500),
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  rating DECIMAL(3, 2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  cook_time_min INTEGER DEFAULT 30,
  spicy_level INTEGER DEFAULT 0 CHECK (spicy_level BETWEEN 0 AND 3),
  veg_nonveg VARCHAR(10) DEFAULT 'nonveg' CHECK (veg_nonveg IN ('veg', 'nonveg', 'vegan')),
  sizes_json JSONB DEFAULT '[]',
  addons_json JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Combo Meals table
CREATE TABLE IF NOT EXISTS combo_meals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  original_price DECIMAL(10, 2) NOT NULL,
  combo_price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  badge VARCHAR(50),
  items_list TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Offers table
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_pct INTEGER,
  coupon_code VARCHAR(50) UNIQUE,
  valid_until TIMESTAMP,
  image_url VARCHAR(500),
  min_order_amount DECIMAL(10, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  total_amount DECIMAL(10, 2) NOT NULL,
  delivery_address TEXT,
  notes TEXT,
  coupon_code VARCHAR(50),
  discount_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  size VARCHAR(10),
  addons TEXT
);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  party_size INTEGER NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed: Categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('All', 'all', 'All menu items', 0),
  ('Pizza', 'pizza', 'Artisan wood-fired pizzas', 1),
  ('Burgers', 'burgers', 'Gourmet handcrafted burgers', 2),
  ('Pasta', 'pasta', 'Italian inspired pasta dishes', 3),
  ('Grills', 'grills', 'Premium flame-grilled meats', 4),
  ('Seafood', 'seafood', 'Fresh ocean catch', 5),
  ('Salads', 'salads', 'Fresh & healthy salads', 6),
  ('Desserts', 'desserts', 'Indulgent sweet endings', 7),
  ('Drinks', 'drinks', 'Beverages & cocktails', 8)
ON CONFLICT (slug) DO NOTHING;

-- Seed: Admin user (password: admin123)
INSERT INTO users (name, email, password_hash, role) VALUES
  ('Admin', 'admin@gulson.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGnV/kZPaH9k3H5k8L.jJYkYBIy', 'admin')
ON CONFLICT (email) DO NOTHING;
