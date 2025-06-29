import Float from '@/Components/float/Float'
import { getServerReviews } from '@/services/serverReviewService'

export default async function FloatPage() {
  // Fetch reviews server-side
  const apiId = "1749890233"; // Using the default API ID
  const reviews = await getServerReviews(apiId);

  return <Float reviews={reviews} />
} 