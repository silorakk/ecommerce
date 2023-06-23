/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
    ],
  }
  ```
*/
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { CartContext, CartContextType } from "@/context/cartContext";
import AddProductComment from "@/components/AddProductComment";
import { useSession } from "next-auth/react";
import axios from "axios";
import ProductComment from "@/components/ProductComment";
import { CommentAndUser } from "@/types/prisma";
import ReviewSectionTitle from "@/components/ReviewSectionTitle";

const policies = [
  {
    name: "International delivery",
    icon: GlobeAmericasIcon,
    description: "Get your order in 2 years",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [product, setProduct] = useState<Product | null>(null);
  const [commentMessage, setCommentMessage] = useState("");
  const reviewsRef = useRef<null | HTMLDivElement>(null);
  const [comments, setComments] = useState<CommentAndUser[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const { addItem, items } = useContext(CartContext) as CartContextType;

  const itemInCart = items.some((item) => item.product.id === product?.id);
  const handleAddToCart = (product: Product | null) => {
    if (product) addItem({ product: product, quantity: 1 });
  };

  const handleScrollToReviews = () => {
    reviewsRef.current?.scrollIntoView();
  };

  const getAverageRating = () => {
    const sum = comments.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = sum / comments.length || 0;
    return avg;
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
  useEffect(() => {
    if (!router.isReady) return;

    const fetchProductDetails = async () => {
      const data = await fetch(`/api/product?id=${router.query.slug}`);
      const json = await data.json();
      setProduct(json.data);
    };
    const fetchComments = async () => {
      const res: { data: { comments: CommentAndUser[] } } = await axios.get(
        `/api/comments?productId=${router.query.slug}`
      );
      setComments(res.data.comments);
    };
    fetchProductDetails();
    fetchComments();
  }, [router.isReady, router.query.slug]);

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
                  £{product?.price}
                </p>
              </div>
              {/* Reviews */}
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {comments.length === 0 || getAverageRating() === 0 ? (
                      <span>No reviews yet</span>
                    ) : (
                      getAverageRating()
                    )}
                  </p>
                  <div className="ml-1 flex items-center">
                    {[...Array(getAverageRating())].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          getAverageRating() !== 0
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div
                    aria-hidden="true"
                    className="ml-4 text-sm text-gray-300"
                  >
                    ·
                  </div>
                  {comments.length !== 0 && getAverageRating() !== 0 && (
                    <div className="ml-4 flex">
                      <a
                        onClick={handleScrollToReviews}
                        className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        See all {comments.length} reviews
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image gallery */}
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

            <div className="mt-8 lg:col-span-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
              >
                <button
                  type="submit"
                  disabled={itemInCart}
                  className="disabled:cursor-not-allowed disabled:bg-gray-400 mt-8flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {itemInCart ? "Already in cart" : "Add to cart"}
                </button>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <p>{product?.description}</p>
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="mt-4 text-sm font-medium text-gray-900">
                          {policy.name}
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
          <section ref={reviewsRef}>
            <ReviewSectionTitle />
          </section>
          {comments.map((comment) => (
            <ProductComment
              key={comment.id}
              userName={comment.user.name}
              rating={comment.rating}
              message={comment.message}
            />
          ))}
          <br />
          {session?.user &&
            (comments.find((comment) => comment.userId === session.user.id) ===
            undefined ? (
              <AddProductComment
                name={session.user.name}
                message={commentMessage}
                updateMessage={updateCommentMessage}
                onSubmit={handleAddComment}
              />
            ) : (
              <span>Thank you for leaving feedback on this product.</span>
            ))}
        </div>
      </div>
    </div>
  );
}
