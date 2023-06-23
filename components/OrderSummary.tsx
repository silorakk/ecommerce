import { Item } from "@/context/cartContext";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

interface Props {
  subTotalPrice: number;
  items: Item[];
  handleCheckout: (items: Item[], userId: string) => Promise<void>;
  userId?: string;
}

export default function OrderSummay({
  subTotalPrice,
  handleCheckout,
  userId,
  items,
}: Props) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">
            £{subTotalPrice.toFixed(2)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex items-center text-sm text-gray-600">
            <span>Shipping estimate</span>
            <a
              href="#"
              className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">
                Learn more about how shipping is calculated
              </span>
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">£5.00</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex text-sm text-gray-600">
            <span>Tax estimate</span>
            <a
              href="#"
              className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">
                Learn more about how tax is calculated
              </span>
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">
            £{(subTotalPrice / 10).toFixed(2)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Order total</dt>
          <dd className="text-base font-medium text-gray-900">
            £{(subTotalPrice + subTotalPrice / 10 + 5).toFixed(2)}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!userId) return alert("Please login or register to checkout");
            handleCheckout(items, userId);
          }}
          type="submit"
          className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Checkout
        </button>
      </div>
    </section>
  );
}
