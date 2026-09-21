"use client";

import { useState } from "react";

type QuantitySelectorProps = {
    stock: number;
    onQuantityChange?: (quantity: number) => void;
}

export default function QuantitySelector({stock, onQuantityChange}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if(quantity < stock){
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange?.(newQuantity);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
        const newQuantity = quantity -1;
        setQuantity(quantity - 1);
        onQuantityChange?.(newQuantity);
    }
  };

  return (
    <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">
      <button
        onClick={decreaseQuantity}
        disabled={quantity === 1}
        className="px-4 py-2 text-lg hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        -
      </button>
      <span className="border-x border-gray-300 px-5 py-2">{quantity}</span>

      <button
        onClick={increaseQuantity}
        disabled={quantity >= stock}
        className="px-4 py-2 text-lg hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
