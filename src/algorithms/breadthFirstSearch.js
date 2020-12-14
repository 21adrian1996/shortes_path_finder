import { states, types } from "@/algorithms/constants";

export const findNeighbours = (grid, cell) => {
  let neighbours = [];

  // Check if we have a neighbour to the left
  if (coordinateIsValid(grid, cell.x - 1, cell.y)) {
    neighbours.push(grid[cell.y - 1][cell.x - 2]);
  }
  
  // Check if we have a neighbour to the right
  if (coordinateIsValid(grid, cell.x + 1, cell.y)) {
    neighbours.push(grid[cell.y - 1][cell.x]);
  }

  // Check if we have a neighbour to the top
  if (coordinateIsValid(grid, cell.x, cell.y - 1)) {
    neighbours.push(grid[cell.y - 2][cell.x - 1]);
  }

  // Check if we have a neighbour to the bottom
  if (coordinateIsValid(grid, cell.x, cell.y + 1)) {
    neighbours.push(grid[cell.y][cell.x - 1]);
  }

  console.log("Neighbours to be added: ", neighbours);
  return neighbours;
};

function coordinateIsValid(grid, x, y) {
  let rowCount = grid.length;
  let colCount = grid[0].length;

  if (y < 1 || y > rowCount) return false;
  if (x < 1 || x > colCount) return false;

  if (grid[y - 1][x - 1].type === types.wall) {
    return false;
  }

  if (grid[y - 1][x - 1].state === states.visited) {
    return false;
  }

  return true;
}
