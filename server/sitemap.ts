import { getAllBlogArticles, getAllProductsAdmin, getAllProjectsAdmin } from "./db";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export async function generateSitemap(): Promise<string> {
  const baseUrl = "https://www.ecovent-sa.com";
  const today = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    // Static pages
    { loc: `${baseUrl}/`, lastmod: today, changefreq: "weekly", priority: "1.0" },
    { loc: `${baseUrl}/about`, lastmod: today, changefreq: "monthly", priority: "0.8" },
    { loc: `${baseUrl}/products`, lastmod: today, changefreq: "weekly", priority: "0.9" },
    { loc: `${baseUrl}/services`, lastmod: today, changefreq: "monthly", priority: "0.9" },
    { loc: `${baseUrl}/projects`, lastmod: today, changefreq: "weekly", priority: "0.8" },
    { loc: `${baseUrl}/blog`, lastmod: today, changefreq: "weekly", priority: "0.8" },
    { loc: `${baseUrl}/ai-tools`, lastmod: today, changefreq: "monthly", priority: "0.7" },
    { loc: `${baseUrl}/contact`, lastmod: today, changefreq: "monthly", priority: "0.7" },
    { loc: `${baseUrl}/quote`, lastmod: today, changefreq: "monthly", priority: "0.7" },
    { loc: `${baseUrl}/sitemap`, lastmod: today, changefreq: "monthly", priority: "0.6" },
  ];

  try {
    // Add blog articles
    const articles = await getAllBlogArticles();
    articles.forEach((article) => {
      urls.push({
        loc: `${baseUrl}/blog/${article.slug}`,
        lastmod: article.updatedAt?.toISOString().split('T')[0] || today,
        changefreq: "monthly",
        priority: "0.7"
      });
    });

    // Add products
    const products = await getAllProductsAdmin();
    products.forEach((product) => {
      urls.push({
        loc: `${baseUrl}/products/${product.id}`,
        lastmod: product.updatedAt?.toISOString().split('T')[0] || today,
        changefreq: "monthly",
        priority: "0.6"
      });
    });

    // Add projects
    const projects = await getAllProjectsAdmin();
    projects.forEach((project) => {
      urls.push({
        loc: `${baseUrl}/projects/${project.id}`,
        lastmod: project.updatedAt?.toISOString().split('T')[0] || today,
        changefreq: "monthly",
        priority: "0.6"
      });
    });
  } catch (error) {
    console.error("Error fetching dynamic content for sitemap:", error);
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}
