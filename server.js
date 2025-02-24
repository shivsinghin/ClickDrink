// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const https = require('https');
const http = require('http');
const fs = require('fs');
require('dotenv').config();
const path = require('path');
const app = express();

// Middleware to capture raw body
// Captures raw body data for both JSON and URL-encoded requests
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

app.use(bodyParser.urlencoded({ 
  extended: true,
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// Database Configuration
// Connect to MongoDB Atlas instance
mongoose.connect(process.env.MONGODB_ATLAS_URI);

// Session Management Configuration
app.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_ATLAS_URI,
    collectionName: 'sessions',
    autoRemove: 'native',
    crypto: {
      secret: process.env.APP_SECRET,
    },
  }),
  cookie: { secure: true, maxAge: 2592000000 }, // 30 days session
}));

// Static Files
app.use(express.static('public'));

// Route Handlers
// Serve home page for root and /home routes
app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Session Management Routes
// Reset user session with new session ID
app.post('/reset-session', async (req, res) => {
  const newSessionID = req.sessionID = require('crypto').randomBytes(16).toString('hex');
  
  req.session.regenerate(err => {
    if (err) {
      return res.status(500).send('Error resetting session');
    }
    req.session.save(err => {
      if (err) {
        return res.status(500).send('Error saving new session');
      }
      res.send({ message: 'Session reset successfully' });
    });
  });
});

// Game State Management Routes
// Update coin counter in session
app.post('/updateCounter', (req, res) => {
  const { count } = req.body;
  req.session.coinCount = count;
  req.session.save((err) => {
    if (err) {
      res.status(500).json({ message: 'Error saving session', error: err });
    } else {
      res.json({ message: 'Counter updated successfully', count: count });
    }
  });
});

// Retrieve current coin count from session
app.get('/getCounter', (req, res) => {
  const count = req.session.coinCount || 5000; // Default to 5000 if not set
  res.json({ count: count });
});

// SSL/TLS Configuration
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/<your-domain>/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/<your-domain>/fullchain.pem'),
};

// HTTP to HTTPS Redirect Server
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
  res.end();
});
httpServer.listen(80, () => {
  console.log("HTTP server running on port 80");
});

// HTTPS Server Configuration
const port = 443;
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Running of https://localhost:${port}`);
})