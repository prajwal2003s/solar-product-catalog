#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database schema...\n');

    // Check if products table exists
    const { data: tableExists, error: checkError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (!checkError) {
      console.log('✅ Products table already exists');
    } else {
      console.log('📦 Creating products and user_roles tables...');
      
      // Table creation must be done via SQL - create a simple test
      const { error: createError } = await supabase.rpc('execute_sql', {
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
          
          CREATE TABLE IF NOT EXISTS user_roles (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL,
            role TEXT NOT NULL DEFAULT 'user',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(user_id)
          );
        `,
      }).catch(() => null);

      if (createError) {
        console.log('⚠️  Note: Table creation via RPC not available. Tables will be created in Supabase dashboard.');
      } else {
        console.log('✅ Tables created');
      }
    }

    // Insert sample data
    console.log('📝 Inserting sample products...');
    
    const sampleProducts = [
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
    ];

    const { data, error } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('ℹ️  Table does not exist yet. Please create it manually in Supabase dashboard:');
        console.log('   - Go to SQL Editor in Supabase');
        console.log('   - Copy the schema from scripts/init-db.sql');
        console.log('   - Execute it there');
      } else {
        console.error('❌ Error inserting data:', error.message);
      }
    } else {
      console.log(`✅ Inserted ${data?.length || 0} sample products`);
    }

    console.log('\n✨ Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
