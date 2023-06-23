import { CommentAndUser } from "@/types/prisma";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from "react";
import AddProductComment from "../AddProductComment";

interface Props {
  session: Session | null;
  comments: CommentAndUser[];
  commentMessage: string;
  updateCommentMessage: (newMessage: string) => void;
  handleAddComment: (
    e: FormEvent<HTMLFormElement>,
    rating: number
  ) => Promise<void>;
}

export const ProductAddReviewSection = ({
  session,
  commentMessage,
  comments,
  updateCommentMessage,
  handleAddComment,
}: Props) => {
  return session?.user ? (
    comments.find((comment) => comment.userId === session.user.id) ===
    undefined ? (
      <AddProductComment
        name={session.user.name}
        message={commentMessage}
        updateMessage={updateCommentMessage}
        onSubmit={handleAddComment}
      />
    ) : (
      <span>Thank you for leaving feedback on this product.</span>
    )
  ) : (
    <p className="text-center text-sm leading-6 text-gray-500">
      You need to be logged in to leave a review.{" "}
      <Link
        href="#"
        onClick={() => signIn()}
        className="font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Click here to login
      </Link>
    </p>
  );
};
