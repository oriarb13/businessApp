import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { useCreateBusiness } from "@/hooks/tan-stack/useBuisnesses";
import { useUserByUsername } from "@/hooks/tan-stack/useUsers";
import React, { useState } from "react";

const NewBusiness = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const { mutate: createBusiness, isLoading } = useCreateBusiness();
  const { user: contextUser } = useUser();
  const { data, isError, error } = useUserByUsername(contextUser?.username);

  const fetchedUser = data?.data;
  const numOfBusinesses = fetchedUser?.ownBusinesses.length;
  const userPlan = fetchedUser.plan;

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (isError) {
    return (
      <div>
        {error instanceof Error ? error.message : "Failed to fetch user data."}
      </div>
    );
  }

  if (!fetchedUser) {
    return <div>User not found. Please log in.</div>;
  }

  const isLimitReached = () => {
    if (userPlan === "Standard" && numOfBusinesses >= 1) return true;
    if (userPlan === "Gold" && numOfBusinesses >= 3) return true;
    if (userPlan === "Platinum" && numOfBusinesses >= 10) return true;
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLimitReached()) {
      alert(
        "According to your plan, you have reached the business limit. Please upgrade your plan to add more businesses."
      );
      return;
    }

    const newBusiness = { name, description, category, img };

    createBusiness(newBusiness, {
      onSuccess: () => {},
      onError: (error: Error) => {
        console.error("Error creating business", error);
      },
    });
  };

  return (
    <div className="max-w-md p-6 mx-auto text-gray-700 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Create a New Business</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium ">
            Business Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <Input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <Input
            id="img"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Business"}
        </Button>
      </form>
    </div>
  );
};

export default NewBusiness;
