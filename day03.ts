import { readFileSync } from "fs";
const input = readFileSync("./day03input.txt", "utf-8");

//PART ONE
const stupidRegExPattern = /mul\(\d+,\d+\)/g;
const validInstructions = input.match(stupidRegExPattern);

function multiplyNumbers(instructions: string[]): number[] {
  return instructions.map((instruction) => {
    // Get index of what's within the parentheses
    const start = instruction.indexOf("(") + 1;
    const end = instruction.indexOf(")");

    // Grab the numbers and split them by the comma
    const numbers = instruction.slice(start, end).split(",").map(Number);

    // Multiply the numbers
    return numbers[0] * numbers[1];
  });
}

if (validInstructions) {
  const multiplications = multiplyNumbers(validInstructions);
  console.log(
    `Part one: ${multiplications.reduce((sum, value) => sum + value, 0)}`
  );
} else {
  console.log(
    "Wat fijn dat mijn janky AoC-code goed getype-checked en conditional handled is, hoera"
  );
}

//PART TWO
const dumbRegExThing = /do\(\)|don't\(\)/g;

function splitIntoDosAndDonts(input: string) {
  let match;
  let lastIndex = 0;
  const result = [];

  //Split the input and put the do() or don't() at the beginning of next section
  while ((match = dumbRegExThing.exec(input)) !== null) {
    if (lastIndex !== match.index) {
      result.push(input.slice(lastIndex, match.index));
    }
    lastIndex = match.index;
  }

  // Add the remaining part of the string
  if (lastIndex < input.length) {
    result.push(input.slice(lastIndex));
  }

  return result;
}

const dosAndDonts = splitIntoDosAndDonts(input);
const justTheDos = dosAndDonts.filter(
  (instruction) => !instruction.startsWith("don't()")
);

const mushTogetherAndFindTheMultiplications = justTheDos
  .join("")
  .match(stupidRegExPattern);

if (mushTogetherAndFindTheMultiplications) {
  const DoMultiplications = multiplyNumbers(
    mushTogetherAndFindTheMultiplications
  );
  console.log(
    `Part two: ${DoMultiplications.reduce((sum, value) => sum + value)}`
  );
} else {
  console.log("Leuke he, TypeScript? Dit was heus de moeite waard en zo.");
}
