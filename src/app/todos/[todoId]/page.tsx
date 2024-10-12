import { fetchTodo } from "@/app/api/api"
import Link from "next/link"

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
    <div>
    <h2>{todo.name}</h2>
    Id = {todo.id}
    <hr/>
    Name = {todo.name}
    <hr/>

    <Link  href="/todos">Back</Link>
    </div>
  )


}
