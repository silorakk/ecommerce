import { StripeProductWithPriceAndQuantity } from "@/types/stripe";

interface Props {
  product: StripeProductWithPriceAndQuantity;
}

export default function ConfirmedProduct({ product }: Props) {
  return (
    <li key={product.id} className="flex space-x-6 py-6">
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
      />
      <div className="flex-auto space-y-1">
        <h3 className="text-gray-900">{product.name}</h3>
        <h3>Qty: {product.quantity}</h3>
      </div>
      <p className="flex-none font-medium text-gray-900">
        £{product.price.toFixed(2)}
      </p>
    </li>
  );
}
