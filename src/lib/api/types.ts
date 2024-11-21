// src/lib/api/types.ts
// --------------------------------

// generic interface for successful API responses
export interface APIResponse<T> {
  data: T; // the actual response data, which is of type T (generic type)
  // <T> is a generic type parameter; it allows the interface to work with any data type

  error?: string;
  status: number; // http status code
}

export interface APIErrorResponse {
  message: string;
  status: number;
  details?: any;
}