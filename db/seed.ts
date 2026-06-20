import * as schema from './schema';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client);

async function main() {
  console.log('🌱 Seeding database...');

  // 2. Clear existing data if necessary (be careful in production)
  //await db.delete(schema.restuarant).run();

  // 3. Insert mock data
  await db.insert(schema.restuarantTable).values([
    {
      name: 'FoodChef',
      image: 'food_chef.jpg'
  },
  {
      name: 'Chicken',
      image: 'chicken_zilla.jpg'
  },
  {
      name: 'ChefGanTeng',
      image: 'chef_ganteng.png'
  },
  {
      name: 'MasterChef',
      image: 'master_chef.jpg'
  },
  {
      name: 'Organic',
      image: 'organic.jpg'
  }
  ]);

  console.log('✅ Seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
