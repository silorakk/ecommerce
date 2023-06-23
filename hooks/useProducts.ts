import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/products");
      const json: { data: Product[] } = await res.json();
      const products = json.data;

      setProducts(products);
    };

    getProducts();
  }, []);

  return products;
};
