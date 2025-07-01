import ReviewBlock from '@/Components/ReviewBlock/ReviewBlock'
import { getServerReviews } from '@/services/serverReviewService'

export default async function ReviewBlockPage() {
  const apiId = "1749890233";
  const { reviews, widget_settings } = await getServerReviews(apiId);
  return <ReviewBlock reviews={reviews} widget_settings={widget_settings} />
} 