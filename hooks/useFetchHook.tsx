import { useState } from 'react';
type FetchProps = {
  url: string;
  body: object;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  v: 1 | 2;
  delay?: number;
};
function useFetchHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = 'http://localhost:5000/api';
  const Post = async ({ url, body, method, v, delay }: FetchProps) => {
    setIsLoading(true);

    try {
      if (delay) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const res = await fetch(`${API}/v${v}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || 'Unknown error occurred');
        return {
          ok: false,
          message: data?.message || 'Unknown error occurred',
          data,
        };
      }
      return { ok: true, data };
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.message || 'Network error or server unavailable';
      setError(errorMessage);
      return { ok: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, setIsLoading, error, setError, Post };
}
export default useFetchHook;
