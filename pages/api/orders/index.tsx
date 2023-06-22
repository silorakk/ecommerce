import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log(req.query);
    const { userId } = req.query as {
      userId: string;
    };

    console.log(req.body);

    if (userId) {
      const userOrders = await prisma.order.findMany({
        where: {
          userId: userId,
        },
        include: { ProductOrders: { include: { product: true } } },
      });

      return res.status(200).json({ orders: userOrders });
    }

    // if (orderIds) {
    //   const orders = await prisma.order.findMany({
    //     where: {
    //       id: { in: ["123"] },
    //     },
    //   });

    //   console.log("hello2", orders);
    //   return res.status(200).json({ orders: orders });
    // }

    return res.status(500).json({ message: "Failed to retrieve orders" });
  }
}
