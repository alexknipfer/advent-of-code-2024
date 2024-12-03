
import { open } from 'node:fs/promises';

function getSimilarityScore(leftList, rightList) {
  let similarityScore = 0

  for (let x = 0; x < leftList.length; x++) {
    let numberOfOccurances = 0;

    for (let y = 0; y < rightList.length; y++) {
      if (leftList[x] === rightList[y]) {
        numberOfOccurances++;
      }
    }

    similarityScore += numberOfOccurances * leftList[x];
  }

  return similarityScore;
}

async function readFile() {
  const leftList = [];
  const rightList = [];
  const file = await open('../input.txt')

  for await (const line of file.readLines()) {
    const [leftItem, rightItem] = line.split('   ')
    leftList.push(Number(leftItem));
    rightList.push(Number(rightItem));
  }

  return getSimilarityScore(leftList, rightList);
}

readFile().then(result => console.log(result));
