import { CommentAndUser } from "@/types/prisma";
import { classNames } from "@/utils/classnames";
import { getAverageRatingFromComments } from "@/utils/getAverageRatingFromComments";
import { StarIcon } from "@heroicons/react/20/solid";

interface Props {
  comments: CommentAndUser[];
  handleScrollToReviews: () => void;
}

export default function ProductReviews({
  comments,
  handleScrollToReviews,
}: Props) {
  const averageRating = getAverageRatingFromComments(comments);
  return (
    <div>
      <h2 className="sr-only">Reviews</h2>
      <div className="flex items-center">
        <p className="text-sm text-gray-700">
          {comments.length === 0 || averageRating === 0 ? (
            <span>No reviews yet</span>
          ) : (
            <span>{averageRating}</span>
          )}
        </p>
        <div className="ml-1 flex items-center">
          {[...Array(averageRating)].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                averageRating !== 0 ? "text-yellow-400" : "text-gray-200",
                "h-5 w-5 flex-shrink-0"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
          ·
        </div>
        {comments.length !== 0 && averageRating !== 0 && (
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
  );
}
