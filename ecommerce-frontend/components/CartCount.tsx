"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart } from "@/lib/api";
import { getCartSessionId } from "@/lib/cartSession";

export default function CartCount() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCartCount = async () => {
      try {
        const sessionId = getCartSessionId();

        if (!sessionId) {
          setCartCount(0);
          return;
        }
        const data = await getCart(sessionId);

        const totalQuantity = (data.items || []).reduce(
          (total: number, item: { quantity: number }) => total + item.quantity,
          0,
        );
        setCartCount(totalQuantity);
      } catch (error) {
        console.log("Failed to load cart count:", error);
      }
    };
    // Load cart when component starts
    loadCartCount();

    // Listen for cart changes
    window.addEventListener("cartUpdated", loadCartCount);

    //Cleanup
    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
    };
  }, []);
  return (
    <Link href="/cart" className="relative">
      🛒 Cart
      {cartCount > 0 && (
        <span className="ml-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
