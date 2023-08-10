import { ColumnType, Generated } from "kysely";

export interface Database {
    todos: Todo;
}

export interface Todo {
    id: Generated<number>;
    title: string;
    completed: Generated<boolean>;
    // Fetched as a Date, never inserted (auto-generated), never updated
    created_at: ColumnType<Date, never, never>,
    // Fetched as a Date, never inserted, updated as string
    updated_at: ColumnType<Date, never, string> | null,
}
