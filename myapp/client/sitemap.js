import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2';

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username', // replace with your MySQL username
    password: 'your_password', // replace with your MySQL password
    database: 'your_database', // replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Function to fetch all news articles from the database
const fetchNewsData = async () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'SELECT id, title FROM news'; // Adjust query to match your news table and column names
    db.query(sqlQuery, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Generate the sitemap
async function generateSitemap() {
  try {
    const newsArticles = await fetchNewsData(); // Fetch news data from MySQL

    // Create a sitemap stream with your site's base URL
    const sitemap = new SitemapStream({ hostname: 'https://www.sinhanews.com' });
    const pipeline = sitemap.pipe(createGzip());

    // Add home page and other static pages to the sitemap
    sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    sitemap.write({ url: '/Gossip', changefreq: 'monthly', priority: 0.7 });
    sitemap.write({ url: '/items/:id', changefreq: 'hourly', priority: 1.0 });
    sitemap.write({ url: '/sports', changefreq: 'daily', priority: 0.8 });
    sitemap.write({ url: '/politics', changefreq: 'daily', priority: 0.8 });
    sitemap.write({ url: '/local-news', changefreq: 'daily', priority: 0.8 });
    sitemap.write({ url: '/Foreginnews', changefreq: 'daily', priority: 0.8 });

    // Add dynamic news articles to the sitemap
    newsArticles.forEach((article) => {
      sitemap.write({
        url: `/news/${article.id}-${article.title.replace(/\s+/g, '-').toLowerCase()}`, // SEO-friendly URL
        changefreq: 'daily',
        priority: 0.8,
      });
    });

    sitemap.end();

    const xml = await streamToPromise(pipeline);
    await fs.promises.writeFile(path.join('./public/sitemap.xml'), xml);
    console.log('Sitemap generated and saved as sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  } finally {
    db.end(); // Close the database connection
  }
}

// Call the function to generate the sitemap
generateSitemap();