import fs from 'fs';
import readline from 'readline';

const defaultDirections = [
  [-1, 1], [0, 1], [1, 1],
  [-1, 0], [1, 0],
  [-1, -1], [0, -1], [1, -1]
];

function dfs(matrix, row, column, word, index, directions = defaultDirections) {
  if (index === word.length) {
    return true;
  }

  if (row < 0 || row >= matrix.length || column < 0 || column >= matrix[row].length || matrix[row][column] !== word[index]) {
    return false;
  }

  let count = 0;
  for (const [dx, dy] of directions) {
    if (dfs(matrix, row + dx, column + dy, word, index + 1, [[dx, dy]])) {
      count++;
    }
  }

  return count;
}

function findWord(word, matrix) {
  let count = 0;

  for (let x = 0; x < matrix.length; x++) {
    for (let i = 0; i < matrix[x].length; i++) {
      if (word[0] === matrix[x][i]) {
        count += dfs(matrix, x, i, word, 0);
      }
    }
  }

  return count;
}

function readFile() {
  const fileStream = fs.createReadStream('../input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let matrix = [];

  rl.on('line', (line) => {
    matrix.push(line.split(''));
  })

  rl.on('close', () => {
    console.log('Result: ', findWord('XMAS', matrix));
  })
}

readFile()
