# Day 5: Hackathon

## Workshop Overview

This hackathon-style workshop serves as a capstone to our week of learning Node.js, Deno, and TypeScript. Students will apply their knowledge by building a cross-platform developer tool that works in both Node.js and Deno environments.

## Project Prompt: Build a Cross-Platform Developer Tool

Create a CLI tool in TypeScript that runs in both Node and Deno environments!

-- or --

Create an API in TypeScript that runs in either Node or Deno!

### Example Project Ideas

1. Markdown Processor
* Convert markdown files to different formats (HTML, PDF)
* Support customizable themes and styling
* Handle image processing and link validation


2. Git Repository Analyzer
* Analyze commit patterns and frequency
* Generate contributor statistics
* Create visualizations of repository activity


3. Project Scaffolding Tool
* Generate boilerplate code for web applications
* Support multiple framework templates
* Configure project dependencies

4. Or, whatever creative idea you come up with!
* Commit Message Translator: Convert standard commit messages into entertaining stories.
* Meme Generator: Generate memes from templates using the command line
* UI Integration: If you would prefer to create a UI, go for it!

---
And some ideas if you decide to go down the API route ... 

## **1️⃣ Code Snippet Manager API**
**Description:** A REST API for saving, retrieving, and sharing code snippets.  
**Key Features:**
- POST `/snippets` → Save a new snippet.
- GET `/snippets/:id` → Retrieve a snippet.
- GET `/snippets?tag=javascript` → Filter by language or tags.
- Optional: Authentication, version history, syntax highlighting.  
**Bonus:** Integrate with GitHub Gists or store in SQLite.

---

## **2️⃣ AI-Powered API: Commit Message Generator**
**Description:** Use AI or basic logic to generate commit messages based on diffs.  
**Key Features:**
- POST `/generate` → Accepts a list of changed files and generates a commit message.
- Optional: Use OpenAI/GPT or a simple rule-based system.
- GET `/templates` → Return a list of pre-defined commit message templates.  
**Bonus:** Provide different commit styles (e.g., conventional commits, funny commits, verbose commits).

---

## **3️⃣ Developer Productivity API**
**Description:** A REST API that provides insights into daily coding activity.  
**Key Features:**
- GET `/summary?date=YYYY-MM-DD` → Get total coding time, number of commits, and most active project.
- POST `/activity` → Log an event like “Started coding on project X”.
- GET `/leaderboard` → Show most active developers based on usage data.  
**Bonus:** Connect with GitHub or track VS Code/Deno/Node runtime logs.

---

## **4️⃣ File Conversion API**
**Description:** Convert different file formats (text, markdown, images, etc.) via an API.  
**Key Features:**
- POST `/convert` → Accepts a file and converts it to another format (e.g., `.md` → `.html`).
- GET `/formats` → Lists supported conversions.
- Optional: Allow batch conversions, watermarking, or compression.  
**Bonus:** Use Deno’s native file system APIs for performance.

---

## **5️⃣ OpenAPI Generator**
**Description:** Generate OpenAPI specifications from a simple schema.  
**Key Features:**
- POST `/generate` → Accepts a JSON schema and returns an OpenAPI spec.
- GET `/docs/:id` → Returns Swagger UI docs for an API.
- Optional: Convert OpenAPI → Postman collections.  
**Bonus:** Auto-generate TypeScript interfaces for API consumers.

 
## Schedule

* 10:00 - 10:15: Kickoff!
* 10:15 - 10:45: Project Planning
* 10:45 - 12:30: Development Session 1
    * Start building!
* 12:30 - 1:30: Lunch Break
* 1:30 - 2:00: Final Development & Demo Prep
* 2:00 - 3:00: Project Demonstrations
    * 5-7 minutes per team/individual
    * What did you build
    * How did it go?
    * Brief Q&A