import type { Product } from "../lib/types";
type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      {/* Product Image */}
      <div className="flex h-64 items-center justify-center bg-gray-200">
        <span className="text-gray-500">Product Image</span>
      </div>

      {/* Product Information */}
      <div className="p-5">
        {/* <p className="text-sm text-gray-500">
          {product.category}
        </p> */}
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>

        <h3 className="mt-1 text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <p className="mt-2 text-xl font-bold text-gray-900">₹{product.price}</p>

        <button className="mt-4 w-full rounded-lg bg-black py-2.5 font-medium text-white hover:bg-gray-800">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
