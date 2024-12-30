import axios from "axios";
import { IBusiness } from "@/types/Type";
const BASE_URL = `http://localhost:3000/api/businesses`;

export const fetchBusinesses = async (
  search: string,
  category: string,
  page: number,
  limit: number
) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: { search, category, page, limit },
  });
  return response.data;
};
// Get all businesses
export const getAllBusinesses = async (): Promise<IBusiness[]> => {
  const response = await axios.get(`${BASE_URL}`);

  return response.data.data;
};

// Get business by ID
export const getBusinessById = async (id: string): Promise<IBusiness> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Get businesses of specific owner
export const getBusinessesOfOwner = async (
  ownerId: string
): Promise<IBusiness[]> => {
  const response = await axios.get(`${BASE_URL}/owner/${ownerId}`, {});
  return response.data;
};

// Create a new business
export const createBusiness = async (
  businessData: IBusiness
): Promise<IBusiness> => {
  const response = await axios.post(`${BASE_URL}`, businessData, {
    withCredentials: true,
  });
  return response.data;
};

// Edit a business
export const editBusiness = async (
  id: string,
  businessData: Partial<IBusiness>
): Promise<IBusiness> => {
  const response = await axios.put(`${BASE_URL}/${id}`, businessData, {
    withCredentials: true,
  });
  return response.data;
};

// Delete a business
export const deleteBusiness = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`, {
    withCredentials: true,
  });
};

export const searchBusinesses = async (queryParams: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}) => {
  const query = new URLSearchParams(queryParams as any).toString();
  const response = await axios.get(`${BASE_URL}/search?${query}`);
  return response.data;
};
// Add business to favorites
export const addBusinessToFavorites = async (
  businessId: string
): Promise<void> => {
  try {
    await axios.post(
      `${BASE_URL}/favorites/add/${businessId}`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error adding business to favorites:", error);
    throw error;
  }
};

// Remove business from favorites (make sure it returns void, not any)
export const removeBusinessFromFavorites = async (
  businessId: string
): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/favorites/remove/${businessId}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error removing business from favorites:", error);
    throw error;
  }
};
