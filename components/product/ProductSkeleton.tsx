import { PhotoIcon } from "@heroicons/react/20/solid";

export const ProductSkeleton = () => {
  return (
    <div role="status" className="h-[50rem]">
      <div className="flex items-center animate-pulse justify-center h-full bg-gray-100 rounded-lg">
        <PhotoIcon className="w-24 h-24 text-gray-400 rounded sm:w-96" />
      </div>
    </div>
  );
};
