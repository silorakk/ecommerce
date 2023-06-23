import { Order, Product, ProductOrders, User, Comment } from "@prisma/client";

export type OrderWithProducts = Order & {
  ProductOrders: ProductOrderWithProduct[];
};

type ProductOrderWithProduct = ProductOrders & { product: Product };

export type CommentAndUser = Comment & { user: User };
