const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors module

const app = express();
const router = express.Router()
const PORT = 4000;
// Body parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.json())


// Use the cors middleware
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('./assets'));
const formController = require('./src/controllers/formController');
const { Z_FIXED } = require('zlib');

// Serve HTML files from the 'views' directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'about.html'));
});
app.get('/branch', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'branch.html'));
});
app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'gallery.html'));
});
app.get('/product-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'product-details.html'));
});
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'projects.html'));
});
app.get('/sample-inner-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'sample-inner-page.html'));
});
app.get('/service-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'service-details.html'));
});
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'services.html'));
});
app.get('/treading', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'treading.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'contact.html'));
});

// Route for handling form submissions
app.get('/send', formController.sendEmail);
app.post('/send', formController.sendEmail);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
