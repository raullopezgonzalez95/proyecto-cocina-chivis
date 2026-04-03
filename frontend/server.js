import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;
const distPath = join(__dirname, 'dist');
const indexPath = join(distPath, 'index.html');

// Verify the dist folder exists before serving
if (!existsSync(distPath)) {
  console.error('❌ dist/ folder not found. Run "npm run build" first.');
  process.exit(1);
}

const API_URL = process.env.VITE_API_URL || 'http://localhost:5001/api';

// Serve static files from the Vite build output
// (exclude index.html so the wildcard handler can inject the runtime variable)
app.use(express.static(distPath, { index: false }));

// SPA fallback — all unmatched routes serve index.html with the runtime
// API URL injected, so React Router can handle client-side navigation
app.get('*', (_req, res) => {
  const html = readFileSync(indexPath, 'utf-8').replace(
    '__VITE_API_URL_PLACEHOLDER__',
    API_URL
  );
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Frontend server running on http://0.0.0.0:${PORT}`);
  console.log(`🔗 API URL injected at runtime: ${API_URL}`);
});
