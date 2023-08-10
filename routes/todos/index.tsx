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

export default function Home(props: PageProps<SelectableTodo[]>) {
  return (
    <>
      <h1 className="text-3xl font-bold">Todos</h1>
      <form method="POST">
        <input type="text" name="title" />
        <input type="submit" />
      </form>
      <table>
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
                    value={todo.completed ? "Mark incomplete" : "Mark complete"}
                  />
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
