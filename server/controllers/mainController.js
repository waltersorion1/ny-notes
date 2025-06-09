// server/controller/mainController.js
const mainLayout = '../views/layouts/front-page';
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