import { getProduct } from "@/app/lib/products/get-product";
import ProductForm from "@/components/product-form/product-form";
import { Product } from "@/types/product";

export default async function NewProductPage(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;
  const product: Product = await getProduct(id);

  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center max-w-lg w-full bg-neutral-50 p-6 flex border border-gray-200 rounded-xl ">
        <h1 className="text-2xl font-bold mb-4">Editar produto</h1>
        <ProductForm initialProduct={product} />
      </div>
    </div>
  );
}
