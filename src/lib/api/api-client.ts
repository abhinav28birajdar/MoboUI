/**
 * Centralized API client for MoboUI
 * Provides standardized fetch wrappers, retry logic, error handling, and type safety
 */

export interface ApiResponse<T> {
  data: T | null;
  error: {
    message: string;
    status?: number;
    code?: string;
  } | null;
}

interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

/**
 * Standard fetch helper with automatic retries and error parsing
 */
async function apiFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { retries = 3, retryDelay = 1000, ...fetchOptions } = options;

  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
        ...fetchOptions,
      });

      if (!response.ok) {
        let errorData: any = {};
        try {
          errorData = await response.json();
        } catch {
          // Response is not JSON
        }
        return {
          data: null,
          error: {
            message: errorData.error || response.statusText || 'Request failed',
            status: response.status,
          },
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Network error');
      console.warn(`API Request attempt ${attempt + 1} failed:`, lastError.message);
      
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
      }
    }
  }

  return {
    data: null,
    error: {
      message: lastError?.message || 'Network request failed after maximum retries',
      code: 'NETWORK_FAILURE',
    },
  };
}

export const apiClient = {
  get: <T>(url: string, options?: FetchOptions) =>
    apiFetch<T>(url, { method: 'GET', ...options }),

  post: <T>(url: string, body: any, options?: FetchOptions) =>
    apiFetch<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    }),

  put: <T>(url: string, body: any, options?: FetchOptions) =>
    apiFetch<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(url: string, options?: FetchOptions) =>
    apiFetch<T>(url, { method: 'DELETE', ...options }),
};
