import axios from 'axios';

const BASE_URL = 'https://app.reputeup.ai/api';

export const reviewService = {
  getReviews: async (apiId) => {
    try {
      const response = await axios.get(`${BASE_URL}/review-settings-with-list/${apiId}`);
      const reviewsData = response.data?.data?.reviews || [];
      
      // Sort reviews by date
      return reviewsData.sort(
        (a, b) => new Date(b.review_date) - new Date(a.review_date)
      );
    } catch (error) {
      throw new Error(`Failed to fetch reviews: ${error.message}`);
    }
  }
}; 