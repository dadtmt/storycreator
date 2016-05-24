function Page(title, text){
  this.title = title;
  this.text = text;
  this.createdIndex = 0;
  this.nbSolutionsAdded = 0;
  this.solutions = {};
};
Page.prototype.addSolution = function(solution){
  this.nbSolutionsAdded++;
  var solutionIndex = this.createdIndex+'-'+this.nbSolutionsAdded;
  console.log("solutionIndex "+solutionIndex);
  solution.createdIndex = solutionIndex;
  this.solutions[solutionIndex] = solution;
}
module.exports = Page;
