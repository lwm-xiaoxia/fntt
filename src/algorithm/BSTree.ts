/**
 * @file 二叉树算法的实现过程
 */


/**
 * @class
 * @description 创建二叉树的辅助节点
 */
export class TreeNode<K> {
  public key: K;
  public left: TreeNode<K> | null = null;
  public right: TreeNode<K> | null = null;
  constructor (key: K) {
    this.key = key;
  }
}

// -1表示左边插入节点，1表示右边插入节点
export enum compareConfig {
  left = -1,
  right = 1,
};

// -1--left 1--right
type CompareReturnType = compareConfig.left | compareConfig.right;

/**
 * @class
 * @description 实现二叉树算法的类
 */
export class BSTree<T> {
  protected root: TreeNode<T> | null = null; // 根节点
  constructor (...values: T[]) {
    values.forEach(value => this.insert(value));
  }

  /**
   * @method
   * @param tragetKey 被比较的key
   * @param key 新插入到要比较的key
   * @returns 返回比较结果 -1--left 1--right
   */
  protected compare (tragetKey: T, key: T): CompareReturnType {
    if (key > tragetKey) return compareConfig.right;
    else if (key < tragetKey ) return compareConfig.left;
  }

  /**
   * @method
   * @description 插入新的节点
   * @param key 要插入的节点的key
   */
  public insert(key: T){
    // 如果根节点不存在则直接新建一个节点
    if (this.root === null) this.root = new TreeNode(key);  
    // 在根节点中找合适的位置插入子节点
    else this._insertNode(this.root, key);
  }
  private _insertNode (node: TreeNode<T>, key: T) {
    const compareResult = this.compare(node.key, key);
    // 新节点的键小于当前节点的键，则将新节点插入当前节点的左边
    if (compareResult === compareConfig.left) {
      // 当前节点的左子树为null直接插入
      if (node.left === null) node.left = new TreeNode(key);
      // 从当前节点(左子树)向下递归,找到null位置将其插入
      else this._insertNode(node.left, key);
    } 
    // 新节点的键大于当前节点的键，则将新节点插入当前节点的右边
    else if (compareResult === compareConfig.right) {
      // 当前节点的右子树为null直接插入
      if (node.right === null) node.right = new TreeNode(key);
      // 从当前节点(右子树)向下递归，找到null位置将其插入
      else this._insertNode(node.right, key);
    }
  }

  /**
   * @method
   * @description 给定key来搜索节点
   * @param key 
   * @returns 返回搜索到的节点对象
   */
  search(key: T): undefined | TreeNode<T> {
    return this._searchNode(this.root, key);
  }
  private _searchNode(node: TreeNode<T> | null, key: T): undefined | TreeNode<T> {
    if (node === null) return; 
    const nodeKey = node.key;
    // 节点已找到
    if (nodeKey === key) return node;
    // 要查找的key在节点的右侧
    else if (nodeKey > key) return this._searchNode(node.left, key); 
    // 要查找的key在节点的左侧
    else return this._searchNode(node.right, key);
  }

  /**
   * @method
   * @description 求极值
   * @param node 开始索引的节点（根节点）
   * @param isMax true是求最大值，false是求最小值
   * @returns 返回极值节点
   */
  private _extremum(node: TreeNode<T>, isMax: boolean): TreeNode<T> {
    let current = node;
    while (current !== null && (isMax ? current.right : current.left) !== null ) {
      current = isMax ? current.right : current.left;
    }
    return current;
  }
  public max(): TreeNode<T> {
    return this._extremum(this.root, true);
  }
  public min(): TreeNode<T> {
    return this._extremum(this.root, false);
  }
}

export default function bsTree<T>(...values: T[]) {
  return new BSTree(...values);
};