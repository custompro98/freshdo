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
    <div className="flex flex-col w-full pt-8">
      <section>
        <form method="POST" className="flex items-center max-w-md mx-auto bg-white rounded-lg border-1">
          <input
            type="text"
            name="title"
            placeholder="call mom"
            className="w-full px-4 py-1 h-12 text-gray-800 rounded-l-lg"
          />
          <input type="submit" value="+" className="flex items-center bg-blue-500 justify-center w-20 h-12 text-white rounded-r-lg border-0" />
        </form>
      </section>
      <section className="flex max-w-md mx-auto bg-white pt-4">
        <TodoList todos={todos} />
      </section>
    </div>
    </>
  );
}
