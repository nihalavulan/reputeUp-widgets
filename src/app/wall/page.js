import Wall from '@/Components/Wall/Wall'
import { getServerReviews } from '@/services/serverReviewService'

export default async function WallPage() {
  // Fetch reviews server-side
  const apiId = "1749890233"; // Using the default API ID from the Wall component
  const { reviews, widget_settings } = await getServerReviews(apiId);

  return <Wall reviews={reviews} widget_settings={widget_settings} />
} 