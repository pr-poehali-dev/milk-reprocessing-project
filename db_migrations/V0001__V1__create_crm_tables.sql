
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  company VARCHAR(255),
  city VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  product VARCHAR(255),
  comment TEXT,
  status VARCHAR(50) DEFAULT 'new',
  order_type VARCHAR(20) DEFAULT 'retail',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE crm_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO crm_users (username, password_hash) VALUES ('admin', 'celinnye2025');
