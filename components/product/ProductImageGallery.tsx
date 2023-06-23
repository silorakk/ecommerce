import { Product } from "@prisma/client";
import { ImageCarousel } from "../ImageCarousel";

interface Props {
  product: Product | null;
}

export default function ProductImageGallery({ product }: Props) {
  return (
    <>
      <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
        <h2 className="sr-only">Images</h2>
        <ImageCarousel imageUrls={product?.imageUrls ?? []} />
      </div>
    </>
  );
}
