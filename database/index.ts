import { Kysely } from "kysely";
import { DenoSqliteDialect } from "kysely-deno-sqlite";
import { DB as Sqlite } from "sqlite";

import { type Database } from "./types.ts";
import environment from "../utility/environment.ts";

const DATABASE_URL = environment.get("DATABASE_URL");

export default new Kysely<Database>({
  dialect: new DenoSqliteDialect({
    database: new Sqlite(DATABASE_URL),
  }),
});
