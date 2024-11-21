// src/lib/api/client.ts
// --------------------------------

// this is a TypeScript implementation of an API client;
// essentially a wrapper around the standard fetch API 
// that helps make HTTP requests to our backend server 
// in a more organized and type-safe way.


// why do we need it?

// error handling
// the code includes a custom APIError class 
// that provides structured error handling
// It automatically catches network errors and server errors, 
// making them easier to handle throughout your application

// centralization
// instead of writing fetch calls everywhere in our application, 
// we have one place that handles all API communications
// base URL is configured once and reused across all requests
// common headers (like Content-Type) are set automatically

// type safety
// using TypeScript generics (<T>), 
// we can specify the expected return type of each API call
// this provides better autocomplete and 
// catch type-related errors during development


// standard fetch vs this

// without the API client
/*
const getData = async () => {
  const response = await fetch('http://api.example.com/users', {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Request failed');
  return response.json();
}

// with the API client
const apiClient = new APIClient('http://api.example.com');
const getData = async () => {
  return apiClient.get<User[]>('/users'); // type-safe, cleaner, error handling included
} 
*/

export class APIError extends Error {
  constructor(message: string, public status: number, public details?: any) {
    super(message);
    this.name = "APIError";
  }
}

export class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new APIError(
          data.message || "An error occurred",
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError("Network error or server is unreachable", 500);
    }
  }

  public async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  public async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}





// Benefits:
// 1. DRY (Don't Repeat Yourself)
//    - Common logic like error handling and header setting is written once
//    - Base URL management is centralized
//
// 2. Consistency
//    - All API calls in our application will behave the same way
//    - Error handling is consistent across all requests
//
// 3. Maintainability
//    - Need to add authentication? Just modify the client once
//    - Want to add request logging? Add it in one place
//    - Need to change how errors are handled? Single location to update
//
// 4. Testing
//    - Having a single API client makes, should mean easier testing