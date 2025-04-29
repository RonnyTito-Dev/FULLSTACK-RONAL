-- ========================
-- 1. ROLES
-- ========================
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- ========================
-- 2. USERS
-- ========================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role_id INTEGER REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- 3. CUSTOMERS
-- ========================
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  dni VARCHAR(15) UNIQUE,
  email VARCHAR(100),
  phone VARCHAR(15),
  address TEXT,
  date_of_birth DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ========================
-- 4. CATEGORIES
-- ========================
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- ========================
-- 5. PRODUCTS
-- ========================
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- 6. PAYMENT METHODS
-- ========================
CREATE TABLE payment_methods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- ========================
-- 7. SALES
-- ========================
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  customer_id INTEGER REFERENCES customers(id),
  payment_method_id INTEGER REFERENCES payment_methods(id),
  total NUMERIC(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- 8. SALE DETAILS
-- ========================
CREATE TABLE sale_details (
  id SERIAL PRIMARY KEY,
  sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL
);

-- ========================
-- 9. STOCK MOVEMENTS
-- ========================
CREATE TABLE stock_movements (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  type VARCHAR(10) CHECK (type IN ('in', 'out')),
  quantity INTEGER NOT NULL,
  reason TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- 10. LOGS
-- ========================
CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action TEXT NOT NULL,
  affected_table TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
