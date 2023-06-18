import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {apiVersion: '2022-11-15'})


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        
        const body = JSON.parse(req.body) as {name: string, description: string, imageUrls: string[], price: number}
        const stripeProduct = await stripe.products.create({name: body.name, description: body.description, images: body.imageUrls, default_price_data: {currency: 'gbp', unit_amount: body.price * 100}})
        const product = await prisma.product.create({data: {name:body.name, description:body.description, imageUrls:body.imageUrls, price: body.price, stripePriceId: stripeProduct.default_price as string, stripeProductId: stripeProduct.id}})



       

         

        

        return res.status(200).json({data: product})
    }
    
        if(req.method === 'GET') {
            const body = req.query as {id: string}
            const product = await prisma.product.findFirst({where: {
                id: body.id
            }})


            return res.status(200).json({data: product})
        }

        //   return res.status(422).json({message: "Failed to create a user.", "error": e});
        
        // return res.status(200).json({message: "Successfully created user."});
          
  
}