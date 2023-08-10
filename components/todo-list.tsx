import { Selectable } from "kysely";
import { Todo } from "../database/types.ts";

type SelectableTodo = Selectable<Todo>;

interface Props {
  todos: SelectableTodo[];
}

export default function TodoList({ todos }: Props) {
  return (
    <>
      <table>
        <tbody>
          {todos.map((todo) => (
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
