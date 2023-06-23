import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { stripeProductIdsAndQuantity, totalPrice, userId } = req.body as {
      stripeProductIdsAndQuantity: { id: string; quantity: number }[];
      totalPrice: number;
      userId: string;
    };

    const products = await prisma.product.findMany({
      where: {
        stripeProductId: {
          in: stripeProductIdsAndQuantity.map((product) => product.id),
        },
      },
      select: { id: true, stripeProductId: true },
    });

    const productsWithQuantity = products.map((product) => {
      return {
        id: product.id,
        quantity:
          stripeProductIdsAndQuantity.find(
            (i) => i.id === product.stripeProductId
          )?.quantity ?? 0,
      };
    });

    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      return res
        .status(500)
        .json({ message: "Error cannot associate a user with the order." });
    }

    const order = await prisma.order.create({
      data: {
        userId: userId,
        totalAmount: totalPrice,
      },
    });
    const productOrdersData = productsWithQuantity.map((p) => {
      return {
        orderId: order.id,
        quantity: p.quantity,
        productId: p.id,
      };
    });
    const productOrders = await prisma.productOrders.createMany({
      data: productOrdersData,
    });

    return res.status(200).json({ order: order });

    // await prisma.order.create({data: {

    // }})
  }
}

// model Order {
//     id          String      @id @default(uuid())
//     user        User        @relation(fields: [userId], references: [id])
//     userId      String
//     products    Product[]
//     // shipping info?
//     orderStatus OrderStatus @default(Accepted)
//     totalAmount Float
//     createdAt   DateTime    @default(now())
//   }
