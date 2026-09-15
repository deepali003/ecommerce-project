import type { Product } from "./types";
const API_URL = "http://localhost:5000/api";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failes to fetch products");
  }

  const data = await response.json();

  return data.products;
}
