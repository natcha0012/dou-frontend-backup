import { ref } from 'vue'

export async function useFetch(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  body?: Record<string, any>
) {
  const data = ref<any>(null)
  const error = ref<any>(null)

  const requestOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  }

  await fetch(`${import.meta.env.VITE_API_URL}${url}`, requestOptions)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data: data.value, error: error.value }
}
