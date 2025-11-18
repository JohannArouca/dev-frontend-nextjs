import Image from "next/image";

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductCard({
  id,
  title,
  price,
  description,
  category,
  image,
}: ProductCardProps) {
  return (
    <div className="cursor-pointer group min-w-[250px] max-w-[270px] border border-gray-200 rounded-xl p-4 flex flex-col bg-white shadow transition-all duration-300 hover:shadow-xl">
      <div className="relative w-full aspect-square">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>

      <h2 className="text-xl font-semibold line-clamp-2">{title}</h2>

      <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 mt-1 rounded-full w-fit">
        {category}
      </span>

      <span className="text-sm mt-auto line-clamp-3 mb-2">{description}</span>

      <span className="flex justify-end text-2xl font-bold text-blue-600 mt-auto">
        ${price.toFixed(2)}
      </span>
    </div>
  );
}
