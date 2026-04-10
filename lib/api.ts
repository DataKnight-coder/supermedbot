const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://supermedbot-backend.onrender.com';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // We can handle specific errors here
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || 'API request failed');
  }

  return response.json();
}
