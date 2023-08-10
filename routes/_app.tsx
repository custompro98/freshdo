import { AppProps } from "$fresh/server.ts";
import { Head, asset } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>deno-todo</title>
      </Head>
      <header className="flex flex-row space-x-4 max-w-7xl min-w-md mx-auto px-4">
        <nav >
          <a href="/">
            <img src="/logo.svg" alt="Dripping lemon" className="inline" />
          </a>
          <a
            href="/todos"
            className="text-blue-500 hover:text-blue-600 text-underline"
          >
            Todos
          </a>
        </nav>
      </header>
      <main className="max-w-7xl min-w-md mx-auto px-4">
        <Component />
      </main>
      <footer></footer>
    </>
  );
}
