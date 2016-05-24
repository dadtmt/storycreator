//TOFIX too much import, models instanciation should be done in StoryHandler
var Page = require('../models/page');
var Stories = require('../models/stories');
var Story = require('../models/story');
var Solution = require('../models/solution');
var StoryHandler = require('../handlers/story');

/**
 * Handle story creation request
 */
exports.create = function(req, res, next) {
  var story = new Story(req.body.title);
  var storyHandler = new StoryHandler(story);
  storyHandler.connection();
  Stories.addStoryHandler(storyHandler);
  res.render('story/admin', {
    story : story
  });
};

/**
 * Edit a story
 */
exports.edit = function(req, res, next) {
  var storyHandler  = Stories.getStoryHandlers()[req.params.story];
  if (storyHandler == null){
    res.status(404).send('Not found');
  }
  res.render('story/admin', {story : storyHandler.story});
};

/**
 * Add page
 */
exports.addPage = function(req, res, next) {
  var storyHandler  = Stories.getStoryHandlers()[req.params.story];
  if (storyHandler == null){
    res.status(404).send('Not found');
  }
  var page = new Page(req.body.addPageTitle, req.body.addPageText);
  storyHandler.addPage(page);
  res.render('story/admin', {story : storyHandler.story});
};

/**
 * Edit page
 */
exports.editPage = function(req, res, next) {
  var storyHandler  = Stories.getStoryHandlers()[req.params.story];
  if (storyHandler == null){
    res.status(404).send('Story Not found');
  }
  var page = storyHandler.getPage(req.params.page);
  if (page == null){
    res.status(404).send('Page Not found');
  }
  res.render('story/page', {story : storyHandler.story, page : page});
};

/**
 * Add Solution
 */
exports.addSolution = function(req, res, next) {
  var storyHandler  = Stories.getStoryHandlers()[req.params.story];
  if (storyHandler == null){
    res.status(404).send('Story Not found');
  }
  var page = storyHandler.getPage(req.params.page);
  if (page == null){
    res.status(404).send('Page Not found');
  }
  var solution = new Solution(req.body.addSolutionText);
  storyHandler.addSolutionToPage(page,solution);
  res.render('story/page', {
    story : storyHandler.story,
    page : page
  });
}

exports.linkSolutionPage = function(req, res, next) {

  var storyHandler  = Stories.getStoryHandlers()[req.params.story];
  if (storyHandler == null){
    res.status(404).send('Story Not found');
  }
  var page = storyHandler.getPage(req.params.page);
  if (page == null){
    res.status(404).send('Page Not found');
  }
  var solution = page.solutions[req.params.solution];
  if (solution == null){
    res.status(404).send('Solution Not found');
  }
  var pageToLink = storyHandler.getPage(req.body.pageToLink);
  storyHandler.linkPageToSolution(pageToLink, solution);
  res.render('story/page', {story : storyHandler.story, page : page});
}

/**
 * Handle a client request to play a story
 */
exports.play = function(req, res, next) {
  var storyHandler  = Stories.getStoryHandlers()[req.params.story];
  if (storyHandler == null){
    res.status(404).send('Story Not found');
  }
  res.render('story/client', {
    story : storyHandler.story
  });
};

exports.chooseSolution = function(req, res, next) {
  var story  = Stories.getStoryHandlers()[req.params.story];
  var page = story.pages[req.params.page];
  var solution = page.solutions[req.params.page];
  if (story == null || page == null || solution == null){
    res.status(404).send('Not found');
  }
  res.send(solution.targetPage);
};
