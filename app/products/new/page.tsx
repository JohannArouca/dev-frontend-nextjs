import ProductForm from "../../../components/product-form/product-form";

export default function NewProductPage() {
  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center max-w-lg w-full bg-neutral-50 p-6 flex border border-gray-200 rounded-xl ">
        <h1 className="text-2xl font-bold mb-4">Novo produto</h1>
        <ProductForm />
      </div>
    </div>
  );
}
