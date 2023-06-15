import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    if(request.method === 'POST') {

        const body: {name: string, email: string, password: string} = request.body as any;

        // creating a new user
        const { name, email, password } = body;
        try {

          const result = await prisma.user.create({
            data: {
              name,
              email,
              password
            },
          });
        } catch(e) {
          return res.status(422).json({message: "Failed to create a user.", "error": e});
        }
        return res.status(200).json({message: "Successfully created user."});
          
  }
}