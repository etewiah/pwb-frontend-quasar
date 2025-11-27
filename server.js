const express = require('express');
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

// Use history fallback for SPA routing
app.use(history());

// Serve static files from the dist/spa directory
app.use(serveStatic(path.join(__dirname, 'dist/spa')));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
