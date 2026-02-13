-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Products RLS policies
-- Allow anyone (including unauthenticated users) to view active products
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (status = 'active');

-- Allow only admins to view inactive products (for testing purposes)
CREATE POLICY "Admins can view all products" ON products
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND
    auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin')
  );

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

-- User roles RLS policies
CREATE POLICY "Users can read own role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);
