import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body as {
      message: string;
      rating: number;
      userId: string;
      productId: string;
    };

    const deliveredOrders = await prisma.order.findMany({
      where: {
        userId: body.userId,
        orderStatus: "Delivered",
      },
      include: { ProductOrders: true },
    });

    const productInDeliveredOrders = deliveredOrders.some(
      (order) =>
        order.ProductOrders.find(
          (product) => product.productId === body.productId
        ) !== undefined
    );

    const comment = await prisma.comment.create({
      data: {
        message: body.message,
        rating: body.rating,
        verified: productInDeliveredOrders,
        userId: body.userId,
        productId: body.productId,
      },
    });

    return res.status(200).json({ message: "Successfully created a comment." });
  }
}
