import { useSignal } from "@preact/signals";
import { Todo } from "../database/types.ts";

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
  const error = useSignal("");
  const todosSignal = useSignal(todos);

  const handleClick = async (idx: number) => {
    const resp = await fetch(`/api/todos/${todosSignal.value[idx].id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!resp.ok) {
      error.value = resp.statusText;
    } else {
      const updatedTodo: Todo = await resp.json();
      todosSignal.value[idx] = updatedTodo;
      todosSignal.value = [...todosSignal.value];
    }
  };

  return (
    <>
      {error.valueOf() ? (
        <span className="text-red-500 italic text-xs">
          Failed to complete todo - {error.valueOf()}
        </span>
      ) : null}
      <ul>
        {todosSignal.value.map((todo, idx) => (
          <li key={todo.id} className="flex flex-row space-x-2">
            <input
              type="checkbox"
              checked={todo.completed ? true : false}
              onClick={() => handleClick(idx)}
            />
            <span className={todo.completed ? "text-line-through" : ""}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
