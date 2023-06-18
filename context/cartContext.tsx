import { Product } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export interface Item {
  product: Product;
  quantity: number;
}

export type CartContextType = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  updateQuantity: (item: Item, newQuantity: number) => void;
  isCartDisplayed: boolean;
  updateCartVisibility: (isDisplayed: boolean) => void;
  subTotalPrice: number;
};

export const CartContext = React.createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useLocalStorage<Item[]>("cart-items", []);
  const [hasMounted, setHasMounted] = useState(false);
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);

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

  const subTotalPrice = useMemo(() => {
    const prices = items.map((item) => {
      return item.product.price * item.quantity;
    });
    return prices.reduce((acc, current) => acc + current, 0);
  }, [items]);

  const updateCartVisibility = (isDisplayed: boolean) => {
    setIsCartDisplayed(isDisplayed);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        isCartDisplayed,
        updateCartVisibility,
        subTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
