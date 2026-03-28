import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { blogArticles } from './drizzle/schema.js';

async function deleteAllBlogs() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    const db = drizzle(connection);

    console.log('Deleting all blog articles...');
    const result = await db.delete(blogArticles);
    console.log(`Deleted ${result.rowsAffected} blog articles.`);

    await connection.end();
  } catch (error) {
    console.error('Error deleting blogs:', error);
  }
}

deleteAllBlogs();