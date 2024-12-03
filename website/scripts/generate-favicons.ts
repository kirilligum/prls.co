import { generateFavicons } from '../src/utils/favicon';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_FAVICON = join(__dirname, '../src/images/favicon.png');
const PUBLIC_DIR = join(__dirname, '../../public');

async function main() {
  try {
    await generateFavicons(SOURCE_FAVICON, PUBLIC_DIR);
    console.log('✓ Favicons generated successfully');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

main();
