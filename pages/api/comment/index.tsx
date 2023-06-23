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
      isVerified: boolean;
      userId: string;
      productId: string;
    };

    const comment = await prisma.comment.create({
      data: {
        message: body.message,
        rating: body.rating,
        verified: body.isVerified,
        userId: body.userId,
        productId: body.productId,
      },
    });

    return res.status(200).json({ message: "Successfully created a comment." });
  }
}
