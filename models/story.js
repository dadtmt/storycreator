'use strict'

const snake = require('to-snake-case');

/**
 * Story model
 */
class Story {

  /**
   * Instantiate a Story
   * @param  string title Story title
   * @return void
   */
  constructor(title) {
    this.title = title;
    this.ioNsp = snake(title);
    this.pages = {};
    this.nbPagesAdded = 0;
  }

  /**
   * Add a Page to the story
   * Set the page index
   * @param Page page a page to add
   * @return void
   */
  addPage(page) {
    this.nbPagesAdded++;
    page.createdIndex = this.nbPagesAdded;
    this.pages[page.createdIndex] = page;
  }

  /**
   * Get the page room name
   * @param  int pageIndex the page index
   * @return string          the page room name
   */
  getPageRoomName(pageIndex) {
    return this.ioNsp+"-"+pageIndex;
  }
}

module.exports = Story;
