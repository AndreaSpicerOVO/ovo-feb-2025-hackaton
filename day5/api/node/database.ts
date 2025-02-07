import { Database } from "./types";
import Pool from "pg-pool";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: "postgres",
    host: "postgres.orb.local",
    user: "postgres",
    password: "postgres",
    port: 5432,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
