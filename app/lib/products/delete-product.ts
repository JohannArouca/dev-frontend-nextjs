export async function deleteProduct(id: number) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir produto");
  }

  return response.json();
}
