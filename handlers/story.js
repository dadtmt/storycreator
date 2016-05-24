'use strict'

const EventEmitter = require ('events').EventEmitter;
const Player = require ('../handlers/player');

/**
 * Manipulate story model
 * Emit specific events as add-page and add-solution events
 * Create Player  to
 * 	store socket
 *  listen add-page and add-solution events
 * SOCKET emit to the NameSpace
 * 	serve-page to pass a page object to a client connected in a page specific waiting room
 */
class StoryHandler extends EventEmitter  {

/**
 * Instantiate a StoryHandler for a story
 *
 * @param  Story story Story model
 * @return void
 */
  constructor(story) {
    super();

    /**
     * Story model
     * @type Story
     */
    this.story = story;

    /**
     * Instance of a socket.io NameSpace
     * Every socket related to the story will use this
     *
     * @type NameSpace
     */
    this.nsp = null;
  }

  /**
   * Set the nsp instance to the socket.io Namespace for this story
   * TEST Instantiate Player when connection is made from a player (this is for test without login)
   *
   * @return void
   */
  connection() {
    var self = this;
    var io = require('../app').io;

    //get the socket.io Namespace
    this.nsp = io.of(this.story.ioNsp);

    //Deal with player connection
    this.nsp.on('connection', function (socket){

      //TOFIX move this to a proper test class
      //TEMP use the referer to know if the socket come from player or creator
      console.log("Connection with referer: "+socket.request.headers.referer);
      var referer = socket.request.headers.referer;
      if(referer.indexOf('play') !== -1){
        //create player
        var player = new Player(socket, self);
        player.goToFirstPage();
        player.playerSubscription();

      } else {
        //TODO create creator(admin)
      }
    })
  }

  /**
   * SOCKET emit a serve-page to the page room if the page exist else do nothing
   * @param  Page page the page to  be served
   * @return void
   */
  servePage(page) {
    if(page != null) {
      this.nsp.to(
        this.story.getPageRoomName(page.createdIndex)
      ).emit('serve-page', page);
    }
  }

  /**
   * Add a page to the story
   * Then "serve" the page
   * @param Page page the page to be add to the story
   * @return void
   */
  addPage(page) {
    this.story.addPage(page);
    console.log("page added!");
    this.servePage(page);
    return page;
  }

/**
 * Add a Solution to a Page
 * @param Page page     parent Page for the Solution
 * @param Solution solution
 * @return void
 */
  addSolutionToPage(page, solution) {
    page.addSolution(solution);
    this.nsp.to(
      this.story.getPageRoomName(page.createdIndex)
    ).emit('add-solution', solution);
    return solution;
  }

  /**
   * Link a Page to a Solution
   * This makes the Page the Solution's target
   * Emit a link-page-solution-SolutionID event
   * for the players waiting for this Solution to be linked to a Page
   * @param  Page page     the target page
   * @param  Solution solution
   * @return void
   */
  linkPageToSolution(page, solution) {
    solution.linkPage(page);
    //emit event for the waiting playerSocket
    this.emit('link-page-solution-'+solution.createdIndex, solution);
  }

  /**
   * Get a page by its index
   * @param  int pageIndex Page index
   * @return Page
   */
  getPage(pageIndex) {
    return this.story.pages[pageIndex];
  }
}

module.exports = StoryHandler;
