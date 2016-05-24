var storyHandlers = {};

exports.getStoryHandlers = function(){
  //not working of course
  return storyHandlers;
}
exports.addStoryHandler = function(storyHandler){
  console.log(storyHandler.story.ioNsp);
  storyHandlers[storyHandler.story.ioNsp] = storyHandler;
  return storyHandler;
}
