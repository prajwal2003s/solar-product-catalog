-- Insert sample products
INSERT INTO products (name, description, category, whatsapp_number, status) VALUES
  ('Renew Power DCR 550W Solar Module', 'High wattage solar panel with excellent efficiency and durability.', 'Solar Panel', '919529989096', 'active'),
  ('Adani DCR 540W Solar Module', 'High efficiency solar panel suitable for residential and commercial installations.', 'Solar Panel', '919529989096', 'active'),
  ('ACDB-DCDB Premium Box Combo', 'Premium protection electrical box with surge protection.', 'ACDB-DCDB', '919529989096', 'active'),
  ('Solar Structure HDG', 'Heavy-duty hot-dip galvanized solar mounting structure.', 'Structure', '919529989096', 'active')
ON CONFLICT DO NOTHING;
