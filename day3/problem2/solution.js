
import fs from 'fs';
import readline from 'readline';

function readFile() {
  const fileStream = fs.createReadStream('../input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let result = 0;
  let isEnabled = true;

  rl.on('line', (line) => {
    const matches = line.matchAll(new RegExp(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/, 'g'));

    for (const match of matches) {
      const [matcher, a, b] = match;
      console.log('matcher: ', matcher);

      if (matcher === "do()") {
        console.log('ENABLE ME');
        isEnabled = true;
        continue;
      } else if (matcher === "don't()") {
        console.log('inside dont');
        isEnabled = false;
        continue;
      }

      console.log('isEnabled: ', isEnabled);


      if (isEnabled) {
        // console.log('calculating: ', isEnabled);
        result += parseInt(a) * parseInt(b);
      }
    }
  })

  rl.on('close', () => {
    console.log('Result: ', result);
  })
}

readFile()
