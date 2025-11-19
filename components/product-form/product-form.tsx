"use client";

import { Product } from "@/types/product";

interface ProductFormProps {
  product: Product;
  setProduct: (value: any) => void;
}

export default function ProductForm({ product, setProduct }: ProductFormProps) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setProduct({ ...product, [e.target.name]: e.target.value });
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
    </form>
  );
}
