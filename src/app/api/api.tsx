// const BASE_URL = "https://ca62e833d0979b7651c8.free.beeceptor.com/api"
const BASE_URL = "https://66f91bb72a683ce97310e9cf.mockapi.io/"

export type Todo = {
    id: string;
    name: string;
};

export async function fetchTodos(): Promise<Todo[]> {
    const url = `${BASE_URL}/todos/`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }
    return response.json()
}

export async function createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });

    if (!response.ok) {
        throw new Error("Failed to create todo");
    }

    return response.json();
}

export async function fetchTodo(todoId: string): Promise<Todo> {
    console.log("Fetching todo for ",todoId)
    const response = await fetch(`${BASE_URL}/todos/${todoId}`)

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }
    return response.json();
}

export async function updateTodo(todoId: string, todo: Partial<Todo>): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });

    if (!response.ok) {
        throw new Error(`Failed to update todo with ID: ${todoId}`);
    }

    return response.json();
}



export async function deleteTodo(todoId: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Failed to delete todo with ID: ${todoId}`);
    }
}
