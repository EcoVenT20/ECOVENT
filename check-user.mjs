import { db } from './server/db.ts';
import { users } from './drizzle/schema.ts';

async function checkUser() {
  const result = await db.select().from(users).where(users.username.eq('admin'));
  console.log(result);
}

checkUser();