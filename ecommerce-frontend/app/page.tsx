import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { getProducts } from "./lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-100">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              New Collection
            </p>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              Discover Products You’ll Love
            </h1>

            <p className="mt-6 max-w-lg text-lg text-gray-600">
              Shop the latest products at great prices. Discover quality
              products for your everyday needs.
            </p>

            <button className="mt-8 rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800">
              Shop Now
            </button>
          </div>

          <div className="flex h-80 items-center justify-center rounded-xl bg-gray-300">
            <span className="text-gray-600">Hero Image</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>

          <p className="mt-2 text-gray-600">Explore our popular categories</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-xl bg-gray-100 p-8 text-center transition hover:shadow-md">
            <div className="mb-4 text-4xl">👕</div>
            <h3 className="text-lg font-semibold">Fashion</h3>
          </div>

          <div className="rounded-xl bg-gray-100 p-8 text-center transition hover:shadow-md">
            <div className="mb-4 text-4xl">📱</div>
            <h3 className="text-lg font-semibold">Electronics</h3>
          </div>

          <div className="rounded-xl bg-gray-100 p-8 text-center transition hover:shadow-md">
            <div className="mb-4 text-4xl">🏠</div>
            <h3 className="text-lg font-semibold">Home</h3>
          </div>

          <div className="rounded-xl bg-gray-100 p-8 text-center transition hover:shadow-md">
            <div className="mb-4 text-4xl">🎒</div>
            <h3 className="text-lg font-semibold">Accessories</h3>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Products
              </h2>

              <p className="mt-2 text-gray-600">
                Check out our latest products
              </p>
            </div>

            <button className="font-semibold text-gray-900 hover:underline">
              View All
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-xl font-bold">ShopZone</h2>

              <p className="mt-2 text-sm text-gray-400">
                Your one-stop ecommerce store.
              </p>
            </div>

            <div className="text-sm text-gray-400">
              © 2026 ShopZone. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
