class Node {
  constructor(row, col, type) {
    this.id = `${row},${col}`;
    this.row = row;
    this.col = col;
    this.type = type;
  }
}

export default Node;