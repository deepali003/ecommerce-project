"use client";

import { useState } from "react";
import { addToCart } from "@/lib/api";
import type { Product } from "@/lib/types";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setMessage("");

      let sessionId = localStorage.getItem("cart_session_id");

      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("cart_session_id", sessionId);
      }

      const data = await addToCart(
        product.id,
        1,
        sessionId,
        "increment"
      );

      console.log("Cart response:", data);

      window.dispatchEvent(new Event("cartUpdated"));

      setMessage("Product added to cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      setMessage("Failed to add product to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.stock === 0 || loading}
        className="w-full rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {product.stock === 0
          ? "Out of Stock"
          : loading
            ? "Adding..."
            : "Add to Cart"}
      </button>

      {message && (
        <p className="mt-3 text-sm font-medium text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}