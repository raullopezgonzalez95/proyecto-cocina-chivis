import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;
const distPath = join(__dirname, 'dist');

// Verify the dist folder exists before serving
if (!existsSync(distPath)) {
  console.error('❌ dist/ folder not found. Run "npm run build" first.');
  process.exit(1);
}

// Serve static files from the Vite build output
app.use(express.static(distPath));

// SPA fallback — all unmatched routes serve index.html so
// React Router can handle client-side navigation
app.get('*', (_req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Frontend server running on http://0.0.0.0:${PORT}`);
  console.log(`🔗 API requests will be forwarded to ${process.env.VITE_API_URL || 'https://backend-production-4148.up.railway.app/api'}`);
});
