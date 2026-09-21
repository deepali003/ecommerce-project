export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

export type CartItem = {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: string;
  name: string;
  description: string;
  image: string;
};

export type Cart = {
  id: number;
  user_id: number | null;
  session_id: string;
  created_at: string;
  updated_at: string;
  items: CartItem[];
};

export type CartResponse = {
  success: boolean;
  cart: Cart | null;
  items: CartItem[];
  message?: string;
};