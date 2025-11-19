export async function getProduct(id: number) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Erro ao obter dados do produto");
  }

  return res.json();
}
