import ReviewBlock from '@/Components/ReviewBlock/ReviewBlock'
import { getServerReviews } from '@/services/serverReviewService'

export default async function ReviewBlockPage() {
  const apiId = "1749890233";
  const reviews = await getServerReviews(apiId);
  return <ReviewBlock reviews={reviews} />
} 