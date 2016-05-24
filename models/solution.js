function Solution(text){
  this.text = text;
  //needed??? cannot be sent via socket
  //this.parentPage = parentPage;
  this.targetPageIndex = "";
  this.createdIndex = 0;
}

Solution.prototype.linkPage = function(page){
  this.targetPageIndex = page.createdIndex;
}

module.exports = Solution;
