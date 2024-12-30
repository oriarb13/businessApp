import { IReview } from "@/types/Type";
import { Star } from "lucide-react";
import { format } from "date-fns";
import User from "../User";
import { useNavigate } from "react-router-dom";
import DeleteReview from "./DeleteReview";
import { useUser } from "@/context/UserContext";

const OneReview = ({ review }: { review: IReview }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  // nav user
  const handleOwner = () => {
    navigate(`/user/${review?.userId?.username}`);
  };

  // owner?
  const isOwner = user?.username === review?.userId?.username;
  const userImage =
    review?.userId?.image ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="relative p-4 border border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <div onClick={handleOwner} className="cursor-pointer">
          <User image={userImage} name={review?.userId?.username} />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            <div>
              <div>{format(new Date(review.createdAt), "dd MMM yyyy")}</div>
              <div>{format(new Date(review.createdAt), "hh:mm")}</div>
            </div>{" "}
          </span>

          <div className="flex items-center space-x-1">
            {isOwner && (
              <div className="absolute top-2 right-2">
                <DeleteReview reviewId={review._id} />
              </div>
            )}

            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 text-gray-700 dark:text-white">{review.content}</div>
    </div>
  );
};

export default OneReview;
