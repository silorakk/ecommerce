import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  if (request.method === "GET") {
    const users = await prisma.user.findMany();
    return res.status(200).json({ data: users });
  }
}
