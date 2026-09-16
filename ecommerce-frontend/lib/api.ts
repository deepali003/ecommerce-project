import type { Product } from "./types";
export const BACKEND_URL = "http://localhost:5000";
export const API_URL = `${BACKEND_URL}/api`;

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

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();

  return data.product;
}