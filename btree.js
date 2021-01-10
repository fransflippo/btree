"use strict";

// BTree //

function BTree() {
    this.root = null;
}

BTree.prototype.get = function(key) {
    if (this.root == null) return null;
    return this.root.get(key);
};

BTree.prototype.put = function(key, value) {
    if (this.root == null) {
        this.root = new BTreeNode(key, value);
    } else {
        this.root.put(key, value);
    }
};
BTree.prototype.depth = function() {
    if (this.root == null) return 0;
    return this.root.depth();
};

BTree.prototype.print = function() {
    if (this.root == null) return;
    this.root.print(0);
};

// BTreeNode //

function BTreeNode(key, value) {
    this.left = null;
    this.right = null;
    this.key = key;
    this.value = value;
}

// internal function that returns either the node whose key equals key, if it exists, or otherwise
// the node which would be the parent of such a node
BTreeNode.prototype.locate = function(key) {
    if (this.key === key) {
        return this;
    } else {
        if (key < this.key) {
            if (this.left == null) {
                return this;
            } else {
                return this.left.locate(key);
            }
        } else {
            if (this.right == null) {
                return this;
            } else {
                return this.right.locate(key);
            }
        }
    }
};

BTreeNode.prototype.get = function(key) {
    let node = this.locate(key);
    if (node.key === key) {
        return node.value;
    } else {
        return null;
    }

};

BTreeNode.prototype.put = function(key, value) {
    let node = this.locate(key);
    // node is now either a node where node.key == key, or the node on which
    // a new node holding key and value is to be added as either left or right
    if (node.key === key) {
        node.value = value;
    } else {
        if (key < node.key) {
            node.left = new BTreeNode(key, value);
        } else {
            node.right = new BTreeNode(key, value);
        }
    }
};

BTreeNode.prototype.depth = function() {
    let leftDepth = (this.left == null ? 0 : this.left.depth());
    let rightDepth = (this.right == null ? 0 : this.right.depth());
    return 1 + Math.max(leftDepth, rightDepth);
};

BTreeNode.prototype.print = function() {
    this.printRecursive("", true);
};

BTreeNode.prototype.printRecursive = function(prefix, lastSibling) {
    console.log(prefix + "○ " + this.key + " --> " + this.value);
    let childPrefix = prefix;
    if (!lastSibling) {
        childPrefix = childPrefix + "| ";
    } else {
        childPrefix = childPrefix + "  ";
    }
    if (this.left != null) {
        this.left.printRecursive(childPrefix, this.right == null);
    }
    if (this.right != null) {
        this.right.printRecursive(childPrefix, true);
    }
};

module.exports = BTree;
