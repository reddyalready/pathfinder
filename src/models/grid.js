import Node from "./node"

class Grid {
  constructor(size) {
    this.size = size;
    this.grid = [];

    const middle = Math.floor(this.size / 2);

    this.grid = this._initGrid();

    this.start = this.grid[0][middle];
    this.start.type = 'start';

    this.goal = this.grid[middle][middle];
    this.goal.type = 'goal';
  }

  _initGrid() {
    const grid = [];

    for (let thisRow = 0; thisRow < this.size; thisRow++) {
      const row = [];
      for (let thisCol = 0; thisCol < this.size; thisCol++) {
        row[thisCol] = new Node(thisRow, thisCol, 'open');
      }
      grid[thisRow] = row
    }

    return grid
  }

  rows() {
    return this.grid
  }

  toggleType(selected) {
    //Left click toggles between open and wall
    if (selected.type === 'open') {
      selected.type = 'wall'
    } else {
      selected.type = 'open'
    }
    this.grid[selected.row].splice(selected.col, 1, selected)
  }

  setStart(selected) {
    this.swap(this.goal, selected);
  }

  setGoal(selected) {
    this.swap(this.start, selected);
  }

  isGoal(node) {
    return node.row === this.goal.row && node.col === this.goal.col;
  }

  swap(currentPointer, newSelection) {
    //Unset square pointed to by currentPointer
    const currentPointerType = this.grid[currentPointer.row][currentPointer.col].type;
    const newSelectionCurrentType = newSelection.type;
    this.grid[currentPointer.row].splice(currentPointer.col, 1, { row: currentPointer.row, col: currentPointer.col, type: newSelectionCurrentType});
    //Set the new one
    this.grid[newSelection.row].splice(newSelection.col, 1, { row: newSelection.row, col: newSelection.col, type: currentPointerType });
    currentPointer.row = newSelection.row;
    currentPointer.col = newSelection.col;
  }

  /**
   * Returns a list of nodes that are neighbours to the given one
   *
   * @param node The node for which to return in-bound neighbour
   */
  neighbours(node) {
    let neighbours = [];
    for(let row = node.row - 1; row <= node.row + 1; row++) { //Range from row -1 to +1
      for(let col = node.col - 1; col <= node.col + 1; col++) { //Range from col -1 to +1
        if(this.isInBounds(row, col)) {
          neighbours.push(this.grid[row][col])
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
    if(next.row !== previous.row && next.col !== previous.col) {
      return 14;
    }
    return 10;
  }
}

export default Grid;