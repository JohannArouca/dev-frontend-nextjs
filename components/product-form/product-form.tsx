"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postProduct } from "@/app/lib/products/post-product";
import { Product } from "@/types/product";
import { putProduct } from "@/app/lib/products/put-product";
import Spinner from "../spinner/spinnet";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

  function handleChange(name: string, value: string) {
    setProduct({ ...product, [name]: value });
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
      toast.error(
        `Ocorreu um problema ao ${
          initialProduct ? "editar" : "criar"
        } o produto.`
      );
    } finally {
      setLoading(false);
      toast.success(
        `Produto ${initialProduct ? "editado" : "criado"} com sucesso!`
      );
    }
  }

  return (
    <form onSubmit={handleConfirm} className="w-full flex flex-col space-y-4">
      <Label>Título</Label>
      <Input
        value={product.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <Label>Preço</Label>
      <Input
        type="number"
        value={product.price}
        onChange={(e) => handleChange("price", e.target.value)}
      />

      <Label>Descrição</Label>
      <Textarea
        value={product.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <Label>Categoria</Label>
      <Input
        value={product.category}
        onChange={(e) => handleChange("category", e.target.value)}
      />

      <Label>URL da imagem</Label>
      <Input
        value={product.image}
        onChange={(e) => handleChange("image", e.target.value)}
      />

      <div className="mt-6 flex justify-end w-full items-center gap-4">
        <Button asChild variant="outline">
          <Link className="cursor-pointer" href={`/products`}>
            Cancelar
          </Link>
        </Button>

        <Button
          className="cursor-pointer"
          onClick={handleConfirm}
          disabled={loading}
        >
          Confirmar
        </Button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </form>
  );
}
