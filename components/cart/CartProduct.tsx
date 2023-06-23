import { Item } from "@/context/cartContext";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import ProductQuantitySelector from "../product/ProductQuantitySelector";

interface Props {
  item: Item;
  index: number;
  updateQuantity: (item: Item, newQuantity: number) => void;
  removeItem: (item: Item) => void;
}

export default function CartProduct({
  item,
  index,
  updateQuantity,
  removeItem,
}: Props) {
  return (
    <li key={item.product.id} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <img
          src={item.product.imageUrls[0]}
          alt={item.product.name}
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <Link
                  href={`/product/${item.product.id}`}
                  className="text-gray-700 font-bold hover:text-gray-800"
                >
                  {item.product.name}
                </Link>
              </h3>
            </div>

            <p className="mt-1 text-sm font-medium text-gray-900">
              £{((item.product.price ?? 0) * item.quantity).toFixed(2)}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <ProductQuantitySelector
              index={index}
              item={item}
              updateQuantity={updateQuantity}
            />
            <div className="absolute right-0 top-0">
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
          <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
          <span>In Stock</span>
        </p>
      </div>
    </li>
  );
}
