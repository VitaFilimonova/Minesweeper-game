export function createBoard(rows, columns, minesNumber) {
  const mines = [];

  const newBoard = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, colIndex) => ({
      value: 0,
      revealed: false,
      row: rowIndex,
      column: colIndex,
      flagged: false,
      exploded: false,
    })),
  );

  // Add random mines
  function randomMines(min = 0, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let mine = 0;
  while (mine < minesNumber) {
    let row = randomMines(0, rows - 1);
    let col = randomMines(0, columns - 1);

    if (newBoard[row][col].value === 0) {
      newBoard[row][col].value = "X";
      mines.push([row, col]);
      mine++;
    }
  }

  // Add numbers
  for (let rowNum = 0; rowNum < rows; rowNum++) {
    for (let colNum = 0; colNum < columns; colNum++) {
      if (newBoard[rowNum][colNum].value !== "X") {
        let neighbors = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];

        let count = 0;
        for (let [dx, dy] of neighbors) {
          let newRow = rowNum + dx;
          let newCol = colNum + dy;
          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < columns &&
            newBoard[newRow][newCol].value === "X"
          ) {
            count++;
          }
        }
        newBoard[rowNum][colNum].value = count;
      }
    }
  }

  return { newBoard, mines };
}
