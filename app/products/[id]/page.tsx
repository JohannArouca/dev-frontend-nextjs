import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar produto");
  }

  return res.json();
}

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const product = await getProduct(id);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="flex justify-center text-2xl font-bold mb-6">
        {product.title}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-1/2 aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex-1">
          <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full w-fit mb-4">
            {product.category}
          </span>

          <p className="text-2xl font-bold text-blue-600 mb-4">
            R${product.price.toFixed(2)}
          </p>

          <p className="leading-relaxed text-gray-700">{product.description}</p>

          <div className="mt-6 flex justify-end items-center gap-4">
            <Link
              className="flex items-center gap-2 px-4 py-2 text-gray-800 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              href={`/products`}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
