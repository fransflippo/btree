"use strict";

// TreeMap //

function TreeMap() {
    this.root = null;
}

TreeMap.prototype.get = function(key) {
    if (this.root == null) return null;
    return this.root.get(key);
};

TreeMap.prototype.put = function(key, value) {
    if (this.root == null) {
        this.root = new TreeMapNode(key, value);
    } else {
        this.root.put(key, value);
    }
};
TreeMap.prototype.depth = function() {
    if (this.root == null) return 0;
    return this.root.depth();
};

TreeMap.prototype.print = function() {
    if (this.root == null) return;
    this.root.print(0);
};

// BTreeNode //

function TreeMapNode(key, value) {
    this.left = null;
    this.right = null;
    this.key = key;
    this.value = value;
}

// internal function that returns either the node whose key equals key, if it exists, or otherwise
// the node which would be the parent of such a node
TreeMapNode.prototype.locate = function(key) {
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

TreeMapNode.prototype.get = function(key) {
    let node = this.locate(key);
    if (node.key === key) {
        return node.value;
    } else {
        return null;
    }

};

TreeMapNode.prototype.put = function(key, value) {
    let node = this.locate(key);
    // node is now either a node where node.key == key, or the node on which
    // a new node holding key and value is to be added as either left or right
    if (node.key === key) {
        node.value = value;
    } else {
        if (key < node.key) {
            node.left = new TreeMapNode(key, value);
        } else {
            node.right = new TreeMapNode(key, value);
        }
    }
};

TreeMapNode.prototype.depth = function() {
    let leftDepth = (this.left == null ? 0 : this.left.depth());
    let rightDepth = (this.right == null ? 0 : this.right.depth());
    return 1 + Math.max(leftDepth, rightDepth);
};

TreeMapNode.prototype.print = function() {
    this.printRecursive("", true);
};

TreeMapNode.prototype.printRecursive = function(prefix, lastSibling) {
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

module.exports = TreeMap;
