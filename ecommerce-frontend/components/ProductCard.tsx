import type { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { BACKEND_URL } from "@/lib/api";
import AddToCartButton from "./AddToCartButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      
      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-52 w-full bg-gray-100">
          <Image
            src={`${BACKEND_URL}${product.image}`}
            alt={product.name}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h2 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900">
            {product.name}
          </h2>
        </Link>

        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price}
          </span>

          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}