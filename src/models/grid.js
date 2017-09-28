import Node from "./node"

class Grid {
  constructor(value) {
    if(Array.isArray(value)) {
      this._fromArray(value);
      return;
    }
    this._fromSize(value);
  }

  _fromSize(size) {
    const middle = Math.floor(size / 2);

    const options = {
      start: {row: 0, col: middle},
      goal: {row: middle, col: middle}
    };

    this.size = size;
    this.raw = this._initGrid(this.size, options);
    this.start = options.start;
    this.goal = options.goal;
  }

  _fromArray(rawArray) {
    this.raw = rawArray;
    this.size = this.raw.length;

    const startNode = this._find(function (node) {
      return node.type === 'start'
    });
    this.start = {row: startNode.row, col: startNode.col};

    const goalNode = this._find(function (node) {
      return node.type === 'goal'
    });
    this.goal = {row: goalNode.row, col: goalNode.col};
  }

  _initGrid(size, options) {
    const nodeArray = [];

    for (let rowIdx = 0; rowIdx < size; rowIdx++) {
      const row = [];
      for (let colIdx = 0; colIdx < size; colIdx++) {
        let type = 'open';
        if (rowIdx === options.start.row && colIdx === options.start.col) {
          type = 'start';
        } else if (rowIdx === options.goal.row && colIdx === options.goal.col) {
          type = 'goal'
        }
        row[colIdx] = new Node(rowIdx, colIdx, type);
      }
      nodeArray[rowIdx] = row
    }

    return nodeArray
  }

  _find(findFunction) {
    for (const row of this.raw) {
      const found = row.find(findFunction);
      if (found) {
        return found;
      }
    }
    return undefined
  }

  toggleType(selected) {
    //Left click toggles between open and wall
    switch (selected.type) {
      case 'open':
        selected.type = 'wall';
        break;
      case 'wall':
        selected.type = 'open';
        break;
      default:
      //Do nothing
    }
  }

  getStartNode() {
    return this.raw[this.start.row][this.start.col];
  }

  setStart(selected) {
    this._swapType(this.raw[this.start.row][this.start.col], selected);
    this.start = {row: selected.row, col: selected.col};
  }

  getGoalNode() {
    return this.raw[this.goal.row][this.goal.col];
  }

  setGoal(selected) {
    this._swapType(this.raw[this.goal.row][this.goal.col], selected);
    this.goal = {row: selected.row, col: selected.col};
  }

  isGoal(node) {
    return node.id === this.getGoalNode().id;
  }

  _swapType(node1, node2) {
    const typeSwap = node1.type;
    node1.type = node2.type;
    node2.type = typeSwap;
  }

  /**
   * Returns a list of nodes that are neighbours to the given one
   *
   * @param node The node for which to return in-bound neighbour
   */
  neighbours(node) {
    let neighbours = [];
    for (let row = node.row - 1; row <= node.row + 1; row++) { //Range from row -1 to +1
      for (let col = node.col - 1; col <= node.col + 1; col++) { //Range from col -1 to +1
        if (this.isInBounds(row, col)) {
          neighbours.push(this.raw[row][col])
        }
      }
    }
    return neighbours;
  }

  isInBounds(row, col) {
    return row >= 0 && row < this.size &&
      col >= 0 && col < this.size;
  }

  /**
   * Calculates the g-cost or travel cost to this node from the previous node.
   *
   * Only supports one step distances.
   *
   * Diagonal distances cost more than straight distances, but travelling
   * diagonally costs less than travelling at right angles.
   *
   * @param previous The node to calculate travel cost from
   * @param next The node to calculate travel cost to
   * @return int The g-cost/travel cost from the previous node
   */
  calculateTravelCost(previous, next) {
    if (next.row !== previous.row && next.col !== previous.col) {
      return 14;
    }
    return 10;
  }
}

export default Grid;