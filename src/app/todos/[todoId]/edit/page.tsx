import { fetchTodo, updateTodo } from "@/app/api/api";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from 'next/navigation';


export default async function EditTodo({ params }: {
    params: {
        todoId: string
    }
}) {

  const todo = await fetchTodo(params.todoId)

  console.log("Found todo ", todo)


  const updateTodoForm = async (formData: FormData) => {
    'use server';

    const id = formData.get('id') as string;
    const name = formData.get('name') as string;


    updateTodo(id,{
        id,
        name
    })
    revalidatePath('/');
    redirect('/todos');
  };


  if (!todo) {
    return notFound()
  }

  return (
    <form action={updateTodoForm}>
      <input type="hidden" name="id" value={todo.id} />
      <input
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={todo.name}
      />
      <button type="submit">Update</button>
    </form>
  )


}
