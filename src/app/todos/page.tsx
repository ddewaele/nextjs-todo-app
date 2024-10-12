import { revalidatePath } from "next/cache";
import Link from "next/link";
import { createTodo, deleteTodo, fetchTodos, Todo } from "../api/api";

export const dynamic = 'force-dynamic'

export default async function Todos() {


  const todos: Todo[] = await fetchTodos();


  const createTodoFromFrom = async (formData: FormData) => {
    'use server';

    const name = formData.get('name') as string;

    await createTodo({
      name: name
    })

    // revalidatePath('/todos', 'page')
    revalidatePath('/', 'layout')

  };

  const deletePostForm = async (id: string) => {
    'use server';

    await deleteTodo(id)

    // revalidatePath('/todos', 'page')
    revalidatePath('/', 'layout')

  };

  return (

    <div>
      <h1>Todos</h1>
      <form action={createTodoFromFrom} className="flex flex-col gap-y-2">
        <input type="text" name="name" placeholder="Name" />
        <button type="submit">Create</button>
      </form>

      <ul>
      {todos.map((todo) => (
          <li key={todo.id}>
              <Link  href={`/todos/${todo.id}`}>{todo.name}</Link>
              |{' '}
              <Link href={`/todos/${todo.id}/edit`}>Edit</Link>
              <form action={deletePostForm.bind(null, todo.id)}>
                <button type="submit">Delete</button>
              </form>
          </li>
        ))}
      </ul>
      <p>
      <Link  href="/">Back</Link>
      </p>
    </div>
  );
}


