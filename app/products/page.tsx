import Link from "next/link";
import ProductCard from "../../components/product-card/product-card";
import { getProducts } from "../lib/products/get-products";
import { Product } from "@/types/product";
import { Plus } from "lucide-react";

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Produtos</h1>
          <span className="text-lg">
            {products.length} produtos encontrados
          </span>
        </div>
        <Link
          className="flex items-center gap-2 px-4 py-2 h-full text-neutral-50 bg-neutral-950 border border-neutral-950 rounded-lg cursor-pointer hover:bg-neutral-800 transition"
          href={`/products/new`}
        >
          <Plus className="w-4 h-4" />
          Novo produto
        </Link>
      </div>

      <div className="flex flex-wrap gap-6 justify-start mt-5 items-stretch">
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
