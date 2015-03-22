angular.module('Pathfinder.controllers', [])
  .controller('pathfinderController', function($scope) {

    /**
     * The two-dimensional grid (Really a 2D array)
     * @type {Array}
     */
    $scope.grid = [];

    /**
     * The Pathfinder configuration object, contains important initialisers
     * @type {Object}
     */
    $scope.config = {
      rows: 30, //How many rows in the grid
      cols: 30, //How many columns in the grid
    };
    
    /**
     * The goal tracker
     * @type {Object}
     */
    $scope.goal = {
      row: 15,
      col: 15
    };
    
    /**
     * The start point
     * @type {Object}
     */
    $scope.start = {
      row: 0,
      col: 0
    }

    /**
     * Initialise a grid based on the current config
     */
    $scope.initGrid = function() {
      $scope.grid = createGrid($scope.config.rows, $scope.config.cols);
      
      setStart($scope.start.row, $scope.start.col);
      setGoal($scope.goal.row, $scope.goal.col);
    };

    /**
     * Returns a 2 dimensional array with the specified number of rows and columns
     * @param  {Integer} rows    The number of rows required in the grid
     * @param  {Integer} columns The number of columns required in the grid
     * @return {Array}         A 2 dimensional array. Access is via grid[row][column]
     */
    createGrid = function(rows, columns) {
      var grid = [];
      for(var i = 0; i <= rows; i++) {
        var row = [];
        for(var j = 0; j <= columns; j++) {
          row.push({
            "isWall": false,
            "isOccupied": false,
            "isGoal": false,
            "row": i,
            "col": j
          });
        }
        grid.push(row);
      }
      return grid;
    }

    /**
     * Handles cell clicks on a cell in the grid
     * @param  {Integer} row   The row that was clicked
     * @param  {Integer} col   The column that was clicked
     * @param  {MouseEvent} event The click event
     */
    $scope.onCellClicked = function(row, col, event) {
      if(event.ctrlKey) {
        //Goal Setting
        setGoal(row, col);
      } else if(event.shiftKey) {
        //Start Setting
        setStart(row, col);
      } else {
        //Toggle Wall
        toggleWall(row, col);
      }
    }

    setGoal = function(row, col) {
      //Cannot be
      //  Start, Wall
      //Unset current goal
      $scope.grid[$scope.goal.row][$scope.goal.col].isGoal = false;
      //Set New Goal
      $scope.goal.row = row;
      $scope.goal.col = col;
      $scope.grid[$scope.goal.row][$scope.goal.col].isGoal = true;
    };

    setStart = function(row, col) {
      //Cannot be
      //  Goal, Wall
      //Unset current start
      $scope.grid[$scope.start.row][$scope.start.col].isStart = false;
      //Set New Start
      $scope.start.row = row;
      $scope.start.col = col;
      $scope.grid[$scope.start.row][$scope.start.col].isStart = true;
    };

    toggleWall = function(row, col) {
      $scope.grid[row][col].isWall = !($scope.grid[row][col].isWall);
    }

  });