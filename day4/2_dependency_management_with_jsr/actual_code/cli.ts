import inquirer from "inquirer";
import zod from "@quentinadam/zod";
const result = await inquirer.prompt([
  { type: "input", name: "name", message: "What is your name?" },
  {
    type: "list",
    name: "favourite_food",
    message: "What's your favourite?",
    choices: ["Pizza", "Pasta", "Brushetta"],
  },
]);

console.log(result);
