"use client";

import { useState } from "react";
import QuantitySelector from "@/components/QuantitySelector";
import { addToCart } from "@/lib/api";
import type { Product } from "@/lib/types";

type AddToCartProps = {
  product: Product;
  mode?: "set" | "increment";
};

export default function AddToCart({ product, mode = "set" }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Get existing guest session ID
      let sessionId = localStorage.getItem("cart_session_id");

      // Create it only once
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("cart_session_id", sessionId);
      }

      const data = await addToCart(product.id, quantity, sessionId, mode);

      console.log("Cart response:", data);

      // Tell Header that cart has been updated
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
    <div className="mt-6">
      <p className="mb-2 text-sm font-medium text-gray-700">
        Quantity
      </p>

      <QuantitySelector
        stock={product.stock}
        onQuantityChange={setQuantity}
      />

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.stock === 0 || loading}
        className="mt-8 w-full rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>

      {message && (
        <p className="mt-3 text-sm font-medium text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}