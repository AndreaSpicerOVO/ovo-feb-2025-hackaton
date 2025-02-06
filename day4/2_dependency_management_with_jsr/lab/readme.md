### **🛠️ Lab: Managing Dependencies in Deno**
#### **Prerequisites**
- Install Deno (`deno --version` should work)
- Familiarity with Node.js and TypeScript
- A code editor (VS Code recommended)

---

## **📝 Task 1: Initialize a Deno Project**
1. Create a new directory and initialize a project:
   ```bash
   deno init
   ```
   - Observe that `deno.json` is created along with a `main.ts` and `main_test.ts`.
   - Edit `deno.json` to include a `start` task:
     ```json
     {
       "tasks": {
         "start": "deno run main.ts"
       }
     }
     ```

2. Update `main.ts` to say 'Hello, Deno!' in the main block:
   ```typescript
   console.log("Hello, Deno!");
   ```
3. Run the project:
   ```bash
   deno task start
   ```

---

## **📂 Task 2: Work with the File System in Deno**

### **📝 Step 1: Write and Read a File**
1. **Create a file `file-utils.ts`**:
   ```typescript
   const filePath = "./data.txt";

   // Write to a file
   await Deno.writeTextFile(filePath, "Hello, Deno!");

   console.log("File written successfully.");

   // Read the file
   const content = await Deno.readTextFile(filePath);
   console.log("File content:", content);
   ```
2. **Run the script**:
   ```bash
   deno run --allow-read --allow-write file-utils.ts
   ```
   **Expected Output:**
   ```
   File written successfully.
   File content: Hello, Deno!
   ```

---

### **🛠️ Step 2: Use the `@std/fs` Library**
Deno's `@std/fs` module provides utilities for file and path management.

1. **Install `@std/fs`**:
   ```bash
   deno add @std/fs
   ```
2. **Modify `file-utils.ts` to ensure a directory exists before writing a file**:
   ```typescript
   import { ensureDir } from "jsr:@std/fs";

   const dir = "./logs";
   const file = "./logs/log.txt";

   // Ensure directory exists
   await ensureDir(dir);

   // Append a log entry
   await Deno.writeTextFile(file, "Log entry at " + new Date().toISOString() + "\n", { append: true });

   console.log("Log updated:", file);
   ```
3. **Run the script**:
   ```bash
   deno run --allow-read --allow-write file-utils.ts
   ```
   **Expected Output:**
   ```
   Log updated: logs/log.txt
   ```

---

### **👀 Step 3: Watch for File Changes**
Deno allows you to watch files and directories for changes.

1. **Create `watch.ts`**:
   ```typescript
   const watcher = Deno.watchFs("./logs");

   console.log("Watching for file changes in ./logs...");

   for await (const event of watcher) {
     console.log("File system change detected:", event);
   }
   ```
2. **Run the watcher in one terminal**:
   ```bash
   deno run --allow-read --allow-write --allow-run watch.ts
   ```
3. **Modify the log file in another terminal**:
   ```bash
   echo "New log entry" >> logs/log.txt
   ```
4. **Observe the output**:
   ```
   Watching for file changes in ./logs...
   File system change detected: { kind: "modify", paths: [ "logs/log.txt" ] }
   ```

---

## **📦 Task 3: Using Third-Party Module**

1. ****
   - Install `lodash`:
     ```bash
     deno add npm:lodash
     ```
   - Use it in `server.ts`:
     ```typescript
     import _ from "lodash";

     console.log(_.chunk([1, 2, 3, 4], 2));
     ```
   - Run:
     ```bash
     deno run server.ts
     ```

---

## **🚀 Task 4: Publish and Use a Simple Module**

Yes! Let’s **package and publish** the **file system utilities** we developed earlier as a **reusable Deno module**.

---

## **🚀 Task 4: Publish a Reusable File System Utility**
We'll take our previous file system functions, wrap them in a module, and publish them to **JSR (JavaScript Registry for Deno).**

---

### **🛠️ Step 1: Create the File System Utility Module**
Inside your project folder (`deno-deps-lab`):

1. **Create a new directory and module file:**
   ```bash
   mkdir file-utils && cd file-utils
   touch mod.ts
   ```

2. **Edit `mod.ts` to include file operations:**
   ```typescript
   import { ensureDir } from "jsr:@std/fs";

   /** Ensures a directory exists */
   export async function createDirectory(path: string): Promise<void> {
     await ensureDir(path);
   }

   /** Writes text to a file */
   export async function writeFile(path: string, content: string): Promise<void> {
     await Deno.writeTextFile(path, content);
   }

   /** Reads text from a file */
   export async function readFile(path: string): Promise<string> {
     return await Deno.readTextFile(path);
   }

   /** Watches a directory for changes */
   export async function watchDirectory(path: string): Promise<void> {
     const watcher = Deno.watchFs(path);
     console.log(`Watching ${path} for changes...`);

     for await (const event of watcher) {
       console.log("File system change detected:", event);
     }
   }
   ```

---

### **📦 Step 2: Configure the Package (`deno.json`)**
Navigate to your project root and edit `deno.json`:

```json
{
  "name": "@yourusername/file-utils",
  "version": "1.0.0",
  "description": "Simple file system utilities for Deno",
  "entry": "./file-utils/mod.ts",
  "license": "MIT",
	"exports": {
    "./mod.ts": "./file-utils/mod.ts"
  }
}
```

---

### **📝 Step 3: Test the Module Locally**
Before publishing, ensure it works.

1. **Go back to the project root** and create a `test.ts` file:
   ```typescript
   import { createDirectory, writeFile, readFile, watchDirectory } from "./file-utils/mod.ts";

   await createDirectory("./logs");
   await writeFile("./logs/example.txt", "Hello, Deno!");
   console.log(await readFile("./logs/example.txt"));

   // Uncomment to watch for changes
   // await watchDirectory("./logs");
   ```

2. **Run the test:**
   ```bash
   deno run --allow-read --allow-write --allow-run test.ts
   ```
   **Expected Output:**
   ```
   Hello, Deno!
   ```

---

### **🚀 Step 4: Publish the Package**
1. **Initialise a new Git repo in the start directory and add everything to it**
```bash
git init
git add .
git commit -m "Adds working files"
```

2. **Publish the package:**
   ```bash
   deno publish
   ```
   **If successful, your package will be available at**  
   ```
   https://jsr.io/@your-username/file-utils
   ```

---

### **📥 Step 5: Install and Use the Published Package**
Now that it’s public, let’s install and use it in another project.

1. **In a new directory, install the package:**
   ```bash
   deno add jsr:@yourusername/file-utils
   ```

2. **Create a new `test.ts` file in a separate project:**
   ```typescript
   import { createDirectory, writeFile, readFile } from "jsr:@your-username/file-utils";

   await createDirectory("./logs");
   await writeFile("./logs/example.txt", "Hello from published module!");
   console.log(await readFile("./logs/example.txt"));
   ```

3. **Run it:**
   ```bash
   deno run --allow-read --allow-write test.ts
   ```
   **Expected Output:**
   ```
   Hello from published module!
   ```

## Extension

See if you can get the score for your published package up to 100%.