import type { Product } from "./types";
export const BACKEND_URL = "http://localhost:5000";
export const API_URL = `${BACKEND_URL}/api`;

//Get Product Lists Api
export async function getProducts(limit?: number): Promise<Product[]> {
  const url = limit
    ? `${API_URL}/products?limit=${limit}`
    : `${API_URL}/products`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.products;
}

//Get Product Details Api
export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();

  return data.product;
}


// Add Cart Api
export async function addToCart(
  productId: number,
  quantity: number,
  sessionId: string,
  mode: "set" | "increment" = "set",
) {
  const response = await fetch(`${API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      productId,
      quantity,
      mode
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add product to cart");
  }
  return data;
}

//Cart List Api
export async function getCart(sessionId:string){
  const response = await fetch(`${API_URL}/cart?sessionId=${sessionId}`,
    {
      cache: "no-store",
    }
  );
  if(!response.ok){
    throw new Error("Failed to fetch cart");
  }

  return response.json();
}

//update cart api
export async function updateCartItem(
  cartItemId: number,
  quantity: number,
  sessionId: string
) {
  const response = await fetch(
    `${API_URL}/cart/item/${cartItemId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        quantity,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update cart item"
    );
  }

  return data;
}

//remove cart api
export async function removeCartItem(
  cartItemId: number,
  sessionId: string
) {
  const response = await fetch(
    `${API_URL}/cart/item/${cartItemId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to remove cart item"
    );
  }

  return data;
}