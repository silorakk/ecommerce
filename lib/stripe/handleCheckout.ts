import { Item } from "@/context/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const convertItemstoStripeLineItems = (items: Item[]) => {
  return items.map((item) => {
    return {
      price: item.product.stripePriceId,
      quantity: item.quantity,
      tax_rates: ["txr_1NKMhXBmMPo5yfMZ05BpPYr6"],
    };
  });
};

export const handleCheckout = async (items: Item[], userId?: string) => {
  if (!userId) return;
  const cart = convertItemstoStripeLineItems(items);
  try {
    const stripe = await stripePromise;

    const checkoutSession: { data: { id: string } } = await axios.post(
      "/api/checkout-session",
      {
        cart,
        userId,
      }
    );

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) {
      alert(result.error.message);
    }
  } catch (error) {
    console.log(error);
  }
};
