import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserByUsername, updateUser, deleteUser, changePlan } from "@/API/userAPI";
import { useState } from "react";

// Fetch user by username
export const useUserByUsername = (username: string) => {
  return useQuery<any, Error>({
    queryKey: ["user", username],
    queryFn: () => getUserByUsername(username),
    enabled: !!username,
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (updatedUser: {
      username: string;
      email: string;
      image?: string;
    }) => {
      setIsLoading(true);
      await updateUser(updatedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error updating user:", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};

// Change plan
export const useChangePlan = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (newPlan: "Standard" | "Gold" | "Platinum") => {
      setIsLoading(true);
      await changePlan(newPlan); // call the changePlan function from API
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // invalidate user-related queries if needed
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error changing plan:", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};
// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      await deleteUser();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error deleting user:", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};
