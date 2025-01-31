import inquirer from "inquirer";
import { readFileSync, existsSync } from "node:fs";
import { unlink, symlink } from "node:fs/promises";
import { spawn } from "child_process";
import path from "path";

// Read and parse the presentations.json file
const presentations = JSON.parse(readFileSync("presentations.json", "utf-8"));

// Create an interface for the presentations object
interface Presentations {
  [key: string]: string;
}

// Function to create symlink to the target index.html
async function createSymlink(targetPath: string): Promise<void> {
  const targetIndex = path.join(__dirname, targetPath, "index.html");
  const localIndex = path.join(__dirname, "index.html");
  console.log(targetIndex, localIndex);
  // Remove existing symlink if it exists
  console.log("Removing existing symlink if exists...");
  await unlink(localIndex).catch((error) => {
    if (error.code !== "ENOENT") {
      return;
    }
    console.error(error);
  });

  // Create new symlink
  await symlink(targetIndex, localIndex);
}

// Function to display the scrollable list and capture user input
async function selectPresentation(
  presentations: Presentations
): Promise<string> {
  const choices = Object.keys(presentations);

  const { selection } = await inquirer.prompt([
    {
      type: "list",
      name: "selection",
      message: "Select a presentation:",
      choices: choices,
      pageSize: 6,
    },
  ]);

  return presentations[selection];
}

// Function to run gulp serve
function runGulpServe() {
  const gulpPath = path.join(__dirname, "node_modules", ".bin", "gulp");
  const gulp = spawn(gulpPath, ["serve"], {
    stdio: "inherit",
    shell: true,
  });

  gulp.on("error", (error) => {
    console.error("Failed to start gulp:", error);
  });

  // Clean up symlink on process exit
  process.on("SIGINT", async () => {
    const localIndex = path.join(__dirname, "index.html");
    if (existsSync(localIndex)) {
      await unlink(localIndex);
    }
    process.exit();
  });
}

// Main execution
selectPresentation(presentations).then(async (selectedPath) => {
  console.log(`Creating symlink for: ${selectedPath}`);
  try {
    await createSymlink(selectedPath);
    console.log("Starting server...");
    runGulpServe();
  } catch (error) {
    console.error("Failed to create symlink:", error);
    process.exit(1);
  }
});
