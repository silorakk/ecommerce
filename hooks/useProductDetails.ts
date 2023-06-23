import { CommentAndUser } from "@/types/prisma";
import { Product } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useProductDetails = () => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<CommentAndUser[]>([]);

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

  return { product, comments };
};
