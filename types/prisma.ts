import { Order, Product, ProductOrders } from "@prisma/client";

export type OrderWithProducts = Order & {
  ProductOrders: ProductOrderWithProduct[];
};

type ProductOrderWithProduct = ProductOrders & { product: Product };
