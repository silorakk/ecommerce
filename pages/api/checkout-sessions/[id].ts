import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15",
  });
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const id = req.query.id as string;

    try {
        if(!id.startsWith('cs_')) throw Error("Incorrect checkoutSession ID.")

        const checkoutSession = await stripe.checkout.sessions.retrieve(id, {expand: ['payment_intent', 'line_items.data.price.product']});

        res.status(200).json(checkoutSession);
    } catch(err) {
        res.status(500).json({statusCode: 500, message: (err as Error).message})
    }

  }