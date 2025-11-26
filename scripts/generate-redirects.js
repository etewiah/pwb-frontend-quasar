const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../dist/spa');
const REDIRECTS_FILE = path.join(DIST_DIR, '_redirects');

// 1. Determine Backend URL
let backendUrl = process.env.BACKEND_URL;

if (!backendUrl) {
  try {
    const configPath = path.resolve(__dirname, '../app-config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.backendUrl) {
        backendUrl = config.backendUrl;
        console.log('Using backend URL from app-config.json:', backendUrl);
      }
    }
  } catch (e) {
    console.warn('Error reading app-config.json:', e.message);
  }
}

if (!backendUrl) {
  try {
    const templatePath = path.resolve(__dirname, '../app-config.template.json');
    if (fs.existsSync(templatePath)) {
      const config = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
      if (config.backendUrl) {
        backendUrl = config.backendUrl;
        console.log('Using backend URL from app-config.template.json:', backendUrl);
      }
    }
  } catch (e) {
    console.warn('Error reading app-config.template.json:', e.message);
  }
}

if (!backendUrl) {
  console.warn('No backend URL found. Defaulting to http://localhost:3000');
  backendUrl = 'http://localhost:3000';
}

// Ensure no trailing slash for consistency
backendUrl = backendUrl.replace(/\/$/, '');

// 2. Generate Redirects Content
const redirectsContent = `
# Proxy API requests to the backend
/api_public/*  ${backendUrl}/api_public/:splat  200
/uploads/*     ${backendUrl}/uploads/:splat     200

# SPA Catch-all for history mode
/*  /index.html  200
`;

// 3. Write _redirects file
try {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`Dist directory ${DIST_DIR} does not exist. Did you run the build?`);
    process.exit(1);
  }
  fs.writeFileSync(REDIRECTS_FILE, redirectsContent.trim() + '\n');
  console.log(`Successfully generated _redirects at ${REDIRECTS_FILE}`);
  console.log(redirectsContent);
} catch (e) {
  console.error('Error writing _redirects file:', e);
  process.exit(1);
}
