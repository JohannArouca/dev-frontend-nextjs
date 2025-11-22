import { Product } from "@/types/product";

export async function putProduct(product: Product) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${product.id}`,
    {
      method: "PUT",
      body: JSON.stringify(product),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao editar produto");
  }

  return response.json();
}
