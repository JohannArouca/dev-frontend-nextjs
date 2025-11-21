"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postProduct } from "@/app/lib/products/post-product";
import { Product } from "@/types/product";
import { putProduct } from "@/app/lib/products/put-product";

interface ProductFormProps {
  initialProduct?: Product;
}

export default function ProductForm({ initialProduct }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });
  useEffect(() => {
    if (initialProduct) setProduct(initialProduct);
  }, [initialProduct]);
  const router = useRouter();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  async function handleConfirm() {
    try {
      setLoading(true);

      initialProduct ? await putProduct(product) : await postProduct(product);

      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error(
        `Erro ao ${initialProduct ? "editar" : "criar"} produto:`,
        error
      );
      alert(
        `Ocorreu um problema ao ${
          initialProduct ? "editar" : "criar"
        } o produto.`
      );
    } finally {
      setLoading(false);
      alert(`Produto ${initialProduct ? "editado" : "criado"} com sucesso!`);
    }
  }

  return (
    <form className="w-full flex flex-col">
      <span className="text-sm mt-auto mb-1">Título</span>
      <input
        className="mb-4 border p-2 rounded"
        type="text"
        name="title"
        value={product.title}
        onChange={handleChange}
      />

      <span className="text-sm mt-auto mb-1">Preço</span>
      <input
        className="mb-4 border p-2 rounded"
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
      />

      <span className="text-sm mt-auto mb-1">Descrição</span>
      <textarea
        className="mb-4 border p-2 rounded"
        name="description"
        value={product.description}
        onChange={handleChange}
      />

      <span className="text-sm mt-auto mb-1">Categoria</span>
      <input
        className="mb-4 border p-2 rounded"
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
      />

      <span className="text-sm mt-auto mb-1">URL da imagem</span>
      <input
        className="border p-2 rounded"
        type="text"
        name="image"
        value={product.image}
        onChange={handleChange}
      />

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
    </form>
  );
}
