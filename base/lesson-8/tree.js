var Leaf = /** @class */ (function () {
    function Leaf(key) {
        this.key = key;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
    }
    return Leaf;
}());
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = null;
    }
    Tree.prototype.find = function (key) {
        var current = this.root;
        while ((current === null || current === void 0 ? void 0 : current.key) !== key) {
            if (current && key < (current === null || current === void 0 ? void 0 : current.key)) {
                current = current.leftChild;
            }
            if (current && key > current.key) {
                current = current.rightChild;
            }
            if (current === null)
                return null;
        }
        return current;
    };
    Tree.prototype.insert = function (key) {
        var newLeaf = new Leaf(key);
        if (this.root === null) {
            this.root = newLeaf;
            return;
        }
        var parent = this.root;
        while (true) {
            if (parent.key > key && parent.leftChild) {
                parent = parent.leftChild;
            }
            if (parent.key < key && parent.rightChild) {
                parent = parent.rightChild;
            }
            if (parent.key > key && parent.leftChild === null) {
                newLeaf.parent = parent;
                parent.leftChild = newLeaf;
                return;
            }
            if (parent.key < key && parent.rightChild === null) {
                newLeaf.parent = parent;
                parent.rightChild = newLeaf;
                return;
            }
        }
    };
    Tree.prototype.inOrder = function (localRoot) {
        if (localRoot !== null) {
            this.inOrder(localRoot.leftChild);
            console.log(localRoot.key);
            this.inOrder(localRoot.rightChild);
        }
    };
    Tree.prototype.min = function () {
        var _a;
        if (((_a = this.root) === null || _a === void 0 ? void 0 : _a.leftChild) === null)
            return this.root;
        var current = this.root;
        while (current === null || current === void 0 ? void 0 : current.leftChild) {
            current = current === null || current === void 0 ? void 0 : current.leftChild;
        }
        return current;
    };
    Tree.prototype.max = function () {
        var _a;
        if (((_a = this.root) === null || _a === void 0 ? void 0 : _a.rightChild) === null)
            return this.root;
        var current = this.root;
        while (current === null || current === void 0 ? void 0 : current.rightChild) {
            current = current.rightChild;
        }
        return current;
    };
    Tree.prototype.delete = function (key) {
        var _a, _b, _c, _d, _e;
        var current = this.root;
        if (((_a = this.root) === null || _a === void 0 ? void 0 : _a.leftChild) === null && this.root.rightChild === null) {
            this.root = null;
        }
        while ((current === null || current === void 0 ? void 0 : current.key) !== key) {
            if ((current === null || current === void 0 ? void 0 : current.key) && key < (current === null || current === void 0 ? void 0 : current.key)) {
                current = current.leftChild;
            }
            if ((current === null || current === void 0 ? void 0 : current.key) && key > current.key) {
                current = current.rightChild;
            }
            if (current === null)
                return null;
        }
        /**
         * Если элемент является листом, то в родителе убираем ссылку на него.
         */
        if (current.leftChild === null &&
            current.rightChild === null &&
            current.key) {
            var parent_1 = current.parent;
            if ((parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.leftChild) && ((_b = parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.leftChild) === null || _b === void 0 ? void 0 : _b.key) === key)
                parent_1.leftChild = null;
            if ((parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.rightChild) && ((_c = parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.rightChild) === null || _c === void 0 ? void 0 : _c.key) === key)
                parent_1.rightChild = null;
        }
        /**
         * Если у элемента есть только один потомок, то на место удаляемого ставится этот потомок.
         */
        if ((current.leftChild === null && current.rightChild !== null) ||
            (current.leftChild !== null && current.rightChild === null)) {
            var child = current.leftChild || current.rightChild;
            var parent_2 = current.parent;
            if ((parent_2 === null || parent_2 === void 0 ? void 0 : parent_2.leftChild) && ((_d = parent_2 === null || parent_2 === void 0 ? void 0 : parent_2.leftChild) === null || _d === void 0 ? void 0 : _d.key) === key) {
                parent_2.leftChild = child;
            }
            if ((parent_2 === null || parent_2 === void 0 ? void 0 : parent_2.rightChild) && ((_e = parent_2 === null || parent_2 === void 0 ? void 0 : parent_2.rightChild) === null || _e === void 0 ? void 0 : _e.key) === key) {
                parent_2.rightChild = child;
            }
        }
        /**
         * Если у элемента есть два потомка, то нужно найти приемника. Пойти направо и искать по левой части правой стороны.
         * Ищем элемент у которого нет левого ребенка,
         *  - вставляем его на место удаляемого
         *  - левым ребенком НАЙДЕННОГО делаем левую часть УДАЛЯЕМОГО.
         */
        if (current.leftChild && current.rightChild) {
            // const removableParent = current.parent;
            // const removableLeftChild = current.leftChild;
            var receiver = current.rightChild;
            while (receiver.leftChild !== null) {
                receiver = receiver.leftChild;
            }
            // receiver.parent = removableParent;
            // receiver.leftChild = removableLeftChild;
            console.log(receiver);
        }
    };
    return Tree;
}());
var tree = new Tree();
tree.insert(10);
// tree.insert(32);
tree.insert(22);
tree.insert(42);
tree.insert(5);
tree.insert(62);
tree.insert(2);
tree.insert(51);
// console.log(tree.inOrder(tree.root));
// tree.delete(32);
// console.log(tree.inOrder(tree.root));
function createNode(node) {
    var obj = {
        key: node.key.toString(),
        children: [],
    };
    if (node.leftChild) {
        obj.children.push(createNode(node.leftChild));
    }
    if (node.rightChild) {
        obj.children.push(createNode(node.rightChild));
    }
    return obj;
}
var config = createNode(tree.root);
var root = document.querySelector(".root");
function renderNode(key, index) {
    var div = document.createElement("span");
    div.innerText = key;
    return div;
}
function renderTree(config, index) {
    var stack = [];
    stack.push(config.children);
    root === null || root === void 0 ? void 0 : root.append(renderNode(config.key));
    var _loop_1 = function () {
        var subRoot = document.createElement("div");
        var children = stack.pop();
        console.log(children);
        children === null || children === void 0 ? void 0 : children.forEach(function (item) {
            if ((item === null || item === void 0 ? void 0 : item.children.length) > 0)
                stack.push(item === null || item === void 0 ? void 0 : item.children);
            subRoot.append(item.key);
        });
        root === null || root === void 0 ? void 0 : root.append(subRoot);
    };
    while (stack.length > 0) {
        _loop_1();
    }
    return renderNode(config.key);
}
// @ts-ignore
renderTree(config);
