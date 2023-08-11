import { Handlers } from "$fresh/server.ts";
import database from "../../../database/index.ts";
import { Todo } from "../../../database/types.ts";
import isPresent from "../../../utility/is-present.ts";

export const handler: Handlers<Todo[]> = {
  async GET(_req, ctx) {
    const parsedId = parseInt(ctx.params.id, 10);
    if (ctx.params.id !== `${parsedId}`) {
      return new Response(null, {
        status: 400,
      });
    }

    const todo = await database
      .selectFrom("todos")
      .selectAll()
      .where("id", "=", parsedId)
      .limit(1)
      .executeTakeFirst();

    return new Response(JSON.stringify(todo));
  },
  async PUT(_req, ctx) {
    const parsedId = parseInt(ctx.params.id, 10);

    if (`${parsedId}` !== ctx.params.id) {
      return new Response(null, {
        status: 400,
      });
    }

    const existingTodo = await database
      .selectFrom("todos")
      .selectAll()
      .where("id", "=", parsedId)
      .executeTakeFirst();

    if (!isPresent(existingTodo)) {
      return new Response(null, {
        status: 404,
      });
    }

    const updatedTodo = await database
      .updateTable("todos")
      .set({
        ...existingTodo,
        updated_at: new Date().toISOString(),
        completed: !existingTodo.completed,
      })
      .where("id", "=", parsedId)
      .returningAll()
      .executeTakeFirst();

    return new Response(JSON.stringify(updatedTodo), {
      status: 200,
    });
  },
};
