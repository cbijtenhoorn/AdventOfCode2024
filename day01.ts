import { readFileSync } from "fs";
const input = readFileSync("./day01input.txt", "utf-8").split("\n");

//PART ONE
const leftList = input
  .map((id) => Number(id.split("   ")[0]))
  .sort((a, b) => a - b);
const rightList = input
  .map((id) => Number(id.split("   ")[1]))
  .sort((a, b) => a - b);

const differences = leftList.map((leftValue, index) =>
  Math.abs(leftValue - rightList[index])
);

const totalDifference = differences.reduce((sum, value) => sum + value, 0);
console.log(`Part one: ${totalDifference}`);

//PART TWO
const scores = leftList.map((value) => {
  const count = rightList.filter((rightValue) => rightValue === value).length;
  return count * value;
});

const similarityScore = scores.reduce((sum, value) => sum + value, 0);
console.log(`Part two: ${similarityScore}`);
