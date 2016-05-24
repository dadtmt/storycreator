var snake = require('to-snake-case');

function Story(title){
  this.title = title;
  this.ioNsp = snake(title);
  this.pages = {};
  this.nbPagesAdded = 0;
};

Story.prototype.addPage = function(page){
  this.nbPagesAdded++;
  page.createdIndex = this.nbPagesAdded;
  this.pages[page.createdIndex] = page;
}

Story.prototype.getPageRoomName = function(pageIndex){
  return this.ioNsp+"-"+pageIndex;
}


//get a room name based on choosen solution, if no choosen solution give a room name for the first page
// Story.prototype.getSolutionRoomName = function(solution){
//   if (!solution) {
//     return this.ioNsp+'-1'
//   }
//   return this.ioNsp+'-'+solution.parentPage.createdIndex+'-'+solution.createdIndex;
// }
//
// Story.prototype.getChoosenSolutionRoomName = function(){
//   return this.getSolutionRoomName(this.playerChoosenSolution);
// }

module.exports = Story;
