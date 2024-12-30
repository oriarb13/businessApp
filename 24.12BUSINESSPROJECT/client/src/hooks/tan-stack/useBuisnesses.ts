import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllBusinesses,
  getBusinessById,
  addBusinessToFavorites,
  removeBusinessFromFavorites,
  deleteBusiness,
  editBusiness,
  createBusiness,
  getBusinessesOfOwner,
} from "@/API/businessAPI";
import { IBusiness } from "@/types/Type";
import { useState } from "react";


  // all businesses
export const useBusinesses = () => {
  return useQuery<IBusiness[], Error>({
    queryKey: ["businesses"],
    queryFn: getAllBusinesses,
  });
};

//buisnesses of user
export const useBusinessesOfOwner = (ownerId: string) => {
  return useQuery<IBusiness[], Error>({
    queryKey: ["businesses", ownerId],
    queryFn: () => getBusinessesOfOwner(ownerId),
    enabled: !!ownerId,
  });
};

// business by id
export const useBusiness = (id: string) => {
  return useQuery<IBusiness, Error>({
    queryKey: ["business", id],
    queryFn: () => getBusinessById(id),
  });
};
// add to fav
export const useAddBusinessToFav = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    //mut func
    mutationFn: async (businessId: string) => {
      setIsLoading(true);
      await addBusinessToFavorites(businessId);
    },
    //suc
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      setIsLoading(false);
    },
    //file
    onError: (error: Error) => {
      console.error("Error adding business to favorites", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};

// remove from fav
export const useRemoveBusinessFromFav = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (businessId: string) => {
      setIsLoading(true);
      await removeBusinessFromFavorites(businessId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error removing business from favorites", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};

// Create a new business
export const useCreateBusiness = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (businessData: IBusiness) => {
      setIsLoading(true);
      const newBusiness = await createBusiness(businessData);
      return newBusiness;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error creating business", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};

// Edit a business
export const useEditBusiness = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({
      id,
      businessData,
    }: {
      id: string;
      businessData: Partial<IBusiness>;
    }) => {
      setIsLoading(true);
      const updatedBusiness = await editBusiness(id, businessData);
      return updatedBusiness;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error editing business", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};

// Delete a business
export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      setIsLoading(true);
      await deleteBusiness(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error deleting business", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};
