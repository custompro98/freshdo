import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../components/header.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>FreshDo</title>
      </Head>
      <Header />
      <main className="max-w-7xl min-w-md mx-auto px-4">
        <Component />
      </main>
      <footer></footer>
    </>
  );
}
