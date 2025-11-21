import Link from "next/link";
import { ArrowLeft, Trash, Pen } from "lucide-react";
import { getProduct } from "@/app/lib/products/get-product";
import { DeleteDialog } from "../../../components/delete-dialog/delete-dialog";
import { Product } from "@/types/product";

export default async function ProductPage(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;
  const product: Product = await getProduct(id);

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
            ${product.price.toFixed(2)}
          </p>

          <p className="leading-relaxed text-gray-700">{product.description}</p>

          <div className="mt-6 flex justify-end items-center gap-4">
            <Link
              className="flex items-center gap-2 px-4 py-2 text-yellow-700 border border-yellow-200 rounded-lg cursor-pointer hover:bg-yellow-100 transition"
              href={`/products/${product.id}/edit`}
            >
              <Pen className="w-4 h-4" />
              Editar
            </Link>

            <DeleteDialog
              id={product.id}
              trigger={
                <button className="flex items-center gap-2 px-4 py-2 text-red-700 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 transition">
                  <Trash className="w-4 h-4" />
                  Excluir
                </button>
              }
            />

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
