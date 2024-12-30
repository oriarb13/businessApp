import { useReviewsByBusinessId } from "@/hooks/tan-stack/useReview";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IReview } from "@/types/Type";
import OneReview from "./OneReview";
import AddReview from "./AddReview";
import { AxiosError } from "axios";

interface AllReviewsProps {
  id: string;
}

const AllReviews = ({ id }: AllReviewsProps) => {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useReviewsByBusinessId(id);

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (isError) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return (
        <div className="p-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Show Reviews</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="w-full max-w-sm mx-auto">
                <DrawerHeader>
                  <DrawerTitle>Reviews:</DrawerTitle>
                  <DrawerDescription>No reviews available.</DrawerDescription>
                </DrawerHeader>
              </div>
              <div className="p-4 pb-0">
                <DrawerFooter>
                  <AddReview businessId={id} />
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      );
    } else {
      return <div>Error loading reviews. Please try again later.</div>;
    }
  }

  return (
    <div className="p-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Show Reviews</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full max-w-sm mx-auto">
            <DrawerHeader>
              <DrawerTitle>Reviews:</DrawerTitle>
              <DrawerDescription>
                There {reviews?.length === 1 ? "is" : "are"} {reviews?.length}{" "}
                review{reviews?.length === 1 ? "" : "s"} right now
              </DrawerDescription>
            </DrawerHeader>
          </div>
          <div className="p-4 pb-0">
            <DrawerFooter>
              <div className="p-4 max-h-[53vh] overflow-y-auto">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review: IReview) => (
                    <OneReview review={review} key={review._id} />
                  ))
                ) : (
                  <div>No reviews yet.</div>
                )}
              </div>
              <AddReview businessId={id} />

              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AllReviews;
