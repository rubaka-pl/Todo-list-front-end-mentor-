// api.js
const API_BASE = 'https://jsonplaceholder.typicode.com';

export async function getAllTodos(limit = 8) {
  try {
    const res = await fetch(`${API_BASE}/todos?_limit=${limit}`);
    return await res.json();
  } catch (error) {
    throw new Error('Failed to fetch todos.');
  }
}

export async function getAllUsers(limit = 5) {
  try {
    const res = await fetch(`${API_BASE}/users?_limit=${limit}`);
    return await res.json();
  } catch (error) {
    throw new Error('Failed to fetch users.');
  }
}

export async function createTodo(todo) {
  try {
    const res = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todo),
    });
    return await res.json();
  } catch (error) {
    throw new Error('Failed to create todo.');
  }
}

export async function toggleTodoComplete(todoId, completed) {
  try {
    const res = await fetch(`${API_BASE}/todos/${todoId}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    return await res.json();
  } catch (error) {
    throw new Error('Failed to update todo.');
  }
}

export async function deleteTodo(todoId) {
  try {
    const res = await fetch(`${API_BASE}/todos/${todoId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error();
    return true;
  } catch (error) {
    throw new Error('Failed to delete todo.');
  }
}
