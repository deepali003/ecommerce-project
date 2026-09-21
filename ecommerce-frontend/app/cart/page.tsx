"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/lib/api";
import { getCartSessionId } from "@/lib/cartSession";
import type { CartItem } from "@/lib/types";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const sessionId = getCartSessionId();

        if (!sessionId) {
          setItems([]);
          return;
        }

        const data = await getCart(sessionId);
        setItems(data.items || []);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  if (loading) {
    return <div className="p-6">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <p className="mt-4">Your cart is empty.</p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <img
              src={`http://localhost:5000${item.image}`}
              alt={item.name}
              className="h-24 w-24 rounded object-cover"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>

              <p className="text-gray-600">₹{item.price}</p>

              <p className="mt-2">Quantity: {item.quantity}</p>
            </div>

            <div className="font-semibold">
              ₹{Number(item.price) * item.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
