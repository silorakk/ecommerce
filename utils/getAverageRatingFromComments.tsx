import { CommentAndUser } from "@/types/prisma";

export const getAverageRatingFromComments = (comments: CommentAndUser[]) => {
  const sum = comments.reduce((acc, curr) => acc + curr.rating, 0);
  const avg = sum / comments.length || 0;
  return avg;
};
