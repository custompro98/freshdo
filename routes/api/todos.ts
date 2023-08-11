import { Handlers } from "$fresh/server.ts";
import database from "../../database/index.ts";
import { PendingTodo, Todo } from "../../database/types.ts";

export const handler: Handlers<Todo[]> = {
  async GET(_req, _ctx) {
    const queryBuilder = database
      .selectFrom("todos")
      .selectAll()
      .orderBy("created_at", "desc");

    const todos = await queryBuilder.execute();

    return new Response(JSON.stringify(todos));
  },
  async POST(req, _ctx) {
    const body: PendingTodo = await req.json();

    const todo = await database
      .insertInto("todos")
      .values({
        title: body.title || "(untitled)",
      })
      .returningAll()
      .executeTakeFirst();

    return new Response(JSON.stringify(todo), {
      status: 201,
    });
  },
};
