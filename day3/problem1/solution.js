import fs from 'fs';
import readline from 'readline';

function readFile() {
  const fileStream = fs.createReadStream('../input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let result = 0;

  rl.on('line', (line) => {
    const matches = line.matchAll(new RegExp(/mul\((\d{1,3}),(\d{1,3})\)/, 'g'));

    for (const match of matches) {
      const [_, a, b] = match;
      result += a * b;
    }
  })

  rl.on('close', () => {
    console.log('Result: ', result);
  })
}

readFile()
