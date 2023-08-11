import { ColumnType, Generated, Insertable, Selectable } from "kysely";

export interface Database {
    todos: TodoTable;
}

export interface TodoTable {
    id: Generated<number>;
    title: string;
    completed: Generated<boolean>;
    // Fetched as a Date, never inserted (auto-generated), never updated
    created_at: ColumnType<Date, never, never>,
    // Fetched as a Date, never inserted, updated as string
    updated_at: ColumnType<Date, never, string> | null,
}

export type Todo = Selectable<TodoTable>;
export type PendingTodo = Insertable<TodoTable>;
