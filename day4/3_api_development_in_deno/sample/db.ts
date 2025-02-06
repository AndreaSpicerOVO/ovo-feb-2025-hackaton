import { Database } from "jsr:@db/sqlite@0.12";

const db = new Database("test.db");

db.prepare(
  `
	CREATE TABLE IF NOT EXISTS users (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  name TEXT,
	  age INTEGER
	);
  `
).run();

export default db;
