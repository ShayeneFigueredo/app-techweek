import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ykhqknafpedrqlxvqhyn.supabase.co';
const supabaseAnonKey = 'sb_publishable_m73YYTfo_BlqZ44ngyOXAw_ght25sdz';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedAdmin() {
  console.log('Seeding admin user...');
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@admin.com',
    password: '12345678',
    options: {
      data: {
        username: 'admin',
        first_name: 'Admin',
        last_name: 'Sistema'
      }
    }
  });

  if (error) {
    console.error('Error creating admin:', error.message);
  } else {
    console.log('Admin created successfully!', data.user.id);
  }
}

seedAdmin();
