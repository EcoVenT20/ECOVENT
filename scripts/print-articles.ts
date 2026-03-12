import { getAllBlogArticles } from "../server/db";

async function main() {
  try {
    const articles = await getAllBlogArticles(true);
    console.log(JSON.stringify(articles, null, 2));
  } catch (err) {
    console.error("Error fetching articles:", err);
    process.exit(1);
  }
}

main();
