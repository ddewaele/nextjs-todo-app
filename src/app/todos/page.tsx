import { revalidatePath } from "next/cache";
import Link from "next/link";
import { createTodo, deleteTodo, fetchTodos } from "../api/postgres";
import { Todo } from "../api/types";

export const dynamic = 'force-dynamic'

export default async function Todos() {


  const todos: Todo[] = await fetchTodos();

  const createTodoFromFrom = async (formData: FormData) => {
    'use server';

    const name = formData.get('name') as string;

    await createTodo(name)
    revalidatePath('/', 'layout')

  };

  const deletePostForm = async (id: string) => {
    'use server';

    await deleteTodo(id)
    revalidatePath('/', 'layout')

  };

  return (

<div className="max-w-2xl mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Todos</h1>

  <form action={createTodoFromFrom} className="flex flex-col gap-y-4 mb-8 bg-gray-50 p-4 rounded shadow-md">
    <input
      type="text"
      name="name"
      placeholder="Enter todo name"
      className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
    />
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      Create Todo
    </button>
  </form>

  <ul className="space-y-4">
    {todos.map((todo) => (
      <li key={todo.id} className="flex justify-between items-center p-4 bg-white shadow rounded">
        <span className="font-medium text-lg">
          <Link href={`/todos/${todo.id}`} className="text-blue-600 hover:underline">{todo.name}</Link>
        </span>
        <div className="flex space-x-4">
          <Link
            href={`/todos/${todo.id}/edit`}
            className="text-green-500 hover:underline"
          >
            Edit
          </Link>
          <form action={deletePostForm.bind(null, todo.id)} className="inline">
            <button
              type="submit"
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </form>
        </div>
      </li>
    ))}
  </ul>

  <p className="mt-8">
    <Link href="/" className="text-blue-500 hover:underline">Back</Link>
  </p>
</div>
  );
}


