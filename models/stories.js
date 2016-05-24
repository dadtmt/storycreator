var storyHandlers = {};
exports.getStories = function(){
  //not working of course
  return storyHandlers;
}
exports.addStory = function(storyHandler){
  storyHandlers[storyHandler.story.ioNsp] = storyHandler;
  return storyHandler;
}
