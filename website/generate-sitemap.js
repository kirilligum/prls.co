import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateSitemap() {
  const publicDir = path.join(__dirname, 'public');
  const urls = [];

  // Add homepage
  urls.push({
    loc: 'https://www.prls.co/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '1.0'
  });

  // Get all company directories
  const companies = fs.readdirSync(publicDir).filter(file => {
    const companyPath = path.join(publicDir, file);
    return fs.statSync(companyPath).isDirectory() &&
           fs.existsSync(path.join(companyPath, 'company_info.json')) &&
           fs.existsSync(path.join(companyPath, 'aik.json'));
  });

  // Generate URLs for each company's pages
  for (const companyId of companies) {
    const aikPath = path.join(publicDir, companyId, 'aik.json');
    const aikData = JSON.parse(fs.readFileSync(aikPath, 'utf-8'));

    const itemsPerPage = 20;
    const totalPages = Math.ceil(aikData.length / itemsPerPage);

    if (totalPages >= 1) {
      urls.push({
        loc: `https://www.prls.co/${companyId}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8'
      });
    }

    for (let pageNum = 2; pageNum <= totalPages; pageNum++) {
      urls.push({
        loc: `https://www.prls.co/${companyId}/${pageNum}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8'
      });
    }
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write to dist directory
  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
  console.log(`✓ Generated sitemap.xml with ${urls.length} URLs`);
}

generateSitemap();
