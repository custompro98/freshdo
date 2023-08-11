export default function Header() {
  return (
    <header>
      <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="#" class="flex items-center">
            <img
              src="/logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              FreshDo
            </span>
          </a>
          <div
            class="justify-between items-center w-full flex w-auto"
          >
            <ul class="flex font-medium flex-row space-x-8 mt-0">
              <li>
                <a
                  href="/"
                  class="block py-2 pr-4 pl-3 rounded bg-transparent text-blue-700 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/todos"
                  class="block py-2 pr-4 pl-3 rounded bg-transparent text-blue-700 dark:text-white"
                >
                  Todos
                </a>
              </li>
            </ul>
          </div>
          <div class="flex items-center">
            <a
              href="#"
              class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Log in
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
