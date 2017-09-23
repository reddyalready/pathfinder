import Node from "./node"

class CostedNode extends Node {
  constructor(node, cost) {
    super(node.row, node.col, node.type);
    this.cost = cost;
  }
}

export default CostedNode;