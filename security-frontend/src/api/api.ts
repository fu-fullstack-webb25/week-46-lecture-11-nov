import type {
  RegisterBody,
  LoginBody,
  RegisterResponse,
  LoginResponse
} from "../types/auth.types";

import type { ProductResponse } from "../types/products.types";

const API_URL = "http://localhost:8080/api";

export const registerUser = async (data : RegisterBody) : Promise<RegisterResponse> => {
	const response = await fetch(`${API_URL}/auth/register`, {
		method : "POST",
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify(data)
	});

	if (!response.ok) {
		throw new Error("Could not register user");
	}

	return await response.json() as RegisterResponse;
};

export const loginUser = async (data : LoginBody) : Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data),
    credentials : 'include'
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  return await response.json() as LoginResponse;
};

export const fetchProducts = async () : Promise<ProductResponse[]> => {
	const response = await fetch(`${API_URL}/products`, {
		method : "GET",
		headers : {
			"Content-Type" : "application/json"
		},
    credentials : 'include'
	});
	
	if (!response.ok) {
		throw new Error("Could not fetch products");
	}
	return await response.json();
}

export const checkout = async (): Promise<string> => {
    const response = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Could not complete checkout");
    }

    const { url } : { url : string | null } = await response.json();

    if (!url) {
        throw new Error("No checkout URL returned");
    }

    return url;
};