import { readFileSync } from "fs";
const input = readFileSync("./day02input.txt", "utf-8")
  .split("\n")
  .map((report) => report.split(" ").map(Number));

//PART ONE
function isAscending(reports: number[]) {
  return reports.every(
    (level, index) => index === 0 || level > reports[index - 1]
  );
}

function isDescending(reports: number[]) {
  return reports.every(
    (level, index) => index === 0 || level < reports[index - 1]
  );
}

function checkDifference(reports: number[]) {
  return reports.every(
    (level, index) =>
      index === 0 ||
      (Math.abs(level - reports[index - 1]) >= 1 &&
        Math.abs(level - reports[index - 1]) <= 3)
  );
}

function isSafe(reports: number[]) {
  return (
    (isAscending(reports) || isDescending(reports)) && checkDifference(reports)
  );
}

const safeLevels = input.filter((reports) => isSafe(reports));
console.log(`Part one: ${safeLevels.length}`);

//PART TWO
function canBeSafeAfterRemovingOne(reports: number[]) {
  for (let i = 0; i < reports.length; i++) {
    let slicedAndDicedReport = reports.slice(0, i).concat(reports.slice(i + 1));
    if (isSafe(slicedAndDicedReport)) {
      return true;
    }
  }
  return false;
}

function truelySafe(reports: number[][]) {
  return reports.filter(
    (report) => isSafe(report) || canBeSafeAfterRemovingOne(report)
  );
}

const truelySafeLevels = truelySafe(input);
console.log(`Part two: ${truelySafeLevels.length}`);
