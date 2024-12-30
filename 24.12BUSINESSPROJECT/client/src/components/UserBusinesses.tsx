import React from "react";
import { useBusinessesOfOwner } from "../hooks/tan-stack/useBuisnesses";
import Businesses from "@/components/Businesses";

interface UserBusinessesProps {
  userId: string;
}

const UserBusinesses: React.FC<UserBusinessesProps> = ({ userId }) => {
  const {
    data: businesses,
    isLoading,
    isError,
    error,
  } = useBusinessesOfOwner(userId);

  if (isLoading) {
    return <div>Loading businesses...</div>;
  }

  if (isError) {
    return (
      <div>
        {error instanceof Error
          ? error.message
          : "Failed to fetch businesses. Please try again later."}
      </div>
    );
  }

  if (!businesses || businesses.length === 0) {
    return <div>No businesses found for this user.</div>;
  }
  console.log(businesses.data);

  return (
    <div className="p-4">
      <Businesses businesses={businesses.data} />
    </div>
  );
};

export default UserBusinesses;
