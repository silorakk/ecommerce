import { Product } from "@prisma/client";
import React, { useState } from "react";

interface Item {
  product: Product;
  quantity: number;
}

export type CartContextType = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  updateQuantity: (item: Item, newQuantity: number) => void;
};

export const CartContext = React.createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  const removeItem = (item: Item) => {
    setItems(
      items.filter((currentItem) => currentItem.product.id !== item.product.id)
    );
  };

  const updateQuantity = (item: Item, newQuantity: number) => {
    setItems(
      items.map((currentItem) => {
        if (currentItem.product.id === item.product.id) {
          return { ...currentItem, quantity: newQuantity };
        }

        return currentItem;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
