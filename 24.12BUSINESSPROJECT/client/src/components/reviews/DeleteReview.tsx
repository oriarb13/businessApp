import { useDeleteReview } from "@/hooks/tan-stack/useReview";
import { Trash } from "lucide-react";

interface DeleteReviewProps {
  reviewId: string;
}

const DeleteReview = ({ reviewId }: DeleteReviewProps) => {
  const { mutate, isLoading } = useDeleteReview();

  const handleDelete = () => {
    mutate(reviewId);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="text-red-500 hover:text-red-700 disabled:opacity-50"
    >
      {isLoading ? "Deleting..." : <Trash className="w-5 h-5" />}
    </button>
  );
};

export default DeleteReview;
