import {states} from "@/algorithms/constants";

async function printShortestPath(end, speed) {
  if(!end.parent) {
    return false;
  }

  let path = [];
  let parent = end;

  while (parent) {
    path.push(parent);
    parent = parent.parent;
  }

  path.reverse();

  path.forEach((cell, index) => {
    setTimeout(function () {
      cell.state = states.shortest;
    }, 5 * (101 - speed) * (index + 1));
  });
  return true;
}
export { printShortestPath };
