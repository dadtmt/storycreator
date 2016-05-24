'use strict'

/**
 * Solution model
 */
class Solution {

  /**
   * Instantiate a Solution
   * @param  string text Solution text
   * @return void
   */
  constructor(text) {
    this.text = text;
    this.targetPageIndex = "";
    this.createdIndex = 0;
  }

  /**
   * link a page to the solution
   * @param  Page page the target page
   * @return void
   */
  linkPage(page) {
    this.targetPageIndex = page.createdIndex;
  }
}

module.exports = Solution;
