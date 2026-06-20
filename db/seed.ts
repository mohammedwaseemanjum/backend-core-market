import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// 1. Connect to your SQLite database
const sqlite = new Database('local.db');
const db = drizzle(sqlite, { schema });

async function main() {
  console.log('🌱 Seeding database...');

  // 2. Clear existing data if necessary (be careful in production)
  await db.delete(schema.usersTable).run();

  // 3. Insert mock data
  await db.insert(schema.usersTable).values([
    { name: 'Alice Smith', email: 'alice@example.com' },
    { name: 'Bob Jones', email: 'bob@example.com' },
  ]);

  console.log('✅ Seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
