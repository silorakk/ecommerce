import { Product } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const [imgUrl, setImgUrl] = useState(product.imageUrls[0]);
  return (
    <div
      onMouseEnter={() =>
        setImgUrl(product.imageUrls[1] ?? product.imageUrls[0])
      }
      onMouseLeave={() => setImgUrl(product.imageUrls[0])}
      onTouchStart={() =>
        setImgUrl(product.imageUrls[1] ?? product.imageUrls[0])
      }
      onTouchEnd={() => setImgUrl(product.imageUrls[0])}
      className="group relative"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={imgUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">£{product.price}</p>
      </div>
    </div>
  );
}
