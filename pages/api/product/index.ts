import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const body = JSON.parse(req.body) as {name: string, description: string, imageUrls: string[], price: number}
        const product = await prisma.product.create({data: {name:body.name, description:body.description, imageUrls:body.imageUrls, price: body.price}})


        return res.status(200).json({data: product})
    }
    
        if(req.method === 'GET') {
            console.log(req.query)
            const body = req.query as {id: string}
            const product = await prisma.product.findFirst({where: {
                id: body.id
            }})


            return res.status(200).json({data: product})
        }

        //   return res.status(422).json({message: "Failed to create a user.", "error": e});
        
        // return res.status(200).json({message: "Successfully created user."});
          
  
}