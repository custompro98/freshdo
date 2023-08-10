export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold">Todos</h1>
      <p>
        Welcome to the Deno Todo application,{" "}
        <a
          href="/todos"
          className="text-blue-500 hover:text-blue-600 text-underline"
        >
          get to it
        </a>
        .
      </p>
    </>
  );
}
