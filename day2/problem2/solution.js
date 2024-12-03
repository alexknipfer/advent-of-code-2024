import fs from 'fs';
import readline from 'readline';

function processReportSafe(originalList) {
  return function isReportSafe(list, currentIndex = 0) {
    let isSafe = true;
    const [first, second] = list;
    const isIncreasing = first < second;

    for (let x = 0; x < list.length - 1; x++) {
      const next = list[x + 1];

      if (!isIncreasing && next > list[x] || isIncreasing && next < list[x]) {
        isSafe = false;
      }

      if (Math.abs(next - list[x]) === 0 || Math.abs(next - list[x]) > 3) {
        isSafe = false;
      }
    }

    if (currentIndex === originalList.length) {
      return isSafe;
    }

    if (isSafe === false) {
      return isReportSafe(
        [...originalList.slice(0, currentIndex), ...originalList.slice(currentIndex + 1)],
        currentIndex + 1
      );
    }

    return isSafe;
  }
}

function readFile() {
  const fileStream = fs.createReadStream('../input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let totalSafeReports = 0;

  rl.on('line', (line) => {
    const list = line.split(' ').map(Number);
    const isReportSafe = processReportSafe(list);
    totalSafeReports += isReportSafe(list) ? 1 : 0;
  })

  rl.on('close', () => {
    console.log('Total safe reports: ', totalSafeReports);
  })
}

readFile()
