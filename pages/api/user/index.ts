import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    if(request.method === 'POST') {

        const body: {name: string, email: string, password: string, role?: UserRole} = request.body as any;

        console.log(body)

        // creating a new user
        const { name, email, password, role } = body;
        const userRole = role ?? 'USER'
        let user;
        try {

          user = await prisma.user.create({
            data: {
              name,
              email,
              password,
              role: userRole
            },
          });
        } catch(e) {
          return res.status(422).json({message: "Failed to create a user.", "error": e});
        }
        return res.status(200).json({message: "Successfully created user.", user: user});
          
  }
}