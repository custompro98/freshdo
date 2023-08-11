export default function Home() {
  return (
    <>
      <div className="flex flex-col m-auto items-center">
        <img src="/deno.svg" alt="dinosaur" className="h-[128px] lg:h-[512px]" />
        <a
          href="/todos"
          className="text-blue-500 hover:text-blue-600 text-underline"
        >
          squeeze something in
        </a>
      </div>
    </>
  );
}
