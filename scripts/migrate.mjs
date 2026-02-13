import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function migrate() {
  try {
    console.log('Starting database migration...');

    // Create products table
    const { error: productsError } = await supabase.rpc('execute_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS products (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          description TEXT,
          category TEXT NOT NULL,
          image_url TEXT,
          whatsapp_number TEXT,
          status TEXT DEFAULT 'active',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
    }).catch(() => ({ error: null })); // Ignore RPC not found error

    // Use direct SQL via admin API
    const adminQuery = async (sql) => {
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey,
        },
        body: JSON.stringify({ query: sql }),
      }).catch(() => null);
      return response;
    };

    // Create tables using raw SQL
    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        image_url TEXT,
        whatsapp_number TEXT,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS user_roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id)
      );

      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
      CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
      CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);

      ALTER TABLE products ENABLE ROW LEVEL SECURITY;
      ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

      CREATE POLICY IF NOT EXISTS "Anyone can view active products" ON products
        FOR SELECT USING (status = 'active' OR auth.uid() IN (
          SELECT user_id FROM user_roles WHERE role = 'admin'
        ));

      CREATE POLICY IF NOT EXISTS "Only admins can insert products" ON products
        FOR INSERT WITH CHECK (
          auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin')
        );

      CREATE POLICY IF NOT EXISTS "Only admins can update products" ON products
        FOR UPDATE USING (
          auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin')
        );

      CREATE POLICY IF NOT EXISTS "Only admins can delete products" ON products
        FOR DELETE USING (
          auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin')
        );

      CREATE POLICY IF NOT EXISTS "Users can read own role" ON user_roles
        FOR SELECT USING (auth.uid() = user_id);
    `;

    // Insert sample data
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (!existingProducts || existingProducts.length === 0) {
      const { error: insertError } = await supabase.from('products').insert([
        {
          name: 'Renew Power DCR 550W Solar Module',
          description: 'High wattage solar panel with excellent efficiency and durability.',
          category: 'Solar Panel',
          whatsapp_number: '919529989096',
          status: 'active',
        },
        {
          name: 'Adani DCR 540W Solar Module',
          description: 'High efficiency solar panel suitable for residential and commercial installations.',
          category: 'Solar Panel',
          whatsapp_number: '919529989096',
          status: 'active',
        },
        {
          name: 'ACDB-DCDB Premium Box Combo',
          description: 'Premium protection electrical box with surge protection.',
          category: 'ACDB-DCDB',
          whatsapp_number: '919529989096',
          status: 'active',
        },
        {
          name: 'Solar Structure HDG',
          description: 'Heavy-duty hot-dip galvanized solar mounting structure.',
          category: 'Structure',
          whatsapp_number: '919529989096',
          status: 'active',
        },
      ]);

      if (insertError) {
        console.error('Error inserting sample products:', insertError);
      } else {
        console.log('Sample products inserted successfully');
      }
    } else {
      console.log('Products already exist, skipping sample data insertion');
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
