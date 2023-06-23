import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { productId } = req.query as { productId: string };

    const comments = await prisma.comment.findMany({
      where: {
        productId: productId,
      },
      include: { user: true },
    });

    return res.status(200).json({ comments: comments });
  }
}
