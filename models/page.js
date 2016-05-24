'use strict'

/**
 * Page model
 */
class Page {

  /**
   * Instantiate a page
   * @param  string title page title
   * @param  string text  page text
   * @return void
   */
  constructor(title, text) {
    this.title = title;
    this.text = text;
    this.createdIndex = 0;
    this.nbSolutionsAdded = 0;
    this.solutions = {};
  }

  /**
   * Add a solution to the page
   * @param Solution solution solution to be added
   * @return void
   */
  addSolution(solution) {
    this.nbSolutionsAdded++;
    var solutionIndex = this.createdIndex+'-'+this.nbSolutionsAdded;
    console.log("solutionIndex "+solutionIndex);
    solution.createdIndex = solutionIndex;
    this.solutions[solutionIndex] = solution;
  }
}

module.exports = Page;
