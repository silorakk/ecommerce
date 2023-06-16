import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    if(request.method === 'GET') {
        const products = await prisma.product.findMany()


        return res.status(200).json({data: products})

      

        //   return res.status(422).json({message: "Failed to create a user.", "error": e});
        
        // return res.status(200).json({message: "Successfully created user."});
          
  }
}