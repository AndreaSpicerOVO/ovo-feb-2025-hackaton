import inquirer from "npm:inquirer@12.4.1";

const result = await inquirer.prompt([
  { type: "input", name: "name", message: "What is your name?" },
  {
    type: "list",
    name: "likes",
    message: "If you had to pick, which is your favourite?",
    choices: ["NI", "Wales", "Scotland", "England", "Elsewhere"],
  },
]);

console.log(result);
