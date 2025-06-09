// server/controller/mainController.js
const frontPageLayout = '../views/layouts/front-page';
const mainLayout = '../views/layouts/main';

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const locals = {
    title: 'NodeNotes',
    description: 'Free NodeJs Notes App'
  };

  res.render('index', {
    locals,
    layout: frontPageLayout
  });
}

/**
 * GET /
 * Features
 */
exports.features = async (req, res) => {
  const locals = {
    title: 'Features - NodeNotes',
    description: 'Free NodeJs Notes App'
  };
  
  res.render('features', {
    locals,
    layout: mainLayout
  });
}

/**
 * GET /
 * FAQs
 */
exports.faqs = async (req, res) => {
  const locals = {
    title: 'FAQs - NodeNotes',
    description: 'Free NodeJs Notes App'
  };
  
  res.render('faqs', {
    locals,
    layout: mainLayout
  });
}

/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: 'About - NodeNotes',
    description: 'Free NodeJs Notes App'
  };
  
  res.render('about', {
    locals,
    layout: mainLayout
  });
}

/**
 * GET /
 * Contact
 */
exports.contact = async (req, res) => {
  const locals = {
    title: 'Contact - NodeNotes',
    description: 'Free NodeJs Notes App'
  };
  
  res.render('contact', {
    locals,
    layout: mainLayout
  });
}