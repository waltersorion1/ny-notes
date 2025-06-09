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