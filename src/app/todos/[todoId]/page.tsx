import { fetchTodo } from "@/app/api/postgres"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function TodoDetails({ params }: {
    params: {
        todoId: string
    }
}) {

  const todo = await fetchTodo(params.todoId)


  if (!todo) {
    return (<div>
      Not Found
    </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">View Todo</h2>

      <form className="space-y-4">
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
            value={todo.name}
            readOnly
            className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100 text-gray-500"
          />
        </div>

      </form>

      {/* Back Link */}
      <div className="mt-6 text-center">
        <Link href="/todos" className="text-blue-500 hover:underline">&larr; Back to Todos
        </Link>
      </div>
    </div>
  )


}
