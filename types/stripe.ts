import Stripe from "stripe";

export type StripeProductWithPriceAndQuantity = Stripe.Product & {
  price: number;
  quantity: number;
};
