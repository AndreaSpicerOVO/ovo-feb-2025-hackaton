### **Objective 1: Understand Project Initialization with Deno (`deno init`)**

#### **Notes**
- **`deno init`**:
  - Initializes a new Deno project by creating a `deno.json` file.
  - Simplifies project setup by providing a centralized configuration for imports, tasks, and permissions.
- **Why It Matters**:
  - Centralizes project settings, making it easier to manage dependencies and development workflows.

#### **Example**
1. Initialize a new project:
   ```bash
   mkdir my-deno-project && cd my-deno-project
   deno init
   ```
   Output:
   ```json
   {
     "tasks": {
       "start": "deno run main.ts"
     },
		 "imports": {
   		 "@std/assert": "jsr:@std/assert@1"
  	}
   }
   ```

2. Add a simple `main.ts`:
   ```typescript
   console.log("Hello, Deno!");
   ```

3. Run the `start` task:
   ```bash
   deno task start
   ```
   Output:
   ```
   Hello, Deno!
   ```

---

### **Objective 2: Configure Imports and Tasks in `deno.json`**

#### **Notes**
- **Imports**:
  - Shorten and manage dependencies using an `importMap`.
  - Use version pinning to ensure stability.
- **Tasks**:
  - Define reusable scripts to simplify common commands.
  - Tasks replace manual CLI commands with declarative names.

#### **Example**
1. **Adding Imports**:
   - Edit `deno.json`:
     ```json
     {
       "importMap": "./import_map.json"
     }
     ```
   - Create `import_map.json`:
     ```json
     {
       "imports": {
         "@std/http": "https://deno.land/std@0.119.0/http/mod.ts"
       }
     }
     ```
   - Use the import in `main.ts`:
     ```typescript
     import { serve } from "@std/http";
     
     serve(() => new Response("Hello, Deno!"), { port: 8080 });
     ```

2. **Adding Tasks**:
   - Add a `start` task to `deno.json`:
     ```json
     {
       "tasks": {
         "start": "deno run --allow-net main.ts"
       }
     }
     ```
   - Run the task:
     ```bash
     deno task start
     ```

---

### **Objective 3: Explore Import Sources Across Ecosystems**

#### **Notes**
- **Standard Library**:
  - Deno’s built-in library (`@std`) provides essential utilities.
- **Third-Party Modules**:
  - Managed via the JSR registry, e.g., `deno add lodash`.
- **Node.js Compatibility**:
  - Access Node.js core modules with `@node` imports (e.g., `@node/fs`).

#### **Examples**
1. **Using Standard Library**:
   ```bash
   deno add @std/http
   ```
   ```typescript
   import { serve } from "@std/http";
   serve(() => new Response("Hello!"), { port: 8000 });
   ```

2. **Using Third-Party Module**:
   ```bash
   deno add lodash
   ```
   ```typescript
   import _ from "lodash";
   console.log(_.chunk([1, 2, 3, 4], 2)); // [[1, 2], [3, 4]]
   ```

3. **Using Node.js Modules**:
   ```bash
   deno add @node/fs
   ```
   ```typescript
   import * as fs from "@node/fs";
   fs.writeFileSync("test.txt", "Hello from Deno!");
   console.log(fs.readFileSync("test.txt", "utf-8"));
   ```

---

### **Objective 4: Generate and Use Lock Files for Deterministic Builds**

#### **Notes**
- **Purpose**:
  - Lock files ensure consistent dependency versions across environments.
  - Protects against unexpected changes when dependencies update.
- **How It Works**:
  - Deno generates a `deno.lock` file when you run `deno cache` with the `--lock` flag.
  - During subsequent runs, only the versions in the lock file are used.

#### **Example**
1. **Generate a Lock File**:
   ```bash
   deno cache --lock=deno.lock main.ts
   ```

2. **Using the Lock File**:
   - Ensure all dependencies match the lock file:
     ```bash
     deno cache --lock=deno.lock --lock-write main.ts
     ```

3. **Modify a Dependency**:
   - Update the version in `import_map.json`:
     ```json
     {
       "imports": {
         "@std/http": "https://deno.land/std@0.120.0/http/mod.ts"
       }
     }
     ```
   - Update the lock file:
     ```bash
     deno cache --lock=deno.lock --lock-write main.ts
     ```

---

### **Objective 5: Publish a Simple Package to the Deno Registry**

#### **Notes**
- **Why Publish?**:
  - Share reusable utilities with the community.
- **Process**:
  - Package your code and metadata in `deno.json`.
  - Use `deno publish` to upload to the JSR registry.

#### **Example**
1. **Prepare Your Package**:
   - Create a `math-utils.ts`:
     ```typescript
     export function add(a: number, b: number): number {
       return a + b;
     }
     ```

   - Create `deno.json`:
     ```json
     {
       "name": "math-utils",
       "version": "1.0.0",
       "description": "A utility library for math operations",
       "main": "math-utils.ts",
       "license": "MIT"
     }
     ```

2. **Publish**:
   ```bash
   deno publish
   ```

3. **Use Your Package**:
   ```bash
   deno add math-utils
   ```
   ```typescript
   import { add } from "math-utils";
   console.log(add(3, 4)); // 7
   ```

---

### **How These Objectives Connect**
1. **Objective 1** sets the stage for managing Deno projects.
2. **Objective 2** demonstrates real-world use of `deno.json`.
3. **Objective 3** broadens understanding of available dependency sources.
4. **Objective 4** ensures consistent builds and dependency stability.
5. **Objective 5** encourages learners to contribute to the ecosystem.

This progression ensures learners gain practical knowledge while understanding Deno's unique approach to dependency management.

### **Why This Behavior is Good/Bad**

Deno’s ability to fetch and cache modules on-the-fly without requiring a separate installation step (like `deno add`) has both **advantages** and **disadvantages**. Let’s break it down:

---

### **Why This is Good**

#### **1. Simplifies Development Workflow**
- You can directly start using a module with a single `import` statement:
  ```typescript
  import _ from "jsr:@tlevi/lodash";
  console.log(_.chunk([1, 2, 3, 4], 2));
  ```
- No need to run a separate command (`deno add` or `npm install`), reducing friction during development.

#### **2. Automatic Caching**
- Deno automatically downloads and caches the module in its global cache (`$HOME/.deno`).
- Subsequent executions don’t require redownloading unless the version changes.

#### **3. Immediate Lock File Creation**
- When a module is fetched, Deno records it in a `deno.lock` file:
  ```json
  {
    "version": "2",
    "remote": {
      "https://jsr.deno.dev/@tlevi/lodash@latest/mod.ts": "sha256-abcdef..."
    }
  }
  ```
- This ensures deterministic builds by locking dependencies to specific versions and URLs.

#### **4. Encourages Explicit Versioning**
- Unlike `npm install`, which defaults to `latest`, `import` forces you to specify the exact module version or rely on `latest` explicitly:
  ```typescript
  import _ from "jsr:@tlevi/lodash@4.17.21";
  ```

#### **5. Avoids Dependency Bloat**
- Deno doesn’t generate a `node_modules` directory.
- The global cache ensures deduplication, reducing redundant downloads across projects.

---

### **Why This is Bad**

#### **1. Risk of Missing Context**
- Without running `deno add`, there’s no `imports` map in `deno.json`:
  ```json
  {
    "imports": {
      "lodash": "jsr:@tlevi/lodash@4.17.21"
    }
  }
  ```
- This can make the project harder to understand for collaborators who might not know where dependencies come from.

#### **2. Harder to Manage Dependencies**
- When dependencies are scattered across `import` statements in code:
  ```typescript
  import _ from "jsr:@tlevi/lodash";
  import { serve } from "jsr:@std/http";
  ```
  - It’s less obvious which external modules are in use and at what versions.
  - This makes updating or auditing dependencies more difficult.

#### **3. Potential for Breaking Changes**
- If `latest` is used:
  ```typescript
  import _ from "jsr:@tlevi/lodash";
  ```
  - The next time you or a collaborator runs the code, it could fetch an updated (and possibly breaking) version.
  - Lock files mitigate this but require proper understanding and maintenance.

#### **4. No Explicit Version Pinning**
- Developers might forget to pin versions, leading to unpredictable builds:
  ```typescript
  import _ from "jsr:@tlevi/lodash";
  ```
- With `deno add`, pinning versions becomes more explicit and encouraged.

#### **5. Lack of Declarative Metadata**
- Tools like `deno task` rely on `deno.json` for clarity and maintainability.
- Without `deno add`, the configuration remains incomplete, reducing the benefits of a centralized metadata file.

---

### **Best Practices to Balance the Pros and Cons**

1. **Use `deno add` for Project Consistency**
   - Explicitly add imports to `deno.json`:
     ```bash
     deno add lodash
     ```
     - This generates:
       ```json
       {
         "imports": {
           "lodash": "jsr:@tlevi/lodash@4.17.21"
         }
       }
       ```

2. **Avoid Using `latest`**
   - Always specify the version:
     ```typescript
     import _ from "jsr:@tlevi/lodash@4.17.21";
     ```

3. **Commit `deno.lock` to Version Control**
   - Ensure your `deno.lock` file is part of the repository to lock dependencies to specific versions.


4. **Educate Collaborators**:
   - Ensure that everyone understands Deno’s caching and lock file behavior.

---

### **Summary**

- **Good**: Simplifies development by allowing instant imports, creates lock files automatically, and avoids dependency bloat.
- **Bad**: Can lead to missing metadata in `deno.json`, harder dependency management, and risks from unpinned versions.

For team projects or production environments, **prefer `deno add` for clarity and maintainability**. For quick prototyping or experimentation, on-the-fly imports can be convenient.