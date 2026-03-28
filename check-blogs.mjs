import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { blogArticles } from './drizzle/schema.js';

const db = drizzle(process.env.DATABASE_URL);

async function checkBlogs() {
  try {
    console.log('📚 Checking blog articles in database...\n');
    
    const allArticles = await db.select().from(blogArticles);
    
    console.log(`Total articles: ${allArticles.length}\n`);
    
    if (allArticles.length === 0) {
      console.log('❌ No blog articles found in database');
      return;
    }
    
    allArticles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.titleAr || article.titleEn}`);
      console.log(`   ID: ${article.id}`);
      console.log(`   Published: ${article.isPublished ? '✅ YES' : '❌ NO'}`);
      console.log(`   Slug: ${article.slug}`);
      console.log(`   Views: ${article.viewCount}`);
      console.log('');
    });
    
    const publishedCount = allArticles.filter(a => a.isPublished).length;
    console.log(`\n📊 Summary: ${publishedCount}/${allArticles.length} articles are published`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkBlogs();
