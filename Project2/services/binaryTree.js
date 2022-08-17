const { AVLTree, defaultCompare } = require("./AVLTree");

// class Node {
//   constructor(key) {
//     this.key = key;
//     this.left = null;
//     this.right = null;
//   }
// }

// const Compare = {
//   LESS_THAN: -1,
//   BIGGER_THAN: 1,
//   EQUALS: 0,
// };

// class BinarySearchTree {
//   constructor(CompareFn = this.defaultCompare) {
//     this.CompareFn = CompareFn;
//     this.root = null;
//   }
//   defaultCompare(a, b) {
//     if (a == b) {
//       return Compare.EQUALS;
//     }
//     return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
//   }
//   insert(key) {
//     if (this.root == null) {
//       this.root = new Node(key);
//     } else {
//       this.insertNode(this.root, key);
//     }
//   }

//   insertNode(node, key) {
//     if (this.CompareFn(key, node.key) === Compare.LESS_THAN) {
//       if (node.left == null) {
//         node.left = new Node(key);
//       } else {
//         this.insertNode(node.left, key);
//       }
//     } else {
//       if (node.right == null) {
//         node.right = new Node(key);
//       } else {
//         this.insertNode(node.right, key);
//       }
//     }
//   }
//   inOrderTraverse(callback) {
//     this.inOrderTraverseNode(this.root, callback);
//   }
//   inOrderTraverseNode(node, callback) {
//     if (node != null) {
//       this.inOrderTraverseNode(node.left, callback);
//       callback(node.key);
//       this.inOrderTraverseNode(node.right, callback);
//     }
//   }

//   preOrderTraverse(callback) {
//     this.preOrderTraverseNode(this.root, callback);
//   }
//   preOrderTraverseNode(node, callback) {
//     if (node != null) {
//       callback(node.key);
//       this.preOrderTraverseNode(node.left, callback);
//       this.preOrderTraverseNode(node.right, callback);
//     }
//   }

//   postOrderTraverse(callback) {
//     this.postOrderTraverseNode(this.root, callback);
//   }
//   postOrderTraverseNode(node, callback) {
//     if (node != null) {
//       this.postOrderTraverseNode(node.left, callback);
//       this.postOrderTraverseNode(node.right, callback);
//       callback(node.key);
//     }
//   }

//   min() {
//     return this.minNode(this.root);
//   }
//   minNode(node) {
//     let current = node;
//     while (current != null && current.left != null) {
//       current = current.left;
//     }
//     return current;
//   }

//   max() {
//     return this.maxNode(this.root);
//   }

//   maxNode(node) {
//     let current = node;
//     while (current != null && current.right != null) {
//       current = current.right;
//     }
//     return current;
//   }

//   search(key) {
//     return this.searchNode(this.root, key);
//   }
//   searchNode(node, key) {
//     if (node == null) {
//       return false;
//     }
//     if (this.CompareFn(key, node.key) === Compare.LESS_THAN) {
//       return this.searchNode(node.left, key);
//     } else if (this.CompareFn(key, node.key) === Compare.BIGGER_THAN) {
//       return this.searchNode(node.right, key);
//     } else {
//       return true;
//     }
//   }
// }

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
