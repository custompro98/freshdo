import { Kysely } from "kysely";
import { DenoSqliteDialect } from "kysely-deno-sqlite";
import { DB as Sqlite } from "sqlite";
import { LibsqlDialect } from "kysely-turso";

import { type Database } from "./types.ts";
import environment from "../utility/environment.ts";

const DATABASE_URL = environment.get("DATABASE_URL");

const dialect = DATABASE_URL.startsWith("libsql://")
  ? new LibsqlDialect({
      url: DATABASE_URL,
      authToken: environment.get("DATABASE_AUTH_TOKEN"),
    })
  : new DenoSqliteDialect({
      database: new Sqlite(DATABASE_URL),
    });

export default new Kysely<Database>({
  dialect,
});
