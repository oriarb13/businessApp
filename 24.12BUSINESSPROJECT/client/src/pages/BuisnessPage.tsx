import { useTheme } from "@/components/theme-provider";
import { useParams, useNavigate } from "react-router-dom";
import { useBusiness } from "@/hooks/tan-stack/useBuisnesses";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import User from "@/components/User";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import List from "@/components/List";
import FavoriteButton from "@/components/FavoriteBtn";
import { useUser } from "@/context/UserContext";
import AllReviews from "@/components/reviews/AllReviews";
import Avg from "@/components/reviews/Avg";
import EditBusinessDialog from "@/components/EditBusiness";
import useSocketNotifications from "@/hooks/socket";

const BusinessPage = () => {
  const { theme } = useTheme();
  const [bgImage, setBgImage] = useState<string>("");
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    if (theme === "dark") {
      setBgImage(
        "url('https://img.freepik.com/premium-photo/mild-blue-abstract-creative-background-design_851755-178302.jpg?ga=GA1.1.1809817097.1735232464&semt=ais_hybrid')"
      );
    } else {
      setBgImage(
        "url('https://img.freepik.com/free-photo/blue-toned-collection-aligned-paper-sheets_23-2148320449.jpg?semt=ais_hybrid')"
      );
    }
  }, [theme]);

  const { id } = useParams();
  useSocketNotifications(id);

  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  const handleOwner = () => {
    navigate(`/user/${business.owner.username}`);
  };

  const { data, isLoading, isError } = useBusiness(id || "");
  const business = data?.data;

  if (isLoading)
    return (
      <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin"></div>
    );

  if (isError)
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={closeModal}
      >
        <div
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-center text-red-500">
            Error fetching business details.
          </h2>
          <button
            onClick={closeModal}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );

  if (!data?.data)
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={closeModal}
      >
        <div
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-center text-red-500">
            Business not found
          </h2>
          <button
            onClick={closeModal}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="w-[90%] h-[98%] p-6 rounded-s shadow-lg relative"
        style={{
          backgroundImage: bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={closeModal}
          className="absolute px-2 rounded-md top-12 right-4"
        >
          X
        </Button>
        <h1
          className="mt-7 text-[40px] font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 
          dark:from-blue-500 dark:via-blue-400 dark:to-blue-300"
        >
          {business.name}
        </h1>
        <div className="flex flex-col space-y-3 md:flex-row md:justify-center md:space-x-24 md:space-y-0">
          <Avg id={business._id} />
          <List data={business.subscribers} />
          {user?._id && <FavoriteButton business={business} />}
          {user?._id && <EditBusinessDialog business={business} />}
        </div>
        <img
          src={business.img}
          alt={business._id}
          className="block mx-auto rounded-lg w-full h-auto object-cover max-h-[500px] max-w-[700px]"
        />{" "}
        <div
          onClick={handleOwner}
          className="flex items-center justify-center cursor-pointer"
        >
          <h1 className="mr-2 text-xl">owner:</h1>
          <User name={business.owner.username} image={business.owner.image} />
        </div>
        <div className="flex justify-center">
          <Badge>Category: {business.category}</Badge>
          <Badge variant={"secondary"}>
            since: {new Date(business.createdAt).toLocaleDateString("en-GB")}
          </Badge>{" "}
        </div>
        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black bg-[hsl(var(--dark-blue))] dark:bg-[hsl(var(--dark-accent))] text-[hsl(var(--primary-foreground))]">
              Description:
            </AccordionTrigger>
            <AccordionContent className="bg-[hsl(var(--dark-gray))] dark:bg-[hsl(var(--dark-bg))] text-[hsl(var(--secondary-foreground))] dark:text-[hsl(var(--dark-text))]">
              {business.description}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <AllReviews id={business._id} />
      </div>
    </div>
  );
};

export default BusinessPage;
