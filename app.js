// app.js
require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override'); // Let us use other HTTP verbs like PUT, DELETE, etc...
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
  //cookie: { maxAge: new Date(Date.now() + (3600000) ) } // 7 days: 604800000
  // Date.now() - 30 * 24 * 60 * 60 * 1000
}));

// Connect to database
connectDB();

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// // Session setup (before passport)
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
// }));

app.use(passport.initialize());
app.use(passport.session());


// Static Files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// Handle 404
app.use((req, res) => {
  // res.status(404).send('404 Page Not Found.');
  res.status(404).render('404');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});