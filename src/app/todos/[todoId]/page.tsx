import Link from "next/link"

export default async function TodoDetails({ params }: {
    params: {
        todoId: string
    }
}) {

    return (
        <div>
          <h1>Details</h1>
          Details for todo {params.todoId}
          <p>
            <Link  href="/todos">Back</Link>
          </p>

        </div>
    )
}
