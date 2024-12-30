import { useState } from "react";
import { useCreateReview } from "@/hooks/tan-stack/useReview";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

interface AddReviewProps {
  businessId: string;
}

const AddReview = ({ businessId }: AddReviewProps) => {
  const { mutate, isLoading } = useCreateReview();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const { isGuest } = useUser();
  console.log(isGuest);

  const handleSubmit = () => {
    if (content && rating > 0) {
      mutate({ businessId, content, rating });
      //form def
      setContent("");
      setRating(0);
    } else {
      alert("Please provide both content and rating.");
    }
  };
  //if guest
  if (isGuest) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">
          Please log in to submit a review
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <h2 className="mb-4 text-xl font-semibold">Add Review</h2>
      <Input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your review here..."
        className="mb-4"
      />
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            onClick={() => setRating(index + 1)}
            className={`w-6 h-6 cursor-pointer ${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
};

export default AddReview;
