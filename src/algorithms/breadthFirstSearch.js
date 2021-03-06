import { states, types } from "@/algorithms/constants";
import { flatMap } from "lodash";
import { printShortestPath } from "@/algorithms/helpers";

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function calculateBFS(grid, allowDiagonal, speed) {
  let queue = [];
  let start = flatMap(grid).find((col) => col.type === types.start);
  let end = flatMap(grid).find((col) => col.type === types.end);

  queue.push(start);

  while (queue.length) {
    let currentCell = queue.shift();

    // If not then we marke the current cell as visited
    grid[currentCell.y - 1][currentCell.x - 1].state = states.visited;

    // Check for neighbours
    let neighbours = findNeighbours(grid, currentCell, allowDiagonal);

    // Check if the neighbours were visitet and if not add them to the queue
    neighbours.forEach((n) => {
      if (n.state !== states.visited && n.state !== states.enqueued) {
        // Set the parent on the neighbour children
        n.parent = currentCell;
        grid[n.y - 1][n.x - 1].state = states.enqueued;
        queue.push(n);
      }
    });

    // If the current location is the target cell, we are done
    if(queue.find(n => n.y === end.y && n.x === end.x)) {
      break;
    }

    await timer(5 * (101 - speed));
  }

  return printShortestPath(end, speed);

}

function findNeighbours(grid, cell, allowDiagonal) {
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

  if (allowDiagonal) {
    // check if we have a neighbour diagonal top right
    if (coordinateIsValid(grid, cell.x + 1, cell.y - 1)) {
      neighbours.push(grid[cell.y - 2][cell.x]);
    }

    // check if we have a neighbour diagonal top left
    if (coordinateIsValid(grid, cell.x - 1, cell.y - 1)) {
      neighbours.push(grid[cell.y - 2][cell.x - 2]);
    }

    // check if we have a neighbour diagonal bottom right
    if (coordinateIsValid(grid, cell.x + 1, cell.y + 1)) {
      neighbours.push(grid[cell.y][cell.x]);
    }

    // check if we have a neighbour diagonal bottom left
    if (coordinateIsValid(grid, cell.x - 1, cell.y + 1)) {
      neighbours.push(grid[cell.y][cell.x - 2]);
    }
  }

  return neighbours;
}

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
export { calculateBFS };
