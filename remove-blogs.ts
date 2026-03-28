import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { blogArticles } from './drizzle/schema.js';

async function deleteAllArticles() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    const db = drizzle(connection);
    await db.delete(blogArticles);
    console.log('✅ All blog articles deleted successfully!');
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

deleteAllArticles();
