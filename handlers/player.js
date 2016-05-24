'use strict'

class Player {

/**
 * Instantiate Player
 * @param  Socket socket       the smelly player socket
 * @param  StoryHandler storyHandler The story the player is playing
 * @return void
 */
  constructor(socket, storyHandler) {
    this.socket = socket;
    this.storyHandler = storyHandler;
    this.currentPageRoom = null;
  }

/**
 * Set the listener for the socket
 * @return {[type]} [description]
 */
  playerSubscription() {
    var player = this;
    this.socket.on('choose-solution',function(solution){
      console.log("Player choose solution "+solution.createdIndex);
      player.chooseSolution(solution);
    });
  }

  /**
   * is this very useful ? For now page 1 is the first page
   * @return void
   */
  goToFirstPage() {
    //join the first page room
    this.goToPage(1);
  }

  /**
   * SOCKET join a room named after the page indexOf
   * then the StoryHandler is asks for the page
   * 	will serve it if the page exists
   * 	if not the page will be served to that room when added to the story
   * @param  int pageIndex the page index!
   * @return void
   */
  goToPage(pageIndex) {
    this.currentPageRoom = this.storyHandler.story.getPageRoomName(pageIndex);
    this.socket.join(this.currentPageRoom);
    this.storyHandler.servePage(this.storyHandler.getPage(pageIndex));
  }

/**
 * The player choose a solution and leave the current page room
 * if the solution has a target page player go to the page
 * else will listen once for the link-page-solution-SolutionID StoryHandler event
 * @param  Solution solution The choosen path...
 * @return void
 */
  chooseSolution(solution) {
    this.socket.leave(this.currentPageRoom);
    var player = this;
    if(solution.targetPageIndex) {
      this.goToPage(solution.targetPageIndex);
    } else {
      this.storyHandler.once(
        'link-page-solution-'+solution.createdIndex,
        function(solution){
            player.chooseSolution(solution);
      });
    }
  }
}

module.exports = Player
