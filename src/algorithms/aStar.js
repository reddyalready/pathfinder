/**
 * A Star algorithm implementation - see http://theory.stanford.edu/~amitp/GameProgramming/
 */

import PriorityQueue from 'js-priority-queue'
import CostedNode from '../models/costedNode'

export default {
  findPath: function (grid) {
    const nodesToExplore = new PriorityQueue({comparator: function(a,b) { return a.cost - b.cost }});
    const solution = {};

    const startNode = grid.getStartNode();
    nodesToExplore.queue(new CostedNode(startNode, 0));
    solution[startNode.id] = { cost: 0, previous: null };

    while(nodesToExplore.length > 0) {
      const current = nodesToExplore.dequeue();

      if(grid.isGoal(current)) {
        break;
      }

      const costToCurrent = solution[current.id].cost;

      for(const next of grid.neighbours(current)) {
        const newCost = costToCurrent + grid.calculateTravelCost(current, next);
        if(!(next.id in solution) || solution[next.id].cost > newCost) {
          const priority = newCost + this.calculateHeuristic(next, grid.goal);
          nodesToExplore.queue(new CostedNode(next, priority));
          solution[next.id] = { cost: newCost, previous: current.id };
        }
      }
    }

    if(grid.goal.id in solution) {
      solution['solved'] = true;
      let currentNode = solution[grid.goal.id];
      while(typeof currentNode !== 'undefined') {
        currentNode.isOnPath = true;
        currentNode = solution[currentNode.previous]
      }
    }

    return solution
  },
  /**
   * Calculates the h-cost or the heuristic for travelling from this node
   * to the goal node. Uses the maximum possible straight line distance and
   * multiplies it so that the h-cost is always greater than the g-cost.
   *
   * This makes the A* algorithm a best-first search.
   *
   * For more information go here:
   * <http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#S1>
   *
   * @param node The node to calculate heuristic for
   * @param goal The goal node
   * @return int The estimated cost of travelling to the goal node
   */
  calculateHeuristic(node, goal) {
    return 20 * Math.max(Math.abs(node.row - goal.row), Math.abs(node.col - goal.col));
  }
}