export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao obter produtos");
  }

  return res.json();
}
