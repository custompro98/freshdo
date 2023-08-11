import { Handlers, RouteContext } from "$fresh/server.ts";
import { PendingTodo, Todo } from "../../database/types.ts";
import TodoList from "../../islands/todo-list.tsx";

export const handler: Handlers<PendingTodo> = {
  async POST(req, ctx) {
    const { protocol, hostname, port } = new URL(req.url);
    const baseUrl = `${protocol}${hostname}:${port}`;

    const form = await req.formData();

    await fetch(`${baseUrl}/api/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
      }),
    });

    const headers = new Headers();
    headers.set("location", req.url);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default async function Todos(req: Request, _ctx: RouteContext) {
  const { protocol, hostname, port } = new URL(req.url);
  const baseUrl = `${protocol}${hostname}:${port}`;

  const resp = await fetch(`${baseUrl}/api/todos`);

  if (!resp.ok) {
    return <h1>An Error occurred</h1>;
  }

  const todos: Todo[] = await resp.json();

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
        <TodoList todos={todos} />
      </section>
    </>
  );
}
