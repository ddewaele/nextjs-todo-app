import { fetchTodo, updateTodo } from "@/app/api/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'
export default async function EditTodo({ params }: {
    params: {
        todoId: string
    }
}) {

  const todo = await fetchTodo(params.todoId)

  const updateTodoForm = async (formData: FormData) => {
    'use server';

    const id = formData.get('id') as string;
    const name = formData.get('name') as string;


    updateTodo(id,{
        id,
        name
    })
    // revalidatePath('/todos/[todoId]', 'page')
    // revalidatePath('/todos/[todoId]/edit', 'page')
    // revalidatePath('/todos', 'page')

    revalidatePath('/', 'layout')


    redirect('/todos');
  };


  if (!todo) {
    return notFound()
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Edit Todo</h2>

      <form className="space-y-4" action={updateTodoForm}>
      <input type="hidden" name="id" value={todo.id} />

        {/* ID Field (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
          <input
            type="text"
            value={todo.id}
            readOnly
            className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100 text-gray-500"
          />
        </div>

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={todo.name}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Update Todo
        </button>
      </form>

      {/* Back Link */}
      <div className="mt-6 text-center">
        <Link href="/todos" className="text-blue-500 hover:underline">&larr; Back to Todos
        </Link>
      </div>
    </div>
  )



}
