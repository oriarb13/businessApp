import React, { useState } from "react";
import {
  useAddBusinessToFav,
  useRemoveBusinessFromFav,
} from "../hooks/tan-stack/useBuisnesses";
import { useUser } from "@/context/UserContext";
import { useBusiness } from "@/hooks/tan-stack/useBuisnesses";
import { IBusiness } from "@/types/Type";
interface FavoriteButtonProps {
  business: IBusiness;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ business }) => {
  const businessId = business._id || "";
  console.log(businessId);

  const { user, setUser } = useUser();
  const { refetch } = useBusiness(businessId);
  console.log(user?._id);
  console.log(business);

  const isFavorited =
    business?.subscribers?.some((subscriber) => {
      if (typeof subscriber === "string") {
        return false;
      }
      return subscriber._id === user?._id;
    }) || false;
  console.log(isFavorited);

  const [favorited, setFavorited] = useState<boolean>(isFavorited);

  const { mutate: addFavorite, isLoading: addingFavorite } =
    useAddBusinessToFav();
  const { mutate: removeFavorite, isLoading: removingFavorite } =
    useRemoveBusinessFromFav();

  const handleFavoriteToggle = () => {
    if (favorited) {
      removeFavorite(businessId, {
        onSuccess: () => {
          setFavorited(false);
          refetch();
        },
      });

      setUser({
        _id: user?._id || "",
        username: user?.username || "",
        email: user?.email || "",
        password: user?.password || "",
        image: user?.image || "",
        plan: user?.plan || "Standard",
        ownBusinesses: user?.ownBusinesses || [],
        savedBusinesses: (user?.savedBusinesses || []).filter(
          (id) => id !== businessId
        ),
      });
    } else {
      addFavorite(businessId, {
        onSuccess: () => {
          setFavorited(true);
          refetch();
        },
      });

      setUser({
        _id: user?._id || "",
        username: user?.username || "",
        email: user?.email || "",
        password: user?.password || "",
        image: user?.image || "",
        plan: user?.plan || "Standard",
        ownBusinesses: user?.ownBusinesses || [],
        savedBusinesses: [...(user?.savedBusinesses || []), businessId],
      });
    }
  };

  return (
    <button
      onClick={handleFavoriteToggle}
      disabled={addingFavorite || removingFavorite}
      className={`p-2 rounded-lg ${favorited ? "bg-red-500" : "bg-gray-300"} ${
        addingFavorite || removingFavorite
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-md"
      }`}
    >
      {addingFavorite || removingFavorite
        ? "Loading..."
        : favorited
        ? "Unfavorite"
        : "Favorite"}
    </button>
  );
};

export default FavoriteButton;
