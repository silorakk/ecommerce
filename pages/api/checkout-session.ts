import { LineItem } from '@stripe/stripe-js';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {apiVersion: '2022-11-15'})

interface x {
    f: LineItem
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { cart } = req.body as {cart: {price: string, quantiy: number, tax_rates: string[]}[]};
    
        try {
          const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items: cart,
            mode: 'payment',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/cart`,
            shipping_options: [{shipping_rate: 'shr_1NKMfZBmMPo5yfMZGvrQhi6v'}],
            
          });
          
          return res.status(200).json({id: session.id})
        //   res.redirect(307, session.url ?? '');
        } catch (err) {
          res.status(500).json((err as Error).message);
        }
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }
}
