import OrderSummay from "@/components/OrderSummary";
import CartProduct from "@/components/cart/CartProduct";
import { CartContext, CartContextType } from "@/context/cartContext";
import { handleCheckout } from "@/lib/stripe/handleCheckout";
import { LineItem } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";

interface Props {
  cart: LineItem[];
}

export default function Cart() {
  const { items, updateQuantity, removeItem, subTotalPrice } = useContext(
    CartContext
  ) as CartContextType;

  const { data: session } = useSession();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 mt-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            {items.length !== 0 ? (
              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {items.map((item, productIdx) => (
                  <CartProduct
                    key={item.product.id}
                    item={item}
                    index={productIdx}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </ul>
            ) : (
              <>
                <span>Your shopping cart is empty.</span>{" "}
                <Link className="text-blue-600" href="/">
                  Click here to browse products
                </Link>
              </>
            )}
          </section>
          <OrderSummay
            userId={session?.user.id}
            items={items}
            subTotalPrice={subTotalPrice}
            handleCheckout={handleCheckout}
          />
        </form>
      </div>
    </div>
  );
}
