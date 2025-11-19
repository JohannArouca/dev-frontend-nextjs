import { Product } from "@/types/product";

export async function postProduct(product: Product) {
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar produto");
  }

  return response.json();
}
