import Image from "next/image";
import { BACKEND_URL, getProduct, getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import AddToCart from "@/components/AddToCart";

type ProductDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  // Get current product
  const product = await getProduct(Number(id));

  // Get all products for related products
  const products = await getProducts();

  // Remove current product and show only 4 products
  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Product Details */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
            {/* Product Image */}
            <div className="rounded-xl bg-gray-100 p-4 sm:p-8">
              <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[500px]">
                <Image
                  src={`${BACKEND_URL}${product.image}`}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 text-2xl font-bold text-gray-900">
                ₹{product.price}
              </p>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Description
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                  {product.description}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-6">
                {product.stock > 0 ? (
                  <p className="font-medium text-green-600">
                    In Stock ({product.stock} available)
                  </p>
                ) : (
                  <p className="font-medium text-red-600">Out of Stock</p>
                )}
              </div>

              {/* Quantity */}
              <AddToCart 
              product={product} mode="set"
              />
             
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              Related Products
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
