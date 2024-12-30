import { useBusiness } from "@/hooks/tan-stack/useBuisnesses";
import { useUserByUsername } from "@/hooks/tan-stack/useUsers";
import React, { useState } from "react";
import User from "@/components/User";
import OneBusiness from "@/components/OneBusiness";

const SearchPage = () => {
  const [isBusiness, setIsBusiness] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const { data: businessData } = useBusiness(searchValue);
  const { data: userData } = useUserByUsername(searchValue);

  const handleToggle = () => {
    setIsBusiness((prev) => !prev);
    setSearchValue("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  //   console.log(userData.data);

  return (
    <div className="p-4">
      <button
        onClick={handleToggle}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
      >
        Toggle to {isBusiness ? "User" : "Business"}
      </button>

      <div className="mb-4">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={`Search by ${isBusiness ? "Business ID" : "Username"}`}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <h2 className="mb-2 text-lg font-bold">
          {isBusiness ? "Business Details" : "User Details"}
        </h2>

        {isBusiness ? (
          businessData ? (
            <div>
              <OneBusiness business={businessData.data} />
            </div>
          ) : (
            <p>No business found or searching...</p>
          )
        ) : userData ? (
          <div>
            <User image={userData.data.image} name={userData.data.username} />
          </div>
        ) : (
          <p>No user found or searching...</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
