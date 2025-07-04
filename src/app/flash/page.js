export const dynamic = "force-dynamic";
import Flash from '@/Components/flash/Flash'
import { getServerReviews } from '@/services/serverReviewService'

export default async function FlashPage() {
  // Fetch reviews server-side
  const apiId = "1749890233"; // Using the default API ID
  const { reviews, widget_settings } = await getServerReviews(apiId);

  return <Flash reviews={reviews} widget_settings={widget_settings} />
} 