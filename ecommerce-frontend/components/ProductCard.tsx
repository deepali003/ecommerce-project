import type { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { BACKEND_URL } from "@/lib/api";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
   console.log("Product:", product);
  console.log("Product image:", product.image);
  console.log("Final image URL:", `${BACKEND_URL}${product.image}`);
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

          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>

        <button
          type="button"
          className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
