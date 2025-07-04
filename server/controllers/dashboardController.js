// server/controller/mainController.js
const Note = require('../models/Notes');
const mongoose = require('mongoose');

const dashboardLayout = '../views/layouts/dashboard';

/**
 * GET /
 * Dashboard
 */
exports.dashboard = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  const locals = {
    title: 'Dashboard',
    description: 'Free NodeJs Notes App'
  };


  try {
    // Mongoose ^7.0.0 Updates
    const notes = await Note.aggregate([
      {$sort: { updatedAt: -1 }},
      {$match: {user: new mongoose.Types.ObjectId(req.user.id)}},
      {
        $project: {
          title: { $substr: ['$title', 0, 30] },
          body: { $substr: ['$body', 0, 100] }
        },
      },
    ])
    .skip(perPage * page -perPage)
    .limit(perPage)
    .exec();

    const count = await Note.countDocuments();

    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage)
    });

  } catch (error) {
    console.log(error);
  }

}


/**
 * GET /
 * View Specific Note
 */
exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id }).lean() // So that only the user that created the note can view the note created by them
  
  if (note) {
    res.render('dashboard/view-note', {
      noteID: req.params.id,
      note,
      layout: dashboardLayout
    })
  } else {
    res.send('Something went wrong.');
  }

}


/**
 * PUT /
 * Update Specific Note
 */
exports.dashboardUpadteNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });

    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
}


/**
 * DELETE /
 * Delete Specific Note
 */
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });

    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
}

/**
 * GET /
 * Add Note
 */
exports.dashboardAddNote = async (req, res) => {
  res.render('dashboard/add', {
    layout:  dashboardLayout
  });
}


/**
 * POST /
 * Add Note
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect('/dashboard');
    
  } catch (error) {
    console.log(error)
  }
}


/**
 * GET /
 * Search
 */
exports.dashboardSearch = async (req, res) => {
  try {
    res.render('dashboard/search', {
      searchResults: '',
      layout:  dashboardLayout
    })
    
  } catch (error) {
    console.log(error)
  }
}


/**
 * POST /
 * Search For Notes
 */
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChars, 'i') } }
      ]
    }).where({ user: req.user.id });

    res.render('dashboard/search', {
      searchResults,
      layout:  dashboardLayout
    })
    
  } catch (error) {
    console.log(error)
  }
}