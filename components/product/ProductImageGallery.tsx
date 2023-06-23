import { classNames } from "@/utils/classnames";
import { Product } from "@prisma/client";

interface Props {
  product: Product | null;
}

export default function ProductImageGallery({ product }: Props) {
  return (
    <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
      <h2 className="sr-only">Images</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
        {product?.imageUrls.map((url) => (
          <img
            key={url}
            src={url}
            alt={url}
            className={classNames(
              product?.imageUrls[0] === url
                ? "lg:col-span-2 lg:row-span-2"
                : "hidden lg:block",
              "rounded-lg"
            )}
          />
        ))}
      </div>
    </div>
  );
}
