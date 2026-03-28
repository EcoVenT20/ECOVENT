import 'dotenv/config';
import { getUserByUsername, verifyPassword } from './server/db.js';

async function test() {
  const user = await getUserByUsername('admin');
  console.log('User:', user);

  console.log('Testing password...');
  const isValid = await verifyPassword('admin', 'admin123');
  console.log('Password valid:', isValid);
}

test().catch(console.error);