

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15",
  });
  

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) { 

    const body = req.query as {ids: string[]}

    if(req.method === 'GET') {
        const products = await stripe.products.list({ids: body.ids});


        res.status(200).json({products: products})
    }
  }
