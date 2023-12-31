import CustomerReviewSummary from "@/components/product/CustomerReviewsSummary";
import { ProductAddReviewSection } from "@/components/product/ProductAddReviewSection";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import { ProductPolicySection } from "@/components/product/ProductPolicySection";
import ProductReviews from "@/components/product/ProductReviews";
import { CartContext, CartContextType, Item } from "@/context/cartContext";
import { useProductDetails } from "@/hooks/useProductDetails";
import { CommentAndUser } from "@/types/prisma";
import { getAverageRatingFromComments } from "@/utils/getAverageRatingFromComments";
import { Product } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FormEvent, useContext, useRef, useState } from "react";

const isItemInCart = (items: Item[], productId: string) =>
  items.some((item) => item.product.id === productId);

const getReviewCounts = (comments: CommentAndUser[]) => {
  return [5, 4, 3, 2, 1, 0].map((rating) => {
    return {
      rating: rating,
      count: comments.filter((comment) => comment.rating === rating).length,
    };
  });
};

export default function Example() {
  const { product, comments } = useProductDetails();
  const [commentMessage, setCommentMessage] = useState("");
  const reviewsRef = useRef<null | HTMLDivElement>(null);
  const { data: session } = useSession();
  const { addItem, items } = useContext(CartContext) as CartContextType;

  const handleAddToCart = (
    e: FormEvent<HTMLFormElement>,
    product: Product | null
  ) => {
    e.preventDefault();
    if (product) addItem({ product: product, quantity: 1 });
  };

  const handleScrollToReviews = () => {
    reviewsRef.current?.scrollIntoView();
  };

  const handleAddComment = async (
    e: FormEvent<HTMLFormElement>,
    rating: number
  ) => {
    if (!session?.user.id || !product?.id) return;
    const res = await axios.post("/api/comment", {
      message: commentMessage,
      rating: rating,
      userId: session?.user.id,
      productId: product?.id,
    });
  };

  const updateCommentMessage = (newMessage: string) =>
    setCommentMessage(newMessage);

  const averageRating = Math.round(getAverageRatingFromComments(comments));
  console.log(getReviewCounts(comments));
  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <ol role="list" className="flex items-center space-x-4">
            <li className="text-sm">
              <a
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product?.name}
              </a>
            </li>
          </ol>
        </nav>
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {product?.name}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  £{product?.price?.toFixed(2)}
                </p>
              </div>
              {/* Reviews */}
              <ProductReviews
                comments={comments}
                handleScrollToReviews={handleScrollToReviews}
              />
            </div>

            <ProductImageGallery product={product} />

            <div className="mt-8 lg:col-span-5">
              <form onSubmit={(e) => handleAddToCart(e, product)}>
                <button
                  type="submit"
                  disabled={isItemInCart(items, product?.id ?? "")}
                  className="disabled:cursor-not-allowed disabled:bg-gray-400 mt-8flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isItemInCart(items, product?.id ?? "")
                    ? "Already in cart"
                    : "Add to cart"}
                </button>
              </form>

              {/* Product details */}
              <div className="my-10">
                <h2 className="text-sm font-bold text-gray-900">Description</h2>

                <p>{product?.description}</p>
              </div>

              <ProductPolicySection />
            </div>
          </div>
          <CustomerReviewSummary
            reviewsRef={reviewsRef}
            average={averageRating}
            reviewCountsPerStar={getReviewCounts(comments)}
            comments={comments}
          />
          <br />
          <ProductAddReviewSection
            session={session}
            comments={comments}
            commentMessage={commentMessage}
            updateCommentMessage={updateCommentMessage}
            handleAddComment={handleAddComment}
          />
        </div>
      </div>
    </div>
  );
}
