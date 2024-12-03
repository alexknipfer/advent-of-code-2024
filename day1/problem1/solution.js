import { open } from 'node:fs/promises';

function getTotalDistances(list1, list2) {
  let distance = 0;

  for (let x = 0; x < list1.length; x++) {
    distance += Math.abs(Number(list1[x]) - Number(list2[x]));
  }

  return distance;
}

async function readFile() {
  const leftList = [];
  const rightList = [];
  let totalDistance = 0;
  const file = await open('../input.txt')

  for await (const line of file.readLines()) {
    const [leftItem, rightItem] = line.split('   ')
    leftList.push(Number(leftItem));
    rightList.push(Number(rightItem));
  }

  totalDistance += getTotalDistances(leftList.sort(), rightList.sort());

  return totalDistance;
}

readFile().then(result => console.log(result));
