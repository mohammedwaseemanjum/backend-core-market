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
  await db.delete(schema.usersTable).run();

  // 3. Insert mock data
  await db.insert(schema.usersTable).values([
    { name: 'Alice Smith', email: 'alice@example.com' },
    { name: 'Bob Jones', email: 'bob@example.com' },
    { name: 'Jane', email: 'jane@example.com' },
  ]);

  console.log('✅ Seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
