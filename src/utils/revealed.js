export const revealed = (arr, x, y, newNonMinesNum) => {
  let flagsRemoved = 0;
  if (arr[x][y].revealed) return { arr, newNonMinesNum, flagsRemoved };

  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const stack = [[x, y]];

  while (stack.length) {
    const [cx, cy] = stack.pop();
    const cell = arr[cx][cy];

    if (cell.flagged) {
      cell.flagged = false;
      flagsRemoved++;
    }

    if (!cell.revealed) {
      newNonMinesNum--;
      cell.revealed = true;
    }

    if (cell.value === 0) {
      for (const [dx, dy] of neighbors) {
        const nx = cx + dx;
        const ny = cy + dy;

        if (
          nx >= 0 &&
          nx < arr.length &&
          ny >= 0 &&
          ny < arr[0].length &&
          !arr[nx][ny].revealed
        ) {
          stack.push([nx, ny]);
        }
      }
    }
  }

  return { arr, newNonMinesNum, flagsRemoved };
};
