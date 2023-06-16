import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const body = JSON.parse(req.body) as {name: string, description: string, imageUrl: string}
        console.log(body)
        const x = {data: {name:body.name, description:body.description, imageUrl:body.imageUrl}};
        console.log('x', x)
        const product = await prisma.product.create({data: {name:body.name, description:body.description, imageUrl:body.imageUrl}})


        return res.status(200).json({data: product})

      

        //   return res.status(422).json({message: "Failed to create a user.", "error": e});
        
        // return res.status(200).json({message: "Successfully created user."});
          
  }
}