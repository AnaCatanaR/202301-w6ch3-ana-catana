import chalk from "chalk";
import inquirer from "inquirer";

import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

let playerName: string;
const delayTimer = 2000;

const timer = (seconds: number) =>
  new Promise((setTime) => setTimeout(setTime, seconds));

const welcome = async () => {
  const gameTitle = chalkAnimation.rainbow("Mwhahaha");

  await timer(delayTimer);

  gameTitle.stop();
  console.log(`
    Welcome to ${chalk.bgRed("WTF am I doing")} game!
  `);
};

const getAnswer = async (isCorrect: boolean) => {
  const spinner = createSpinner("Checking answer...").start();

  await timer(delayTimer);

  if (isCorrect) {
    spinner.success({ text: `That's the spirit ${playerName}.` });
  } else {
    spinner.error({ text: `You done! Bye! ${playerName}?` });
    process.exit(1);
  }
};

const getName = async () => {
  const answers = await inquirer.prompt({
    name: "playerName",
    type: "input",
    message: "Hi there spartan! What's your name",
  });

  playerName = answers.playerName;
};

const firstQuestion = async () => {
  const answers = await inquirer.prompt({
    name: "firstQuestion",
    type: "list",
    message: "Would you go to war with your colleagues?",
    choices: ["bring it on", "no fking way, I'm outta here"],
  });

  return getAnswer(answers.firstQuestion === "bring it on");
};

const secondQuestion = async () => {
  const answers = await inquirer.prompt({
    name: "secondQuestion",
    type: "list",
    message: "Challensito is my favourite word.",
    choices: [
      "you kidding loco?",
      "survival mode on",
      "wait for me, I have short legs",
    ],
  });
  return getAnswer(answers.secondQuestion === "wait for me, I have short legs");
};

const thirdQuestion = async () => {
  const answers = await inquirer.prompt({
    name: "thirdQuestion",
    type: "list",
    message: "Did you ckecked 8.000.000 times DevTools?",
    choices: ["of course, even when I sleep", "in process"],
  });

  return getAnswer(answers.thirdQuestion === "of course, even when I sleep");
};

console.clear();
await welcome();
await getName();
await firstQuestion();
await secondQuestion();
await thirdQuestion();
