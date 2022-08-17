const { AVLTree, defaultCompare } = require("./AVLTree");

function createArray(inputvalues) {
  const dataArray = inputvalues.split(",");
  dataArray.sort(compareFunction);
  function compareFunction(a, b) {
    return a - b;
  }

  return dataArray;
}
function treeify(inputvalues) {
  var sortedArray = createArray(inputvalues);
  var tree = new AVLTree();
  for (let i = 0; i <= sortedArray.length; i++) {
    var int = parseInt(sortedArray[i]);
    tree.insert(int);
  }
  return tree;
}

module.exports = { treeify };
