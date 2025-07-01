const BASE_URL = 'https://app.reputeup.ai/api';

export async function getServerReviews(apiId) {
  try {
    const response = await fetch(`${BASE_URL}/review-settings-with-list/${apiId}`, { 
      cache: 'no-store' 
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.status}`);
    }
    
    const data = await response.json();
    const reviewsData = data?.data?.reviews || [];
    const widgetSettings = data?.data?.widget_settings || {};
    
    // Sort reviews by date
    const sortedReviews = reviewsData.sort(
      (a, b) => new Date(b.review_date) - new Date(a.review_date)
    );
    return {
      reviews: sortedReviews,
      widget_settings: widgetSettings
    };
  } catch (error) {
    console.error('Server-side review fetch error:', error);
    return { reviews: [], widget_settings: {} };
  }
} 