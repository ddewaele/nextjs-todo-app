import { sql } from "@vercel/postgres";
import { Todo } from "./types";


export async function fetchTodos(): Promise<Todo[]> {
    const { rows } = await sql<Todo>`SELECT * from TODOs`;
    return rows;
}

export async function createTodo(name: string): Promise<Todo> {

    console.log("Creating todo = ",name)
    const { rows } = await sql<Todo>`
      INSERT INTO TODOs (name)
      VALUES (${name})
      RETURNING *;
    `;

    return rows[0];
  }
export async function fetchTodo(id: string): Promise<Todo | null> {
    const { rows } = await sql<Todo>`SELECT * FROM TODOs WHERE id = ${id}`;
    return rows.length ? rows[0] : null;
  }

export async function updateTodo(id: string, todo: Todo): Promise<Todo> {

    console.log("Updating todo ", todo)
    const { rows } = await sql<Todo>`
      UPDATE TODOs
      SET name = ${todo.name}
      WHERE id = ${id}
      RETURNING *;
    `;

    return rows[0];
  }

export async function deleteTodo(id: string): Promise<void> {
    await sql`DELETE FROM TODOs WHERE id = ${id}`;
  }
