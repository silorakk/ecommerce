import { LineItem, loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

interface Props {
  cart: LineItem[];
}

export default function Checkout({ cart }: Props) {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const checkoutSession: { data: { id: string } } = await axios.post(
        "/api/checkout-session",
        {
          cart: cart,
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
  return <div></div>;
}
