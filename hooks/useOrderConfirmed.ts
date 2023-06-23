import { CartContext, CartContextType } from "@/context/cartContext";
import { StripeProductWithPriceAndQuantity } from "@/types/stripe";
import { Order } from "@prisma/client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Stripe from "stripe";

export const useOrderConfirmed = (user_id?: string, session_id?: string) => {
  const [session, setSession] = useState<Stripe.Checkout.Session | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [products, setProducts] = useState<StripeProductWithPriceAndQuantity[]>(
    []
  );
  const { clearCart } = useContext(CartContext) as CartContextType;

  useEffect(() => {
    if (session_id && user_id) {
      const getSession = async () => {
        const res: { data: Stripe.Checkout.Session } = await axios.get(
          `/api/checkout-sessions/${session_id}`
        );
        setSession(res.data);
        const stripeProducts = res.data.line_items?.data.map((lineItem) => {
          if (lineItem.price?.product) {
            return {
              ...(lineItem.price.product as Stripe.Product),
              price: lineItem.price.unit_amount
                ? lineItem.price.unit_amount / 100
                : 0,
              quantity: lineItem.quantity,
            };
          }
        }) as StripeProductWithPriceAndQuantity[];
        setProducts(stripeProducts);
        clearCart();

        // add Order
        const orderRes: { data: { order: Order } } = await axios.post(
          "/api/order",
          {
            stripeProductIdsAndQuantity: stripeProducts.map((product) => {
              return { id: product.id, quantity: product.quantity };
            }),
            totalPrice: res.data.amount_total ?? 0 / 100,
            userId: user_id,
          }
        );
        setOrderId(orderRes.data.order.id);
      };
      getSession();
    }
  }, [session_id]);

  return { session, orderId, products };
};
