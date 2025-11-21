import Link from "next/link";
import ProductCard from "../../components/product-card/product-card";
import { getProducts } from "../lib/products/get-products";
import { Product } from "@/types/product";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <Button asChild>
          <Link className="cursor-pointer" href={`/products/new`}>
            <Plus className="w-4 h-4" />
            Novo produto
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-6 justify-center mt-5 items-stretch">
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
