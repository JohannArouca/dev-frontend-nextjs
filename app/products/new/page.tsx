"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postProduct } from "@/app/lib/products/post-product";
import ProductForm from "../../../components/product-form/product-form";

export default function NewProductPage() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });
  const router = useRouter();

  async function handleConfirm() {
    try {
      setLoading(true);

      await postProduct(product);

      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      alert("Ocorreu um problema ao criar o produto.");
    } finally {
      setLoading(false);
      alert("Produto criado com sucesso!");
    }
  }

  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center max-w-lg w-full bg-neutral-50 p-6 flex border border-gray-200 rounded-xl ">
        <h1 className="text-2xl font-bold mb-4">Novo produto</h1>
        <ProductForm product={product} setProduct={setProduct} />
        <div className="mt-6 flex justify-end w-full items-center gap-4">
          <Link
            className="flex items-center gap-2 px-4 py-2 text-gray-800 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition"
            href={`/products`}
          >
            Cancelar
          </Link>

          <button
            className="flex items-center gap-2 px-4 py-2 text-neutral-50 bg-neutral-950 border border-neutral-950 rounded-lg cursor-pointer hover:bg-neutral-800 transition"
            onClick={handleConfirm}
            disabled={loading}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
