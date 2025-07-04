export const dynamic = "force-dynamic";
import Float from '@/Components/float/Float'
import { getServerReviews } from '@/services/serverReviewService'

export default async function FloatPage() {
  // Fetch reviews server-side
  const apiId = "1749890233"; // Using the default API ID
  const { reviews, widget_settings } = await getServerReviews(apiId);

  return <Float reviews={reviews} widget_settings={widget_settings} />
} 