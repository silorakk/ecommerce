import { classNames } from "@/utils/classNames";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/20/solid";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ProductSkeleton } from "./product/ProductSkeleton";

interface Props {
  imageUrls: string[];
}

export const ImageCarousel = ({ imageUrls }: Props) => {
  return imageUrls.length === 0 ? (
    <ProductSkeleton />
  ) : (
    <Carousel
      swipeScrollTolerance={30}
      renderArrowNext={(clickHandler, hasNext) => {
        return (
          <div
            className={`${
              hasNext ? "absolute" : "hidden"
            } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
            onClick={clickHandler}
          >
            <ArrowRightCircleIcon className="w-9 h-9 text-white" />
          </div>
        );
      }}
      renderArrowPrev={(clickHandler, hasPrev) => {
        return (
          <div
            className={`${
              hasPrev ? "absolute" : "hidden"
            } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
            onClick={clickHandler}
          >
            <ArrowLeftCircleIcon className="w-9 h-9 text-white" />
          </div>
        );
      }}
    >
      {imageUrls.map((url) => (
        <div key={url}>
          <img
            src={url}
            alt={url}
            className={classNames(
              imageUrls[0] === url
                ? "lg:col-span-2 lg:row-span-2"
                : "hidden lg:block",
              "rounded-lg"
            )}
          />
        </div>
      ))}
    </Carousel>
  );
};
