import axios from "axios";

const apiUrl = "http://localhost:3000/api";

//  reviews by business ID
export const fetchReviewsByBusinessId = async (businessId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/reviews/post/${businessId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Create a new review
export const createReview = async (
  businessId: string,
  content: string,
  rating: number
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/reviews`,
      { businessId, content, rating },
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

// Delete a review by ID
export const deleteReview = async (reviewId: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/reviews/${reviewId}`, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
