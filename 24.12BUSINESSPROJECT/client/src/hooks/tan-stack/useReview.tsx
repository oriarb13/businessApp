import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchReviewsByBusinessId,
  createReview,
  deleteReview,
} from "@/API/reviewAPI";
import { IReview } from "@/types/Type";
import { useState } from "react";

// Fetch reviews by business ID
export const useReviewsByBusinessId = (businessId: string) => {
  return useQuery<IReview[], Error>({
    queryKey: ["reviews", businessId],
    queryFn: () => fetchReviewsByBusinessId(businessId),
    enabled: !!businessId,
  });
};

// Create a review
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (newReview: {
      businessId: string;
      content: string;
      rating: number;
    }) => {
      setIsLoading(true);
      await createReview(
        newReview.businessId,
        newReview.content,
        newReview.rating
      );
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.businessId],
      });
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error creating review:", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};

// Delete a review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (reviewId: string) => {
      setIsLoading(true);
      await deleteReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error deleting review:", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};
