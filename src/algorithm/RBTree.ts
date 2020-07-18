import { TreeNode, BSTree, compareConfig } from './BSTree';

enum colorConfig {
  red = 0,
  black = 1,
};

/**
 * @class
 * @description  红黑树辅助节点对象
 */
export class RBTreeNode<K> extends TreeNode<K> {
  public left: RBTreeNode<K> | null = null;
  public right: RBTreeNode<K> | null = null;
  public parent: RBTreeNode<K> | null;
  public clolr: number = colorConfig.red;
  constructor(key: K) {
    super(key);
  }
  isRed(): boolean {
    return this.clolr === colorConfig.red;
  }
}

export class RBTree<T> extends BSTree<T> {
  protected root: RBTreeNode<T> | null = null;
  constructor(...values: T[]) {
    super(...values);
  }

  public insert(key: T) {
    if (this.root === null) {
      // 树为空，创建一个红黑树节点
      this.root = new RBTreeNode(key);
      // 根节点的颜色为黑色
      this.root.clolr = colorConfig.red;
    } else {
      // 在合适的位置插入节点, insertNode方法返回新插入的节点
      const newNode = this._insertNode(this.root, key);
      // 节点插入后，验证红黑树属性
    }
  }
  private _insertNode(node: RBTreeNode<T>, key: T): RBTreeNode<T> {
    const compareResult = this.compare(node.key, key);
    // 当前插入key小于当前节点的key
    if (compareResult === compareConfig.left) {
       // 当前节点的左子树为null直接插入
       if (node.left === null) {
         // 在当前节点的左子节点创建一个红黑树节点
        node.left = new RBTreeNode(key);
        // 保存父节点的引用
        node.left.parent = node;
        // 返回节点的引用
        return node.left;
       } else {
         // 当前节点的左子节点不为null, 递归寻找合适的位置将其插入
         return this._insertNode(node.left, key);
       }
    }
    // 右子节点为null
    else if (node.right === null) {
      // 在当前节点的右子节点创建一个红黑树节点
      node.right = new RBTreeNode(key);
      // 保存父节点的引用
      node.right.parent = node;
      // 返回节点的引用
      return node.right; 
    } else {
      return this._insertNode(node.right, key);
    }
  }
}

