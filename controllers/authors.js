// Default dependencies
const express = require('express');

// Relative dependencies
const Author = require('../models/author.js');

const router = express.Router(); // Init express router

// All authors route
router.get('/', (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name != '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
	try {
		const author = new Author.find({});
		res.render('authors/index', { author });
	} catch {
		res.redirect('/');
	}
});

// New author route
router.get('/new', (req, res) => {
	res.render('authors/new', { author: new Author() });
});

// Create authors route
router.post('/', async (req, res) => {
	const author = new Author({
		name: req.body.name,
	});
	try {
		const newAuthor = await author.save();
		// res.redirect(`authors/${newAuthor.id}`);
		res.redirect('authors');
	} catch {
		res.render('authors/new', {
			author,
			message: 'Failed to create an author',
		});
	}
});

module.exports = router;
