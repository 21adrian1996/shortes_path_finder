export const isStart = (start_x, start_y, x, y) => {
  return start_x === x && start_y === y;
};
export const isEnd = (end_x, end_y, x, y) => {
  return end_x === x && end_y === y;
};
export const isWall = (walls, x, y) => {
  return walls.includes(arrayRepresentation(x,y));
};
export const arrayRepresentation = (x, y) => {
  return `x:${x.toString()}y:${y.toString()}`
};
