import { Database } from "./types.ts";
import Pool from "pg-pool";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: "ep-holy-lab-25843832-pooler.eu-central-1.aws.neon.tech/budibase",
    host: "localhost",
    user: "doingandlearning",
    password: "2svtO3aYqVLA",
    port: 5434,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
