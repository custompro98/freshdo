import { Handlers, PageProps } from "$fresh/server.ts";
import TodoList from "../../components/todo-list.tsx";
import database from "../../database/index.ts";
import { Todo } from "../../database/types.ts";
import { Selectable } from "kysely";
import isPresent from "../../utility/is-present.ts";

type SelectableTodo = Selectable<Todo>;

export const handler: Handlers<SelectableTodo[]> = {
  async GET(_req, ctx) {
    const queryBuilder = database
      .selectFrom("todos")
      .selectAll()
      .orderBy("created_at", "desc");

    const todos = await queryBuilder.execute();

    return ctx.render(todos);
  },
  async POST(req, _ctx) {
    const headers = new Headers({
      location: req.url,
    });

    const form = await req.formData();

    if (form.get("id")) {
      const parsedId = parseInt(form.get("id")?.toString() || "", 10);

      if (`${parsedId}` !== form.get("id")) {
        return new Response(null, {
          status: 400,
          headers,
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
          headers,
        });
      }

      await database
        .updateTable("todos")
        .set({
          ...existingTodo,
          updated_at: new Date().toISOString(),
          completed: !existingTodo.completed,
        })
        .where("id", "=", parsedId)
        .execute();

      return new Response(null, {
        status: 302,
        headers,
      });
    } else {
      await database
        .insertInto("todos")
        .values({
          title: form.get("title")?.toString() || "(untitled)",
        })
        .execute();

      return new Response(null, {
        status: 302,
        headers,
      });
    }
  },
};

export default function Todos(props: PageProps<SelectableTodo[]>) {
  return (
    <>
      <h1 className="text-3xl font-bold pb-8">Todos</h1>
      <section className="pb-4">
        <form method="POST">
          <input
            type="text"
            name="title"
            className="border-2 border-gray-300"
          />
          <input type="submit" />
        </form>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <span className={todo.completed ? "text-line-through" : ""}>
                    {todo.title}
                  </span>
                </td>
                <td>
                  <form method="POST">
                    <input type="hidden" name="id" value={todo.id} />
                    <input
                      type="submit"
                      value={
                        todo.completed ? "Mark incomplete" : "Mark complete"
                      }
                    />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
