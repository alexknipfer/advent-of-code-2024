import fs from 'fs';
import readline from 'readline';

function isSafe(list, direction) {
  let isSafe = true;

  for (let x = 0; x < list.length - 1; x++) {
    const next = list[x + 1];

    if (direction === 'decreasing' && next > list[x] || direction === 'increasing' && next < list[x]) {
      isSafe = false;
      break;
    }

    if (Math.abs(next - list[x]) === 0 || Math.abs(next - list[x]) > 3) {
      isSafe = false;
      break;
    }
  }

  return isSafe;
}

function readFile() {
  const fileStream = fs.createReadStream('./input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let totalSafeReports = 0;

  rl.on('line', (line) => {
    const list = line.split(' ').map(Number);
    const [first, second] = list;

    if (first > second) {
      totalSafeReports += isSafe(list, 'decreasing') ? 1 : 0;
    } else {
      totalSafeReports += isSafe(list, 'increasing') ? 1 : 0;
    }
  })

  rl.on('close', () => {
    console.log('Total safe reports: ', totalSafeReports);
  })
}

readFile()
