import 'dotenv/config';
import { getDb } from './server/db.ts';
import { users } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';

async function test() {
  try {
    console.log('Starting database test...');
    const db = await getDb();
    
    if (!db) {
      console.error('Database connection failed');
      return;
    }
    console.log('Database connected');

    const result = await db.select().from(users).where(eq(users.username, 'admin')).limit(1);
    console.log('Admin user found:', result);
    
    if (result.length === 0) {
      console.log('No admin user found');
    } else {
      console.log('Admin user:', result[0]);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
