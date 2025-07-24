const BASE_URL = 'https://api.lukebm.com';

export async function fetchTodos() {
  const res = await fetch(`${BASE_URL}/todos/`);
  return res.json();
}

export async function createTodo(title) {
  const res = await fetch(`${BASE_URL}/todos/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return res.json();
}