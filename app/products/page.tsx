import Link from "next/link";
import ProductCard from "../../components/product-card/product-card";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export default async function ProductsPage() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  const products: Product[] = await res.json();

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-2">Produtos</h1>
      <span className="text-lg">{products.length} produtos encontrados</span>

      <div className="flex flex-wrap gap-6 justify-start mt-5">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category}
              image={product.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
