//TOFIX too much import, models instanciation should be done in StoryHandler
var Page = require('../models/page');
var Stories = require('../models/stories');
var Story = require('../models/story');
var Solution = require('../models/solution');
var StoryHandler = require('../handlers/story');

/**
 * List the stories with a play link!
 *
 * TEST HAS TO BE MOVED
 */
exports.index = function(req, res, next) {
  
  //create a test story if it not exists
  if (Stories.getStoryHandlers()['la_cueillette_des_champignons'] == null) {
    console.log("Create the story");
    var story = new Story('La cueillette des champignons.');
    var storyHandler = new StoryHandler(story);
    storyHandler.connection();
    Stories.addStoryHandler(storyHandler);
    var page = storyHandler.addPage(new Page('Devant la foret', 'Le sentier se sépare devant vous, où vous dirigez vous?'));
    var solution01 = storyHandler.addSolutionToPage(page,new Solution("A gauche"));
    var solution02 = storyHandler.addSolutionToPage(page,new Solution("Devant en plein dans la foret"));
    var solution03 = storyHandler.addSolutionToPage(page,new Solution("A droite"));

    var page1 = storyHandler.addPage(new Page('Dans les bois', 'Sous les arbres poussent quelques champignons tous plus appétissant les uns que les autres.'));
    var solution11 = storyHandler.addSolutionToPage(page1, new Solution("Je recule prudemment."));
    var solution12 = storyHandler.addSolutionToPage(page1, new Solution("Je cueille les rouges à pois blancs."));
    var solution13 = storyHandler.addSolutionToPage(page1, new Solution("Je chante une chanson de chasseur."));

    storyHandler.linkPageToSolution(page1, solution02);
    storyHandler.linkPageToSolution(page, solution11);
  }


  res.render('index', {stories : Stories.getStoryHandlers()});
}
