import 'dotenv/config';
import { createUserWithPassword } from './server/db.js';

const username = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || 'Admin';
const email = process.argv[5];

if (!username || !password) {
  console.log('Usage: node create-admin-user.mjs <username> <password> [name] [email]');
  process.exit(1);
}

try {
  await createUserWithPassword(username, password, name, email);
  console.log('User created successfully');
} catch (error) {
  console.error('Error creating user:', error);
  process.exit(1);
}