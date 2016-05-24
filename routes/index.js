var express = require('express');
var router = express.Router();

/* GET home page. */
var indexController = require('../controllers/index');
router.get('/', indexController.index);

//story
var storyController = require('../controllers/story');

router.get('/story/create', function(req, res, next) {
  res.render('story/create', { title: 'Create a story' });
});

//admin
router.post('/story/create', storyController.create);
router.get('/story/edit/:story', storyController.edit);
router.post('/story/add-page/:story', storyController.addPage);
router.get('/story/edit-page/:story/:page', storyController.editPage);
router.post('/story/edit-page/add-solution/:story/:page', storyController.addSolution);
router.post('/story/edit-page/link-solution/:story/:page/:solution', storyController.linkSolutionPage);
//client
router.get('/story/play/:story', storyController.play);
router.get('/story/choose-solution/:story/:page/:solution', storyController.chooseSolution);


module.exports = router;
