// @ts-ignore
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { buffer } from "micro";
import getRawBody from "raw-body";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let event;
    const reqBuffer = await getRawBody(req);
    try {
      const signature = req.headers["stripe-signature"] ?? "";

      console.log("yooy");
      console.log("test", process.env.STRIPE_WEBHOOK_SECRET ?? "");
      event = stripe.webhooks.constructEvent(
        reqBuffer,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET ?? ""
      );
    } catch (err) {
      console.log(err);
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    if (event?.type === "product.created") {
      const object = event.data.object as unknown as Stripe.Product;
      const product = await stripe.products.retrieve(object.id);

      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description ?? "",
          imageUrls: product.images,
          stripeProductId: product.id,
        },
      });
    }
    if (event?.type === "price.created") {
      const object = event.data.object as unknown as Stripe.Price;
      const updatedProduct = await prisma.product.updateMany({
        where: {
          stripeProductId: object.product as string,
        },
        data: {
          price: (object.unit_amount ?? 0) / 100,
          stripePriceId: object.id,
        },
      });
    }
    return res.json({ received: true });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
